import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserInput from "../../../../components/generic/input/userInput";
import StatusButton from "../../button/statusButton";
import { getRecipe, getRecipes } from "../../../../api/recipeApi";
import { useQuery } from "@tanstack/react-query";
import { Irecipe } from "../../../../interfaces/interfaces";
import RenderRecipe from "../../../../components/recipes/renderRecipe";
import { useSalumeMutation } from "../../../../mutations/salumeMutation";
import { useRecoilState } from "recoil";
import { notificationState } from "../../../../atoms/notificationAtoms";
import { start } from "repl";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";

export default function SalumeInput() {
  const [currentRecipe, setCurrentRecipe] = useState<Irecipe>();
  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);

  const {
    status: statusUser,
    error: errorMessage,
    data: recipes,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  // const {
  //   status: statusRecipe,
  //   error: errorRecipe,
  //   data: recipe,
  // } = useQuery({
  //   queryKey: ["recipe", currentRecipe?.id],
  //   queryFn: () => getRecipe(currentRecipe?.id),
  // });

  const [input, setInput] = useState("");

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [cutQuantity, setCutQuantity] = useState<String>();
  const [state, setState] = useState("");
  // const [recipe, setRecipe] = useState("");
  const [reqSuccess, setReqSuccess] = useState<string>("false");
  const router = useRouter();
  const createSalume = useSalumeMutation();
  const [startWeight, setStartWeight] = useState<number | undefined>();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "notes":
        setNotes(e.target.value);
        break;
      case "recipeDropdown":
        setInput(e.target.value);
        break;
      case "cutQuantity":
        setCutQuantity(e.target.value);
      default:
        break;
    }
  };

  console.log("Start weight", startWeight);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentRecipe) {
      const salume = {
        name,
        recipeId: currentRecipe.id,
        notes,
        state,
        startWeight: startWeight || 0,
      };
      console.log(state);
      console.log(salume);
      const response = await createSalume.mutateAsync(salume);
      if (response.status === 201) {
        setNotificationDetails({
          type: "salumeSubmit",
          message: "Salume created successfully!",
          duration: 3000,
          undo: false,
        });
      }
      router.push("/dashboard");
    }
  };

  console.log(startWeight);

  const dataFilter = () => {
    if (recipes) {
      return recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(input.toLowerCase());
      });
    }
    return [];
  };

  const selectOption = async (
    e: React.MouseEvent,
    value: string,
    recipe: Irecipe
  ) => {
    e.preventDefault();
    setCurrentRecipe(recipe);
    const selectedRecipe = await getRecipe(recipe.id);
    setInput(value);
    if (selectedRecipe) {
      if (selectedRecipe.drying.state) {
        setState("drying");
      } else if (selectedRecipe.salting.state) {
        setState("salting");
      } else if (selectedRecipe.curing.state) {
        setState("curing");
      } else {
        setState("done");
      }
    }
  };

  return (
    <div className="w-full text-stone px-16 max-w-4xl">
      <form
        name="newSalumeForm"
        id="newSalumeForm"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-black">
          Name
        </label>
        <UserInput
          width="w-1/2"
          addStyle="mt-1 mb-4 text-xl"
          name="name"
          handleChange={handleChange}
          type="text"
          id="name"
          placeholder="Name"
          required={true}
        />

        <label htmlFor="notes" className="text-black">
          Notes
        </label>

        <textarea
          name="notes"
          onChange={handleChange}
          id="notes"
          placeholder="Notes"
          className="text-black border w-1/2 h-32 mt-1 mb-4 text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-100 border-gray-300 placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500"
          required={true}
        />

        <div className="relative group inline-block mb-2 w-full max-w-md">
          <UserInput
            id="recipeDropdown"
            placeholder="My Recipe"
            value={input}
            type="text"
            addStyle="flex flex-row w-full"
            handleChange={handleChange}
            name={"recipeInput"}
            required={true}
            autoComplete={"off"}
          />
          <div className="absolute left-0 top-full z-20 w-full max-w-md border-t-4 border-flesh rounded-xl shadow-2xl bg-white/95 border transition-all duration-200 opacity-0 pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-hover:opacity-100 group-hover:pointer-events-auto">
            {dataFilter().length === 0 ? (
              <div className="px-4 py-3 text-center text-wetSand text-lg">
                No recipes found
              </div>
            ) : (
              dataFilter().map((recipe) => (
                <div
                  key={`recipe-${recipe.id}`}
                  className="px-6 py-3 cursor-pointer text-lg text-wetSand hover:bg-wetSand/90 hover:text-eggshell transition-all rounded-xl"
                  onClick={(e) => selectOption(e, recipe.title, recipe)}
                  id={recipe.id}
                >
                  <span className="font-semibold">{recipe.title}</span>
                </div>
              ))
            )}
          </div>
        </div>
        {currentRecipe && (
          <>
            <RenderRecipe
              recipe={currentRecipe}
              setStartWeight={setStartWeight}
            />
          </>
        )}

        {/* <div className="flex justify-end mt-16">
          <StatusButton reqSuccess={reqSuccess} />
        </div> */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 pt-4"
        >
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={createSalume.isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-wetSand text-eggshell rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>{createSalume.isLoading ? "Saving..." : "Save Salume"}</span>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/salumi/completed")}
            className="px-6 py-3 bg-eggshell text-wetSand border-2 border-wetSand/30 rounded-xl font-semibold hover:bg-wetSand/10 transition-colors"
          >
            <X size={20} className="inline mr-2" />
            Cancel
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
}
