"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "@/api/recipeApi";
import { useParams } from "next/navigation";
import { PrivateLayout } from "../privateLayout/privateLayout";
import LoadingSpinner from "../generic/loading/loadingSpinner";
import RenderRecipe from "./renderRecipe";

export default function RecipeDetails() {
  const params = useParams();

  const {
    status: statusRecipe,
    error: errorRecipe,
    data: recipe,
  } = useQuery({
    queryKey: ["recipe", params.recipeId],
    queryFn: () => getRecipe(params.recipeId as string),
  });

  return (
    <div className="">
      <div className="mx-16 flex flex-col items-center">
        {statusRecipe === "loading" && <LoadingSpinner />}
        {errorRecipe === "error" && (
          <p className="text-black">{JSON.stringify(errorRecipe)}</p>
        )}
        {recipe && (
          <>
            <h1 className="text-salumeWhite text-6xl my-8 h-fit font-Satisfy border-b-4 border-double border-b-salumeWhite">
              {recipe.title}
            </h1>

            <div className="flex w-full flex-col items-start mb-8">
              <h2 className="text-3xl mb-8 font-bold text-salumeWhite">
                Ingredients
              </h2>
              <div className="flex justify-around w-full">
                <div>
                  <h3 className="text-3xl mb-2">Cuts</h3>
                  <ul>
                    {recipe.cuts.map((cut, index) => {
                      return (
                        <li
                          key={`cut-${index}`}
                          className={`text-xl p-2 ${
                            index % 2 !== 1 &&
                            "border rounded-lg border-salumeBlue bg-salumeWhite bg-opacity-30"
                          }`}
                        >
                          {cut.quantity}g {cut.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div>
                  <h3 className="text-3xl mb-2">Spices</h3>
                  <ul>
                    {recipe.spices.map((spice, index) => {
                      return (
                        <li
                          key={`spice-${index}`}
                          className={`text-xl p-2 ${
                            index % 2 !== 1 &&
                            "border rounded-lg border-salumeBlue bg-salumeWhite bg-opacity-30"
                          }`}
                        >
                          {spice.quantity}g {spice.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-8 border-double border-t-4 border-t-salumeWhite">
              <div className="flex w-full items-center">
                <h2 className="text-3xl font-bold mt-8 text-salumeWhite">
                  Steps
                </h2>
                {/* <div className="mt-4 ml-4">
                  <p
                    className="bg-salumeWhite border-salumeWhite rounded-full p-2 text-sm cursor-pointer text-salumeBlue"
                    // onClick={handleClick}
                  >
                    Step by step
                  </p>
                </div> */}
              </div>
              {recipe.steps.map((step, index) => {
                return (
                  <div
                    className="border-salumeWhite shadow-lg rounded-lg p-8"
                    key={`step-${index}`}
                  >
                    <div className="flex flex-col justify-start text-salumeWhite">
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
            </div>

            <p className="text-black text-xl mt-16">{recipe.content}</p>
          </>
        )}
      </div>
    </div>
  );
}
