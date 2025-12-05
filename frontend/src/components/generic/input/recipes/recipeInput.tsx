"use client";
import React, { useState } from "react";
import Cut from "./cut";
import Spice from "./spice";
import Step from "./step";
import UserInput from "../userInput";
import { IItem, Irecipe } from "../../../../interfaces/interfaces";
import StatusButton from "../../button/statusButton";
import { useRecipeMutation } from "../../../../mutations/recipeMutations";
import Status from "./status";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { notificationState } from "../../../../atoms/notificationAtoms";
import { motion } from "framer-motion";
import { Plus, Save, X } from "lucide-react";

export default function RecipeInput(props: { recipe?: Irecipe }) {
  const router = useRouter();
  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);
  const [name, setName] = useState("");
  const [curing, setCuring] = useState({ state: false, duration: 0 });
  const [salting, setSalting] = useState({ state: false, duration: 0 });
  const [drying, setDrying] = useState({ state: false, duration: 0 });

  const [cuts, setCuts] = useState<IItem[]>([
    { listId: 1, name: "", quantity: 0 },
  ]);

  const [spices, setSpices] = useState<IItem[]>([
    { listId: 1, name: "", quantity: 0 },
  ]);
  const [steps, setSteps] = useState<IItem[]>([
    {
      listId: 1,
      name: "",
      description: "",
      duration: 0,
      status: "",
      statusDuration: 0,
    },
  ]);

  const createRecipe = useRecipeMutation();

  const add = (items: IItem[], type: string) => {
    const nextId = items[items.length - 1].listId + 1;

    switch (type) {
      case "cuts":
        setCuts([...cuts, { listId: nextId, name: "", quantity: 0 }]);
        break;
      case "spices":
        setSpices([...spices, { listId: nextId, name: "", quantity: 0 }]);
        break;
      case "steps":
        setSteps([
          ...steps,
          {
            listId: nextId,
            name: "",
            description: "",
            duration: 0,
            status: "",
            statusDuration: 0,
          },
        ]);
        break;

      default:
        break;
    }
  };

  const remove = (items: IItem[], id: number, type: string) => {
    console.log(id);
    const newItems = items.filter((item) => item.listId !== id);
    switch (type) {
      case "cuts":
        setCuts(newItems);
        break;
      case "spices":
        setSpices(newItems);
        break;
      case "steps":
        setSteps(newItems);
        break;

      default:
        break;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    id?: number
  ) => {
    const itemToChange = e.target.id;
    const value = e.target.value;

    switch (itemToChange) {
      case "cut":
        const updatedCuts = cuts.map((cut) =>
          cut.listId === id ? { ...cut, name: value } : cut
        );
        console.log(updatedCuts);
        setCuts(updatedCuts);
        break;
      case "cutQuantity":
        const updatedCutQuantity = cuts.map((cut) =>
          cut.listId === id ? { ...cut, quantity: +value } : cut
        );
        console.log(updatedCutQuantity);
        setCuts(updatedCutQuantity);
        break;

      case "spice":
        const updatedSpices = spices.map((spice) =>
          spice.listId === id ? { ...spice, name: value } : spice
        );
        setSpices(updatedSpices);
        break;

      case "spiceQuantity":
        const updatedSpiceQuantity = spices.map((spice) =>
          spice.listId === id ? { ...spice, quantity: +value } : spice
        );
        setSpices(updatedSpiceQuantity);
        break;
      case "step":
        const updatedSteps = steps.map((step) =>
          step.listId === id ? { ...step, name: value } : step
        );
        setSteps(updatedSteps);
        break;
      case "stepDescription":
        const updatedStepDescription = steps.map((step) =>
          step.listId === id ? { ...step, description: value } : step
        );
        setSteps(updatedStepDescription);
        break;
      case "stepDuration":
        const updatedStepDuration = steps.map((step) =>
          step.listId === id ? { ...step, duration: +value } : step
        );
        setSteps(updatedStepDuration);
        break;

      default:
        break;
    }
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemToChange = e.target.id;
    const value = e.target.value;

    switch (itemToChange) {
      case "Curing":
        console.log("item to change", e.target.checked);
        setCuring({ ...curing, state: e.target.checked });
        console.log(value);
        break;
      case "CuringDuration":
        setCuring({ ...curing, duration: +value });
        break;

      case "Salting":
        setSalting({ ...salting, state: e.target.checked });
        break;
      case "SaltingDuration":
        setSalting({ ...salting, duration: +value });
        break;

      case "Drying":
        setDrying({ ...drying, state: e.target.checked });
        break;
      case "DryingDuration":
        setDrying({ ...drying, duration: +value });
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipe = {
      title: name,
      curing: curing,
      salting: salting,
      drying: drying,
      cuts: cuts,
      spices: spices,
      steps: steps,
    };

    const response = await createRecipe.mutateAsync(recipe);
    if (response && response.status === 201) {
      setNotificationDetails({
        type: "recipeSubmit",
        message: "Recipe created successfully!",
        duration: 3000,
        undo: false,
      });

      router.push("/recipes");
    }
  };

  const getStatusArr = () => {
    return Object.entries({
      Salting: salting,
      Drying: drying,
      Curing: curing,
    })
      .filter(([_, step]) => step.state)
      .map(([status]) => status);
  };

  const handleSelect = (value: string, id?: number) => {
    switch (value) {
      case "Salting":
        const updatedSaltingStepStatus = steps.map((step) =>
          step.listId === id
            ? { ...step, status: value, statusDuration: salting.duration }
            : step
        );
        setSteps(updatedSaltingStepStatus);
        break;
      case "Drying":
        const updatedDryingStepStatus = steps.map((step) =>
          step.listId === id
            ? { ...step, status: value, statusDuration: drying.duration }
            : step
        );
        setSteps(updatedDryingStepStatus);
        break;
      case "Curing":
        const updatedCuringStepStatus = steps.map((step) =>
          step.listId === id
            ? { ...step, status: value, statusDuration: curing.duration }
            : step
        );
        setSteps(updatedCuringStepStatus);
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-full text-stone max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label
            htmlFor="name"
            className="block text-base font-semibold text-wetSand mb-2"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <UserInput
            // width={"w-full"}
            addStyle={
              "text-base py-3 px-4 rounded-lg border-2 border-wetSand/30 focus:border-wetSand focus:ring-2 focus:ring-wetSand/20 transition-all"
            }
            name="name"
            type="text"
            handleChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="New Recipe"
            required={true}
            defaultValue={props.recipe && props.recipe.title}
          />
        </motion.div>

        {/* Status Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-base font-semibold text-wetSand">Status</h2>
          <div className="space-y-4">
            <Status
              handleCheckBoxChange={handleCheckBoxChange}
              selected={salting.state}
              statusName={"Salting"}
            />
            <Status
              handleCheckBoxChange={handleCheckBoxChange}
              selected={drying.state}
              statusName={"Drying"}
            />
            <Status
              handleCheckBoxChange={handleCheckBoxChange}
              selected={curing.state}
              statusName={"Curing"}
            />
          </div>
        </motion.div>

        {/* Meats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-base font-semibold text-wetSand">Meats</h2>
          <div className="space-y-3">
            {cuts.map((cut, index) => (
              <motion.div
                key={`cut-${cut.listId}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {cut !== null && (
                  <Cut
                    handleChange={(e) => handleChange(e, cut.listId)}
                    remove={() => remove(cuts, cut.listId, "cuts")}
                    items={cuts}
                  />
                )}
              </motion.div>
            ))}
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => add(cuts, "cuts")}
            className="flex items-center gap-2 px-4 py-2 text-wetSand hover:bg-wetSand/10 rounded-lg transition-colors font-medium"
          >
            <Plus size={20} />
            <span>Add Meat</span>
          </motion.button>
        </motion.div>

        {/* Spices Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-base font-semibold text-wetSand">Spices</h2>
          <div className="space-y-3">
            {spices.map((spice, index) => (
              <motion.div
                key={`spice-${spice.listId}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {spice !== null && (
                  <Spice
                    handleChange={(e) => handleChange(e, spice.listId)}
                    remove={() => remove(spices, spice.listId, "spices")}
                    items={spices}
                  />
                )}
              </motion.div>
            ))}
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => add(spices, "spices")}
            className="flex items-center gap-2 px-4 py-2 text-wetSand hover:bg-wetSand/10 rounded-lg transition-colors font-medium"
          >
            <Plus size={20} />
            <span>Add Spice</span>
          </motion.button>
        </motion.div>

        {/* Steps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-base font-semibold text-wetSand">Steps</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={`step-${step.listId}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {step !== null && (
                  <Step
                    handleChange={(e) => handleChange(e, step.listId)}
                    stepNum={steps.indexOf(step) + 1}
                    remove={() => remove(steps, step.listId, "steps")}
                    items={steps}
                    statusArr={getStatusArr()}
                    handleSelect={handleSelect}
                    currentId={step.listId}
                    dropdownText={
                      step.status ? step.status : "Select status..."
                    }
                    stepStatus={step.status}
                  />
                )}
              </motion.div>
            ))}
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => add(steps, "steps")}
            className="flex items-center gap-2 px-4 py-2 text-wetSand hover:bg-wetSand/10 rounded-lg transition-colors font-medium"
          >
            <Plus size={20} />
            <span>Add Step</span>
          </motion.button>
        </motion.div>

        {/* Action Buttons */}
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
            disabled={createRecipe.isLoading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-wetSand text-eggshell rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>{createRecipe.isLoading ? "Saving..." : "Save Recipe"}</span>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/recipes")}
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
