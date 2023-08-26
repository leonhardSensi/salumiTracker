"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Irecipe } from "@/interfaces/interfaces";

export default function RecipeDetails() {
  const [currentRecipe, setCurrentRecipe] = useState<Irecipe>();
  useEffect(() => {
    const id = sessionStorage.getItem("recipeId");
    const image = sessionStorage.getItem("image");
    const title = sessionStorage.getItem("title");
    const content = sessionStorage.getItem("content");
    const created_at = sessionStorage.getItem("created_at");
    const updated_at = sessionStorage.getItem("updated_at");
    if (id && image && title && content && created_at && updated_at) {
      setCurrentRecipe({ id, image, title, content, created_at, updated_at });
    }
  }, []);

  return currentRecipe ? (
    <div>
      <svg
        className="h-12"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <Link className="w-12" href="/recipes">
          <g>
            <path fill="none" d="M0 0h24v24H0z" /> <path d="M8 12l6-6v12z" />
          </g>
        </Link>
      </svg>
      <div className="mx-16 flex flex-col items-center">
        <h1 className="text-black text-4xl mb-2 h-fit">
          {currentRecipe.title}
        </h1>
        <p className="text-black text-xl ">
          Created at: {currentRecipe.created_at}
        </p>
        <Image
          width={200}
          height={200}
          src={`http://localhost:8000/recipes/${currentRecipe.image}`}
          alt={"recipe image"}
          className=" mt-8"
        />

        <p className="text-black text-xl mt-16">{currentRecipe.content}</p>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
