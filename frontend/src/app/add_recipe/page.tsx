"use client";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import React, { useState } from "react";
import RecipeInput from "@/components/generic/input/recipeInput";

export default function NewRecipe() {
  return (
    <PrivateLayout>
      <div className="w-full flex flex-col items-center h-full justify-center my-16">
        <div className="py-16 w-2/3">
          <RecipeInput />
        </div>
      </div>
    </PrivateLayout>
  );
}
