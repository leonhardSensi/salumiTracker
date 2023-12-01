import React, { useState } from "react";
import Cut from "./cut";
import Spice from "./spice";
import Step from "./step";
import UserInput from "../userInput";
import { IItem, Irecipe } from "@/interfaces/interfaces";
import GenericButton from "../../button/genericButton";
import StatusButton from "../../button/statusButton";
import { useRecipeMutation } from "@/mutations/recipeMutations";
import Curing from "./curing";
import Drying from "./drying";
import Salting from "./salting";

export default function RecipeInput(props: { recipe?: Irecipe }) {
  const [name, setName] = useState("");
  const [curing, setCuring] = useState({ state: false, duration: 0 });
  const [salting, setSalting] = useState({ state: false, duration: 0 });
  const [drying, setDrying] = useState({ state: false, duration: 0 });

  const [cuts, setCuts] = useState<IItem[]>([{ id: 1, name: "", quantity: 0 }]);

  const [spices, setSpices] = useState<IItem[]>([
    { id: 1, name: "", quantity: 0 },
  ]);
  const [steps, setSteps] = useState<IItem[]>([
    { id: 1, name: "", description: "", duration: 0 },
  ]);

  const createRecipe = useRecipeMutation();

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
    id?: number
  ) => {
    const itemToChange = e.target.id;
    const value = e.target.value;

    switch (itemToChange) {
      case "cut":
        const updatedCuts = cuts.map((cut) =>
          cut.id === id ? { ...cut, name: value } : cut
        );
        console.log(updatedCuts);
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

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemToChange = e.target.id;
    const value = e.target.value;

    switch (itemToChange) {
      case "curing":
        console.log("item to change", e.target.checked);
        setCuring({ ...curing, state: e.target.checked });
        console.log(value);
        break;
      case "curingDuration":
        setCuring({ ...curing, duration: +value });
        break;

      case "salting":
        setSalting({ ...salting, state: e.target.checked });
        break;
      case "saltingDuration":
        setSalting({ ...salting, duration: +value });
        break;

      case "drying":
        setDrying({ ...drying, state: e.target.checked });
        break;
      case "dryingDuration":
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
    createRecipe.mutate(recipe);
  };

  // const renderRecipe = (data: string) => {
  //   if (props.recipe) {
  //     switch (data) {
  //       case "cut":
  //         add(cuts, "cut");
  //         return props.recipe.cuts.map((cut, index) => (
  //           <div
  //             key={`cut-${cut.id}`}
  //             className="flex flex-row justify-between"
  //           >
  //             <>
  //               <Cut
  //                 handleChange={(e) => handleChange(e, index)}
  //                 remove={() => remove(cuts, index, "cuts")}
  //                 items={cuts}
  //                 currentItem={cut}
  //               />
  //             </>
  //           </div>
  //         ));
  //       case "spice":
  //         return props.recipe.spices.map((spice, index) => (
  //           <div
  //             key={`step-${spice.id}`}
  //             className="flex flex-row justify-between"
  //           >
  //             <>
  //               <Spice
  //                 handleChange={(e) => handleChange(e, index)}
  //                 stepNum={index}
  //                 remove={() => remove(steps, index, "spices")}
  //                 items={steps}
  //                 currentItem={spice}
  //               />
  //             </>
  //           </div>
  //         ));

  //       case "step":
  //         return props.recipe.steps.map((step, index) => (
  //           <div key={`step-${step.id}`}>
  //             <>
  //               <Step
  //                 handleChange={(e) => handleChange(e, index)}
  //                 stepNum={index}
  //                 remove={() => remove(steps, index, "steps")}
  //                 items={steps}
  //                 currentItem={step}
  //               />
  //             </>
  //           </div>
  //         ));

  //       default:
  //         break;
  //     }
  //   }
  // };
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
        <div>
          <h1 className="text-gray-900 text-3xl my-4 font-bold">Status</h1>
          <Curing
            handleCheckBoxChange={handleCheckBoxChange}
            selected={curing.state}
          />
          <Salting
            handleCheckBoxChange={handleCheckBoxChange}
            selected={salting.state}
          />
          <Drying
            handleCheckBoxChange={handleCheckBoxChange}
            selected={drying.state}
          />
        </div>
        <div>
          <h1 className="text-gray-900 text-3xl my-4 font-bold">Meats</h1>
          {/* {renderRecipe("cut")} */}
          {cuts.map((cut) => (
            <div
              key={`cut-${cut.id}`}
              className="flex flex-row justify-between"
            >
              {cut !== null && (
                <>
                  <Cut
                    handleChange={(e) => handleChange(e, cut.id)}
                    remove={() => remove(cuts, cut.id, "cuts")}
                    items={cuts}
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
        </div>
        <div>
          <h1 className="text-gray-900 text-3xl my-4 font-bold">Spices</h1>
          {/* {renderRecipe("spice")} */}
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
        </div>
        <div>
          <h1 className="text-gray-900 text-3xl my-4 font-bold">Steps</h1>
          {/* {renderRecipe("step")} */}
          {steps.map((step) => (
            <div key={`step-${step.id}`}>
              {step !== null && (
                <>
                  <Step
                    handleChange={(e) => handleChange(e, step.id)}
                    stepNum={steps.indexOf(step) + 1}
                    remove={() => remove(steps, step.id, "steps")}
                    items={steps}
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
        </div>
        <div className="flex justify-end mt-16">
          <StatusButton
            reqSuccess={createRecipe.isLoading ? "pending" : "false"}
          />
        </div>
      </form>
    </div>
  );
}
