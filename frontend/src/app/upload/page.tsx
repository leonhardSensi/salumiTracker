"use client";
import React, { ChangeEvent, useState } from "react";

export default function RecipeImageUpload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File>();
  const [category, setCategory] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "content":
        setContent(e.target.value);
        break;
      case "image":
        if (e.target.files) {
          setImage(e.target.files[0]);
        }
        break;
      case "category":
        setCategory(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (title && content && image && category) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("category", category);

      console.log(formData);
      const response = await fetch("http://localhost:8000/api/recipes", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <div>
      <form
        name="uploadForm"
        id="uploadForm"
        method="post"
        onSubmit={handleSubmit}
      >
        <input name="image" type="file" id="image" onChange={handleChange} />
        <input
          name="title"
          onChange={handleChange}
          type="text"
          id="title"
          placeholder="title"
          className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          name="content"
          onChange={handleChange}
          type="text"
          id="content"
          placeholder="description"
          className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          name="category"
          onChange={handleChange}
          type="text"
          id="category"
          placeholder="category"
          className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
        />

        <button
          type="submit"
          className=" text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
