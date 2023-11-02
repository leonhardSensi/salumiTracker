import React, { useState } from "react";
import Cut from "./cut";
import Spice from "./spice";
import Image from "next/image";
import Step from "./step";
import UserInput from "./userInput";
import { ICut, IItem, Irecipe, ISpice, IStep } from "@/interfaces/interfaces";
import GenericButton from "../button/genericButton";
import StatusButton from "../button/statusButton";

export default function RecipeInput(props: { recipe?: Irecipe }) {
  const [name, setName] = useState("");
  const [cuts, setCuts] = useState<IItem[]>([{ id: 1, name: "", quantity: 0 }]);
  const [spices, setSpices] = useState<IItem[]>([
    { id: 1, name: "", quantity: 0 },
  ]);
  const [steps, setSteps] = useState<IItem[]>([
    { id: 1, name: "", description: "", duration: 0 },
  ]);

  const [reqSuccess, setReqSuccess] = useState<string>("false");

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

  //   const handleNameChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     setName(e.target.value);
  //   };

  //   const handleCutChange = (id: number, value: string) => {
  //     const updatedCuts = cuts.map((cut) =>
  //       cut.id === id ? { ...cut, value } : cut
  //     );
  //     setCuts(updatedCuts);
  //     console.log("cuts", value);
  //   };

  //   const handleSpiceChange = (id: number, value: string) => {
  //     const updatedSpices = spices.map((spice) =>
  //       spice.id === id ? { ...spice, value } : spice
  //     );
  //     setSpices(updatedSpices);
  //   };

  //   const handleStepChange = (id: number, value: string) => {
  //     const updatedSteps = steps.map((step) =>
  //       step.id === id ? { ...step, value } : step
  //     );
  //     setSteps(updatedSteps);
  //   };

  const handleSubmit = async () => {
    if (cuts && spices && steps) {
      const submitCuts: ICut[] = [];
      cuts.map(
        (cut) =>
          cut.quantity &&
          submitCuts.push({ name: cut.name, quantity: cut.quantity })
      );
      let submitSpices: ISpice[] = [];
      spices.map(
        (spice) =>
          spice.quantity &&
          submitSpices.push({ name: spice.name, quantity: spice.quantity })
      );

      let submitSteps: IStep[] = [];
      steps.map(
        (step) =>
          step.description &&
          step.duration &&
          submitSteps.push({
            name: step.name,
            description: step.description,
            duration: step.duration,
          })
      );
      const response = await fetch("http://localhost:8000/api/recipes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: name,
          cuts: submitCuts,
          spices: submitSpices,
          steps: submitSteps,
        }),
      });
      const data = await response.json();
      console.log(
        "request data:",
        JSON.stringify({
          title: name,
          cuts: submitCuts,
          spices: submitSpices,
          steps: submitSteps,
        })
      );
      console.log("response data", data);
      if (data.status === "success") {
        setReqSuccess("true");
      }
    }
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
        {props.recipe
          ? props.recipe.cuts.map((cut, index) => (
              <div
                key={`cut-${cut.id}`}
                className="flex flex-row justify-between"
              >
                <>
                  <Cut
                    handleChange={(e) => handleChange(e, index)}
                    remove={() => remove(cuts, index, "cuts")}
                    items={cuts}
                    currentItem={cut}
                  />
                </>
              </div>
            ))
          : cuts.map((cut) => (
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

        <h1 className="text-gray-900 text-3xl my-4 font-bold">Spices</h1>
        {props.recipe
          ? props.recipe.spices.map((spice, index) => (
              <div
                key={`spice-${spice.id}`}
                className="flex flex-row justify-between"
              >
                <>
                  <Spice
                    handleChange={(e) => handleChange(e, index)}
                    remove={() => remove(spices, index, "spices")}
                    items={spices}
                    currentItem={spice}
                  />
                </>
              </div>
            ))
          : spices.map((spice) => (
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

        <h1 className="text-gray-900 text-3xl my-4 font-bold">Steps</h1>
        {props.recipe
          ? props.recipe.steps.map((step, index) => (
              <div key={`step-${step.id}`}>
                <>
                  <Step
                    handleChange={(e) => handleChange(e, index)}
                    stepNum={index}
                    remove={() => remove(steps, index, "steps")}
                    items={steps}
                    currentItem={step}
                  />
                </>
              </div>
            ))
          : steps.map((step) => (
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
        <div className="flex justify-end mt-16">
          <StatusButton reqSuccess={reqSuccess} />
        </div>
      </form>
    </div>
  );
}
