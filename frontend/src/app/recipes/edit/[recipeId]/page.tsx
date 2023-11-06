"use client";

import { getRecipe } from "@/api/recipeApi";
import EditRecipeInput from "@/components/generic/input/editRecipeInput";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function EditRecipeDetails() {
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
    <PrivateLayout>
      <div className="w-full flex flex-col items-center h-full justify-center my-16">
        <div className="py-16 w-2/3 rounded-lg">
          {recipe && <EditRecipeInput recipe={recipe} />}

          {/* <div className="flex flex-col">
                      <label htmlFor="image" className="text-white">
                        Add Image
                      </label>
        
                      <div className="rounded-lg w-96 bg-gray-700 mb-8 py-6 px-9 mt-1">
                        <div className="mb-6 pt-4">
                          <div className="mb-8">
                            <input
                              onChange={handleChange}
                              accept="image/*"
                              type="file"
                              name="image"
                              id="image"
                              className="invisible"
                            />
                            <label
                              htmlFor="image"
                              className="relative flex items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                            >
                              <div>
                                <span className="cursor-pointer inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium textwhite">
                                  Browse
                                </span>
                              </div>
                            </label>
                          </div>
                          {image ? <ImgPreview image={image} /> : <div></div>}
                        </div>
                      </div>
                    </div> */}
        </div>
      </div>
    </PrivateLayout>
  );
}
