"use client";

import PrivateLayout from "@/components/PrivateLayout/privateLayout";
import StatusButton from "@/components/statusButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSalume() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [recipe, setRecipe] = useState("");
  const [reqSuccess, setReqSuccess] = useState<string>("false");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "notes":
        setNotes(e.target.value);
        break;
      case "recipe":
        setRecipe(e.target.value);
        break;
      default:
        break;
    }
  };

  // NO ROUTE AND TABLE YET
  const handleSubmit = async () => {
    if (title && notes && recipe) {
      setReqSuccess("pending");
      const response = await fetch("/", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          title,
          notes,
          recipe,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setReqSuccess("true");
        router.refresh();
      }
    }
  };

  return (
    <PrivateLayout>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className=" bg-gray-900 py-16 px-48 w-fit rounded-lg">
          <h1 className=" text-white text-4xl">Add your new salume</h1>
          <form
            name="newSalumeForm"
            id="newSalumeForm"
            method="post"
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <label htmlFor="name" className="text-white">
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              id="name"
              placeholder="Name"
              className="border w-96 mt-1 mb-4 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
            />

            <label htmlFor="notes" className="text-white">
              Notes
            </label>

            <textarea
              name="notes"
              onChange={handleChange}
              id="notes"
              placeholder="Notes"
              className="border w-96 h-32 mt-1 mb-4 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
            />

            <label htmlFor="title" className="text-white">
              Recipe
            </label>
            <select
              onChange={handleChange}
              id="recipe"
              className="border w-96 mt-1 mb-8 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 bg-gray-700 border-gray-600 text-gray-400 focus:ring-blue-500 focus:border-blue-500"
            >
              {
                // chrome console shows an error saying to be using "defaultValue" or "value" on <select> rather than this, but that does not work and all i found online only showed this solution.
              }
              <option selected hidden>
                Select
              </option>
              <option className="text-black bg-black">Bresaiola</option>
              <option className="text-black bg-black">Coppa</option>
              <option className="text-black bg-black">Pancetta</option>
            </select>

            <StatusButton reqSuccess={reqSuccess} />
          </form>
        </div>
      </div>
    </PrivateLayout>
  );
}
