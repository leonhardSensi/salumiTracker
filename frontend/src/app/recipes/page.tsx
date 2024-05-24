"use client";

import RecipeList from "@/components/recipes/recipeList";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import { RecipeError, getRecipes } from "@/api/recipeApi";
import { Irecipe } from "@/interfaces/interfaces";
import { ModalProvider } from "@/utils/modalProvider";
import Link from "next/link";
import Image from "next/image";

export default function Recipes() {
  const {
    status,
    error: errorMessage,
    data: recipes,
  } = useQuery<Irecipe[], RecipeError>({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return (
    <ModalProvider>
      <PrivateLayout>
        <div className="flex flex-col w-full h-full items-center overflow-hidden">
          <div className="flex flex-col lg:w-1/2 items-center justify-start mt-16 overflow-auto bg-salumeBlue rounded-lg shadow-2xl">
            <RecipeList recipes={recipes} />
          </div>
          <Link href="/add_recipe" className="mt-8">
            <div className="">
              <Image
                src={"/plusButton.svg"}
                width={50}
                height={50}
                alt="add recipe"
                className="invert"
              ></Image>
            </div>
          </Link>
        </div>
      </PrivateLayout>
    </ModalProvider>
  );
}
