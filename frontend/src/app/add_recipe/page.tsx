"use client";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import React, { useState } from "react";
import RecipeInput from "@/components/generic/input/recipeInput";

export default function RecipeImageUpload() {
  const [name, setName] = useState<string>("");
  const [cuts, setCuts] = useState([{ cut: "", cutQuantity: 0 }]);
  const [spices, setSpices] = useState([{ spice: "", spiceQuantity: 0 }]);
  const [steps, setSteps] = useState([
    { name: "", description: "", duration: 0 },
  ]);
  const [reqSuccess, setReqSuccess] = useState<string>("false");

  // const [image, setImage] = useState<File>();
  // const [category, setCategory] = useState<string>("");

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { id, value } = e.target;

  //   switch (id) {
  //     case "name":
  //       setName(value);
  //       break;
  //     case "cut":
  //       // console.log(value);
  //       const newCut = [...meats];
  //       newCut[0][id] = value;
  //       setMeats(newCut);

  //       console.log(meats);
  //       break;

  //     case "cutQuantity":
  //       // console.log(value);
  //       const newCutQuantity = [...meats];
  //       newCutQuantity[0][id] = +value;
  //       setMeats(newCutQuantity);

  //       break;
  //     case "spice":
  //       const newSpice = [...spices];
  //       newSpice[0][id] = value;
  //       setSpices(newSpice);

  //       break;

  //     case "spiceQuantity":
  //       const newSpiceQuantity = [...spices];
  //       newSpiceQuantity[0][id] = +value;
  //       setSpices(newSpiceQuantity);

  //     case "step":
  //       const newStep = [...steps];
  //       newStep[0][id] = value;
  //       console.log(newStep);
  //       setSteps(newStep);

  //       break;

  //     case "stepDescription":
  //       const newStepDescription = [...steps];
  //       newStepDescription[0][id] = +value;
  //       setSteps(newStepDescription);

  //     case "stepDuration":
  //       const newStepDuration = [...steps];
  //       newStepDuration[0][id] = +value;
  //       setSteps(newStepDuration);

  //     // case "image":
  //     //   if (e.target instanceof HTMLInputElement && e.target.files) {
  //     //     setImage(e.target.files[0]);
  //     //   }
  //     //   break;
  //     default:
  //       break;
  //   }
  // };

  // const handleSubmit = async () => {
  //   if (name && cuts && spices && steps) {
  //     setReqSuccess("pending");
  //     // const formData = new FormData();
  //     // formData.append("name", name);
  //     // formData.append("meats", meats);
  //     // formData.append("spices", spices);
  //     // formData.append("steps", steps);
  //     // formData.append("image", image);
  //     // const response = await fetch("http://localhost:8000/api/recipes", {
  //     //   method: "POST",
  //     //   credentials: "include",
  //     //   body: formData,
  //     // });
  //     const response = await fetch("http://localhost:8000/api/recipes", {
  //       method: "POST",
  //       credentials: "include",
  //       body: JSON.stringify({
  //         name,
  //         cuts,
  //         spices,
  //         steps,
  //       }),
  //     });
  //     const data = await response.json();
  //     if (data.status === "success") {
  //       setReqSuccess("true");
  //     }
  //   }
  // };

  return (
    <PrivateLayout>
      <div className="w-full flex flex-col items-center h-full justify-center my-16">
        <div className="py-16 w-2/3">
          {/* <form
            name="uploadForm"
            id="uploadForm"
            method="post"
            onSubmit={handleSubmit}
            className="mt-8"
          > */}
          <RecipeInput />

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
          {/* <div className="flex justify-end mt-16">
              <StatusButton reqSuccess={reqSuccess} />
            </div> */}
          {/* </form> */}
        </div>
      </div>
    </PrivateLayout>
  );
}
