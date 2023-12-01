import { useState } from "react";
import { useRouter } from "next/navigation";
import UserInput from "@/components/generic/input/userInput";
import StatusButton from "../../button/statusButton";

export default function SalumeInput() {
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
    <div className="my-4 w-full">
      <form
        name="newSalumeForm"
        id="newSalumeForm"
        method="post"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="text-white">
          Name
        </label>
        <UserInput
          width="w-1/2"
          addStyle="mt-1 mb-4 text-xl"
          name="name"
          handleChange={handleChange}
          type="text"
          id="name"
          placeholder="Name"
          required={true}
        />
        {/* <input
              name="name"
              onChange={handleChange}
              type="text"
              id="name"
              placeholder="Name"
              className="border w-96 mt-1 mb-4 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
            /> */}

        <label htmlFor="notes" className="text-white">
          Notes
        </label>

        <textarea
          name="notes"
          onChange={handleChange}
          id="notes"
          placeholder="Notes"
          className="border w-1/2 h-32 mt-1 mb-4 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
          required={true}
        />

        <label htmlFor="title" className="text-white">
          Recipe
        </label>
        <select
          onChange={handleChange}
          id="recipe"
          className="border w-1/2 mt-1 mb-8 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 bg-gray-700 border-gray-600 text-gray-400 focus:ring-blue-500 focus:border-blue-500"
          required={true}
        >
          {
            // chrome console shows an error saying to be using "defaultValue" or "value" on <select> rather than this, but that does not work and all i found online only showed this solution.
          }
          <option value="Select" hidden>
            Select
          </option>
          <option value="Bresaiola" className="text-black bg-black">
            Bresaiola
          </option>
          <option value="Coppa" className="text-black bg-black">
            Coppa
          </option>
          <option value="Pancetta" className="text-black bg-black">
            Pancetta
          </option>
        </select>
        <div className="flex justify-end mt-16">
          <StatusButton reqSuccess={reqSuccess} />
        </div>
      </form>
    </div>
  );
}
