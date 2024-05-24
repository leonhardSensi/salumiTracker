import React, { useState } from "react";
import Cut from "./cut";
import Spice from "./spice";
import Step from "./step";
import UserInput from "../userInput";
import {
  IEditRecipe,
  IEditRecipeProps,
  IItem,
  IItemToEdit,
  Irecipe,
} from "@/interfaces/interfaces";
import GenericButton from "../../button/genericButton";
import StatusButton from "../../button/statusButton";
import { useUpdateRecipeMutation } from "@/mutations/recipeMutations";
import Status from "./status";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { notificationState } from "@/atoms/notificationAtoms";
import { useRouter } from "next/navigation";

export default function EditRecipeInput({ recipeToEdit }: IEditRecipeProps) {
  const router = useRouter();
  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);

  const initCuts = recipeToEdit.cuts.map((cut) => {
    cut.listId = recipeToEdit.cuts.indexOf(cut) + 1;
    delete cut.id;
    delete cut.created_at;
    delete cut.updated_at;
    return cut;
  });

  const initSpices = recipeToEdit.spices.map((spice) => {
    spice.listId = recipeToEdit.spices.indexOf(spice) + 1;
    delete spice.id;
    delete spice.created_at;
    delete spice.updated_at;
    return spice;
  });

  const initSteps = recipeToEdit.steps.map((step) => {
    step.listId = recipeToEdit.steps.indexOf(step) + 1;
    delete step.id;
    delete step.created_at;
    delete step.updated_at;
    return step;
  });

  const [name, setName] = useState(recipeToEdit.title);

  const [cuts, setCuts] = useState<IItem[]>([...initCuts]);

  const [spices, setSpices] = useState<IItem[]>([...initSpices]);
  const [steps, setSteps] = useState<IItem[]>([...initSteps]);

  const [curing, setCuring] = useState(recipeToEdit.curing);
  const [salting, setSalting] = useState(recipeToEdit.salting);
  const [drying, setDrying] = useState(recipeToEdit.drying);

  const updateRecipe = useUpdateRecipeMutation();

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
    id: number
  ) => {
    const itemToChange = e.target.id;
    const value = e.target.value;

    switch (itemToChange) {
      case "cut":
        const updatedCuts = cuts.map((cut) =>
          cut.listId === id ? { ...cut, name: value } : cut
        );
        console.log("updated", updatedCuts);
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
        setCuring({ ...curing, state: e.target.checked, duration: 0 });
        break;

      case "CuringDuration":
        setCuring({ ...curing, duration: +value });
        break;

      case "Salting":
        setSalting({ ...salting, state: e.target.checked, duration: 0 });
        break;

      case "SaltingDuration":
        setSalting({ ...salting, duration: +value });
        break;

      case "Drying":
        setDrying({ ...drying, state: e.target.checked, duration: 0 });
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
      id: recipeToEdit && recipeToEdit.id,
      title: name,
      curing: curing,
      salting: salting,
      drying: drying,
      cuts: cuts,
      spices: spices,
      steps: steps,
    };

    const response = await updateRecipe.mutateAsync(recipe);
    if (response && response.status === 200) {
      setNotificationDetails({
        type: "recipeUpdate",
        message: "Recipe updated successfully!",
      });
      router.push(`/recipes/${recipe.id}`);
    }
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
    console.log(steps);
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

  return (
    <div className="my-4 w-full text-salumeWhite">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-left border-b-salumeWhite border-b-4 pb-4">
          <label
            htmlFor="name"
            className="text-3xl text-salumeWhite font-bold mr-4"
          >
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
            defaultValue={recipeToEdit && recipeToEdit.title}
          />
        </div>
        <div>
          <h1 className="text-3xl my-4 font-bold">Status</h1>
          <Status
            handleCheckBoxChange={handleCheckBoxChange}
            selected={salting.state}
            checked={salting.state}
            duration={salting.state && salting.duration}
            statusName={"Salting"}
          />
          <Status
            handleCheckBoxChange={handleCheckBoxChange}
            selected={drying.state}
            checked={drying.state}
            duration={drying.state && drying.duration}
            statusName={"Drying"}
          />
          <Status
            handleCheckBoxChange={handleCheckBoxChange}
            selected={curing.state}
            checked={curing.state}
            duration={curing.state && curing.duration}
            statusName={"Curing"}
          />
        </div>
        <div className="border-b-salumeWhite border-b-4 mt-8">
          <h1 className="text-3xl my-4 font-bold">Meats</h1>
          {cuts.map((cut) => (
            <div
              key={`cut-${cut.id}`}
              className="flex flex-row justify-between"
            >
              {cut !== null && (
                <>
                  <Cut
                    handleChange={(e) => handleChange(e, cut.listId)}
                    remove={() => remove(cuts, cut.listId, "cuts")}
                    items={cuts}
                    currentItem={cut}
                  />
                </>
              )}
            </div>
          ))}

          <Image
            className="cursor-pointer invert mb-8"
            src={"/plusButton.svg"}
            width={40}
            height={40}
            onClick={() => add(cuts, "cuts")}
            alt="add"
          />
        </div>
        <div className="border-b-salumeWhite border-b-4 mt-8">
          <h1 className="text-3xl my-4 font-bold">Spices</h1>
          {spices.map((spice) => (
            <div
              key={`spice-${spice.id}`}
              className="flex flex-row justify-between"
            >
              {spice !== null && (
                <>
                  <Spice
                    handleChange={(e) => handleChange(e, spice.listId)}
                    remove={() => remove(spices, spice.listId, "spices")}
                    items={spices}
                    currentItem={spice}
                  />
                </>
              )}
            </div>
          ))}
          <Image
            className="cursor-pointer invert mb-8"
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
            <div key={`step-${step.id}`}>
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
                    currentItem={step}
                    dropdownText={step.status ? step.status : "Select status"}
                    stepStatus={step.status}
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
          <Image
            className="cursor-pointer invert mb-8"
            src={"/plusButton.svg"}
            width={40}
            height={40}
            onClick={() => add(steps, "steps")}
            alt="add"
          />
        </div>
        <div className="flex justify-end mt-16">
          <StatusButton
            reqSuccess={updateRecipe.isLoading ? "pending" : "false"}
          />
        </div>
      </form>
    </div>
  );
}
