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
import Image from "next/image";
import { useRecoilState } from "recoil";
import { notificationState } from "../../../../atoms/notificationAtoms";

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
    <div className="my-4 w-full text-stone">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-left border-b-stone border-b-4 pb-4">
          <label htmlFor="name" className="text-3xl font-bold mr-4">
            Add name
          </label>
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
        </div>
        <div className="border-b-stone border-b-4  pb-4">
          <h1 className="text-3xl my-4 font-bold">Status</h1>
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
        <div className="border-b-stone border-b-4 mt-8">
          <h1 className="text-3xl my-4 font-bold">Meats</h1>
          {cuts.map((cut) => (
            <div
              key={`cut-${cut.listId}`}
              className="flex flex-row justify-between"
            >
              {cut !== null && (
                <>
                  <Cut
                    handleChange={(e) => handleChange(e, cut.listId)}
                    remove={() => remove(cuts, cut.listId, "cuts")}
                    items={cuts}
                  />
                </>
              )}
            </div>
          ))}
          <Image
            className="cursor-pointer mb-8"
            src={"/plusButton.svg"}
            width={40}
            height={40}
            onClick={() => add(cuts, "cuts")}
            alt="add"
          />
        </div>
        <div className="border-b-stone border-b-4 mt-8">
          <h1 className="text-3xl my-4 font-bold">Spices</h1>
          {spices.map((spice) => (
            <div
              key={`spice-${spice.listId}`}
              className="flex flex-row justify-between"
            >
              {spice !== null && (
                <>
                  <Spice
                    handleChange={(e) => handleChange(e, spice.listId)}
                    remove={() => remove(spices, spice.listId, "spices")}
                    items={spices}
                  />
                </>
              )}
            </div>
          ))}
          <Image
            className="cursor-pointer mb-8"
            src={"/plusButton.svg"}
            width={40}
            height={40}
            onClick={() => add(spices, "spices")}
            alt="add"
          />
        </div>
        <div className="mt-8">
          <h1 className="text-3xl my-4 font-bold">Steps</h1>
          {steps.map((step) => (
            <div key={`step-${step.listId}`}>
              {step !== null && (
                <>
                  <Step
                    handleChange={(e) => handleChange(e, step.listId)}
                    stepNum={steps.indexOf(step) + 1}
                    remove={() => remove(steps, step.listId, "steps")}
                    items={steps}
                    statusArr={getStatusArr()}
                    handleSelect={handleSelect}
                    currentId={step.listId}
                    dropdownText={step.status ? step.status : "Select status"}
                    stepStatus={step.status}
                  />
                </>
              )}
            </div>
          ))}
          <Image
            className="cursor-pointer mb-8"
            src={"/plusButton.svg"}
            width={40}
            height={40}
            onClick={() => add(steps, "steps")}
            alt="add"
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
