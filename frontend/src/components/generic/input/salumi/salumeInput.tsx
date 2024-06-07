import React, { useState } from "react";
import { useRouter } from "next/navigation";
import UserInput from "@/components/generic/input/userInput";
import StatusButton from "../../button/statusButton";
import { getRecipe, getRecipes } from "@/api/recipeApi";
import { useQuery } from "@tanstack/react-query";
import { Irecipe } from "@/interfaces/interfaces";
import RenderRecipe from "@/components/recipes/renderRecipe";
import { useSalumeMutation } from "@/mutations/salumeMutation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { notificationState } from "@/atoms/notificationAtoms";

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

  // NO ROUTE AND TABLE YET
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentRecipe) {
      const salume = {
        name,
        recipeId: currentRecipe.id,
        notes,
        state,
      };
      console.log(state);
      console.log(salume);
      const response = await createSalume.mutateAsync(salume);
      if (response.status === 201) {
        setNotificationDetails({
          type: "salumeSubmit",
          message: "Salume created successfully!",
        });
      }
      router.push("/dashboard");
    }
  };

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
    <div className="my-4 w-full">
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

        <div className="relative group inline-block mb-2 w-full">
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

            // uncomment to select text on click
            // onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            //   e.target.select()
            // }
          />
          <div className="h-fit max-h-48 overflow-y-auto w-full hidden group-focus-within:block hover:block absolute bg-salumeBlue py-2 px-3 rounded-b-md shadow-xl">
            {dataFilter().map((recipe) => (
              <option
                className="text-xl text-salumeWhite cursor-pointer hover:bg-salumeWhite hover:text-salumeBlue hover:rounded transition-all"
                onClick={(e) => selectOption(e, recipe.title, recipe)}
                key={`recipe-${recipe.id}`}
                id={recipe.id}
              >
                {recipe.title}
              </option>
            ))}
          </div>
        </div>
        {currentRecipe && (
          <>
            <RenderRecipe
              recipe={currentRecipe}
              // cutQuantity={cutQuantity}
              // handleChange={handleChange}
            />
          </>
        )}

        <div className="flex justify-end mt-16">
          <StatusButton reqSuccess={reqSuccess} />
        </div>
      </form>
    </div>
  );
}
