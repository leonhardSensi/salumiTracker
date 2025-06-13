"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "../../api/recipeApi";
import { useParams } from "next/navigation";
import LoadingSpinner from "../generic/loading/loadingSpinner";
import { Irecipe } from "../../interfaces/interfaces";
import { useState } from "react";

export default function RecipeDetails(recipe: Irecipe) {
  // const params = useParams();

  // const {
  //   status: statusRecipe,
  //   error: errorRecipe,
  //   data: recipe,
  // } = useQuery({
  //   queryKey: ["recipe", params.recipeId],
  //   queryFn: () => getRecipe(params.recipeId as string),
  // });

  const [currentStep, setCurrentStep] = useState(0);
  const steps = recipe.steps;
  const totalSteps = steps.length;

  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));

  return (
    <div className="flex flex-col items-center w-full text-stone px-16 space-y-8">
      {/* <div className="flex w-full flex-col items-start mb-8"> */}
      {/* <h2 className="text-3xl mb-8 font-bold">Ingredients</h2> */}
      <div className="flex justify-around w-full space-x-8">
        <div className="bg-flesh rounded-xl p-8 shadow-lg w-1/2">
          <h3 className="text-3xl font-serif mb-2 text-wetSand">Cuts</h3>
          <ul>
            {recipe.cuts.map((cut, index) => {
              return (
                <li
                  key={`cut-${index}`}
                  className={`text-xl p-2 ${
                    index % 2 !== 1 && "bg-eggshell bg-opacity-30"
                  }`}
                >
                  {cut.name} {cut.quantity}g
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bg-flesh rounded-xl p-8 shadow-lg w-1/2">
          <h3 className="text-3xl font-serif text-wetSand mb-2">Spices</h3>
          <ul>
            {recipe.spices.map((spice, index) => {
              return (
                <li
                  key={`spice-${index}`}
                  className={`text-xl p-2 ${
                    index % 2 !== 1 && "bg-eggshell bg-opacity-30"
                  }`}
                >
                  {spice.quantity}g {spice.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* </div> */}
      {/* <div className="bg-flesh rounded-xl p-8 shadow-lg w-full">
        <div className="flex w-full items-center">
          <h2 className="text-3xl font-bold mt-8">Steps</h2>
          
          ThIS IS COMMENTED OUT
          <div className="mt-4 ml-4">
                  <p
                    className="bg-salumeWhite border-salumeWhite rounded-full p-2 text-sm cursor-pointer text-salumeBlue"
                    // onClick={handleClick}
                  >
                    Step by step
                  </p>
                </div>
     -----------------
        </div>
        {recipe.steps.map((step, index) => {
          return (
            <div key={`step-${index}`}>
              <div className="flex flex-col justify-start">
                <h4 className="text-2xl underline font-semibold">
                  {step.name}
                </h4>
                <p>
                  Step {index + 1}/{recipe.steps.length}
                </p> 
                <h5 className="text-xl mt-8"> Duration: </h5>
                <p>
                  {step.duration ? step.duration : step.statusDuration}
                  {step.duration ? "minutes" : "days"}
                </p>

                <h5 className="text-xl mt-8"> Description: </h5>
                <p>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div> */}
      <div className="flex flex-col items-center w-full">
        <div className="bg-flesh rounded-xl p-8 shadow-lg w-full">
          <div
            className="flex w-full items-center justify-between"
            key={`step-${currentStep}`}
          >
            <h2 className="text-3xl font-serif text-wetSand mt-8">
              {steps[currentStep].name}
            </h2>
            <div>
              <h5 className="text-xl mt-8"> Duration: </h5>
              <p>
                {steps[currentStep].duration
                  ? steps[currentStep].duration
                  : steps[currentStep].statusDuration}
                {steps[currentStep].duration ? " minutes" : " days"}
              </p>
            </div>
            {/* <h2 className="text-3xl font-serif text-wetSand mt-8">Steps</h2> */}
          </div>
          <div>
            <div className="flex flex-col justify-start">
              {/* <h4 className="text-2xl underline font-semibold">
                {steps[currentStep].name}
              </h4> */}
              <h5 className="text-xl mt-8"> Description: </h5>
              <p>{steps[currentStep].description}</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="px-3 py-1 rounded bg-eggshell text-stone disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Step {currentStep + 1} / {totalSteps}
            </span>
            <button
              onClick={handleNext}
              disabled={currentStep === totalSteps - 1}
              className="px-3 py-1 rounded bg-eggshell text-stone disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
        <p className="text-xl mt-16">{recipe.content}</p>
      </div>
    </div>
  );
}
