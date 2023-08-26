"use client";
import ImgPreview from "@/components/imgPreview";
import StatusButton from "@/components/statusButton";
import React, { useState } from "react";

export default function RecipeImageUpload() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [category, setCategory] = useState<string>("");
  const [reqSuccess, setReqSuccess] = useState<string>("false");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    switch (id) {
      case "title":
        setTitle(value);
        break;
      case "content":
        setContent(value);
        break;
      case "image":
        if (e.target instanceof HTMLInputElement && e.target.files) {
          setImage(e.target.files[0]);
        }
        break;
      case "category":
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (title && content && image && category) {
      setReqSuccess("pending");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("category", category);

      const response = await fetch("http://localhost:8000/api/recipes", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (data.status === "success") {
        setReqSuccess("true");
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center h-full justify-center">
      <div className=" bg-gray-900 py-16 px-48 w-fit rounded-lg">
        <h1 className="text-white text-4xl">Add Recipe</h1>
        <form
          name="uploadForm"
          id="uploadForm"
          method="post"
          onSubmit={handleSubmit}
          className="mt-8"
        >
          <div className="">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <label htmlFor="title" className="text-white">
                  Title
                </label>
                <input
                  name="title"
                  onChange={handleChange}
                  type="text"
                  id="title"
                  placeholder="New Recipe"
                  className="mt-1 mb-4 w-fit border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="category" className="text-white">
                  Category
                </label>
                <input
                  name="category"
                  onChange={handleChange}
                  type="text"
                  id="category"
                  placeholder="Cured Meats"
                  className="mt-1 mb-4 w-fit border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  required={true}
                />
              </div>
            </div>

            <label htmlFor="content" className="text-white">
              Description
            </label>
            <textarea
              name="content"
              onChange={handleChange}
              id="content"
              placeholder="Step 1, Step 2, ..."
              className="mt-1 mb-4 w-96 border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
              required={true}
            />
          </div>
          <div className="flex flex-col">
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
          </div>
          <StatusButton reqSuccess={reqSuccess} />
        </form>
      </div>
    </div>
  );
}
