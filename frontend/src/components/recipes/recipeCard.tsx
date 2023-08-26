import Link from "next/link";
import Image from "next/image";
import { Irecipe } from "@/interfaces/interfaces";

export default function RecipeCard(props: { recipe: Irecipe }) {
  const handleSelection = (recipe: Irecipe) => {
    const formattedCreated_at = recipe.created_at.slice(0, 10);
    const formattedUpdated_at = recipe.updated_at.slice(0, 10);
    sessionStorage.setItem("recipeId", recipe.id);
    sessionStorage.setItem("title", recipe.title);
    sessionStorage.setItem("content", recipe.content);
    sessionStorage.setItem("image", recipe.image);
    sessionStorage.setItem("updated_at", recipe.updated_at);
    sessionStorage.setItem("created_at", formattedCreated_at);
    sessionStorage.setItem("created_at", formattedUpdated_at);
  };
  return (
    <div className="w-2/3 bg-white h-fit rounded overflow-hidden shadow-lg hover:scale-105 transition-all duration-200">
      <Link href={"/recipe"} onClick={() => handleSelection(props.recipe)}>
        <Image
          width={200}
          height={200}
          src={`http://localhost:8000/recipes/${props.recipe.image}`}
          className="w-50 px-6 py-4"
          alt="Salume"
        />

        <div className="px-6 py-4">
          <div className="text-gray-700 font-bold text-xl mb-2">
            {props.recipe.title}
          </div>
          <div className="flex flex-row justify-between">
            <h3 className="text-black">
              Created at: {props.recipe.created_at.slice(0, 10)}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
