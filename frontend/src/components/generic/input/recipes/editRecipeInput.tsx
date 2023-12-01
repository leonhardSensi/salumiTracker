import React, { useState } from "react";
import Cut from "./cut";
import Spice from "./spice";
import Step from "./step";
import UserInput from "../userInput";
import { IItem, Irecipe } from "@/interfaces/interfaces";
import GenericButton from "../../button/genericButton";
import StatusButton from "../../button/statusButton";
import { useUpdateRecipeMutation } from "@/mutations/recipeMutations";

export default function EditRecipeInput(props: { recipe: Irecipe }) {
  const initCuts = props.recipe.cuts.map((cut) => {
    cut.id = props.recipe.cuts.indexOf(cut) + 1;
    delete cut.created_at;
    delete cut.updated_at;
    return cut;
  });

  const initSpices = props.recipe.spices.map((spice) => {
    spice.id = props.recipe.spices.indexOf(spice) + 1;
    delete spice.created_at;
    delete spice.updated_at;
    return spice;
  });

  const initSteps = props.recipe.steps.map((step) => {
    step.id = props.recipe.steps.indexOf(step) + 1;
    delete step.created_at;
    delete step.updated_at;
    return step;
  });

  const [name, setName] = useState(props.recipe.title);

  const [cuts, setCuts] = useState<IItem[]>([...initCuts]);

  const [spices, setSpices] = useState<IItem[]>([...initSpices]);
  const [steps, setSteps] = useState<IItem[]>([...initSteps]);

  const updateRecipe = useUpdateRecipeMutation();

  const add = (items: IItem[], type: string) => {
    const nextId = items[items.length - 1].id + 1;

    switch (type) {
      case "cuts":
        setCuts([...cuts, { id: nextId, name: "", quantity: 0 }]);
        break;
      case "spices":
        setSpices([...spices, { id: nextId, name: "", quantity: 0 }]);
        break;
      case "steps":
        setSteps([
          ...steps,
          { id: nextId, name: "", description: "", duration: 0 },
        ]);
        break;

      default:
        break;
    }
  };

  const remove = (items: IItem[], id: number, type: string) => {
    console.log(id);
    const newItems = items.filter((item) => item.id !== id);
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
    id: number
  ) => {
    const itemToChange = e.target.id;
    const value = e.target.value;

    switch (itemToChange) {
      case "cut":
        const updatedCuts = cuts.map((cut) =>
          cut.id === id ? { ...cut, name: value } : cut
        );
        console.log("updated", updatedCuts);
        setCuts(updatedCuts);
        break;
      case "cutQuantity":
        const updatedCutQuantity = cuts.map((cut) =>
          cut.id === id ? { ...cut, quantity: +value } : cut
        );
        console.log(updatedCutQuantity);
        setCuts(updatedCutQuantity);
        break;

      case "spice":
        const updatedSpices = spices.map((spice) =>
          spice.id === id ? { ...spice, name: value } : spice
        );
        setSpices(updatedSpices);
        break;

      case "spiceQuantity":
        const updatedSpiceQuantity = spices.map((spice) =>
          spice.id === id ? { ...spice, quantity: +value } : spice
        );
        setSpices(updatedSpiceQuantity);
        break;
      case "step":
        const updatedSteps = steps.map((step) =>
          step.id === id ? { ...step, name: value } : step
        );
        setSteps(updatedSteps);
        break;
      case "stepDescription":
        const updatedStepDescription = steps.map((step) =>
          step.id === id ? { ...step, description: value } : step
        );
        setSteps(updatedStepDescription);
        break;
      case "stepDuration":
        const updatedStepDuration = steps.map((step) =>
          step.id === id ? { ...step, duration: +value } : step
        );
        setSteps(updatedStepDuration);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const recipe = {
      id: props.recipe && props.recipe.id,
      title: name,
      cuts: cuts,
      spices: spices,
      steps: steps,
    };
    updateRecipe.mutate(recipe);
  };

  return (
    <div className="my-4 w-full">
      <form onSubmit={handleSubmit}>
        <UserInput
          width={"w-1/2"}
          addStyle={"mt-1 mb-4 text-xl"}
          name="name"
          type="text"
          handleChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Recipe Name"
          required={true}
          defaultValue={props.recipe && props.recipe.title}
        />

        <h1 className="text-gray-900 text-3xl my-4 font-bold">Meats</h1>
        {/* {renderRecipe("cut")} */}
        {cuts.map((cut) => (
          <div key={`cut-${cut.id}`} className="flex flex-row justify-between">
            {cut !== null && (
              <>
                <Cut
                  handleChange={(e) => handleChange(e, cut.id)}
                  remove={() => remove(cuts, cut.id, "cuts")}
                  items={cuts}
                  currentItem={cut}
                />
              </>
            )}
          </div>
        ))}

        <GenericButton
          text="Add a cut"
          onClick={() => add(cuts, "cuts")}
          addStyles="w-fit p-2"
        />

        <h1 className="text-gray-900 text-3xl my-4 font-bold">Spices</h1>
        {spices.map((spice) => (
          <div
            key={`spice-${spice.id}`}
            className="flex flex-row justify-between"
          >
            {spice !== null && (
              <>
                <Spice
                  handleChange={(e) => handleChange(e, spice.id)}
                  remove={() => remove(spices, spice.id, "spices")}
                  items={spices}
                  currentItem={spice}
                />
              </>
            )}
          </div>
        ))}
        <GenericButton
          text="Add a spice"
          onClick={() => add(spices, "spices")}
          addStyles="w-fit p-2"
        />

        <h1 className="text-gray-900 text-3xl my-4 font-bold">Steps</h1>
        {steps.map((step) => (
          <div key={`step-${step.id}`}>
            {step !== null && (
              <>
                <Step
                  handleChange={(e) => handleChange(e, step.id)}
                  stepNum={steps.indexOf(step) + 1}
                  remove={() => remove(steps, step.id, "steps")}
                  items={steps}
                  currentItem={step}
                />
                {/* <div className="w-4">
                <Image
                  className={
                    steps.length > 1 ? "h-4 w-4 mb-4 cursor-pointer" : " hidden"
                  }
                  src={"./x-button.svg"}
                  width={100}
                  height={100}
                  onClick={() => remove(steps, step.id)}
                  alt="delete"
                />
              </div> */}
              </>
            )}
          </div>
        ))}
        <GenericButton
          text="Add a step"
          onClick={() => add(steps, "steps")}
          addStyles="w-fit p-2"
        />
        <div className="flex justify-end mt-16">
          <StatusButton
            reqSuccess={updateRecipe.isLoading ? "pending" : "false"}
          />
        </div>
      </form>
    </div>
  );
}
