import { Irecipe } from "@/interfaces/interfaces";

export default function RecipeCardDetails(props: { recipe: Irecipe }) {
  return (
    <div>
      <div className="px-6 py-4">
        <div className="text-gray-700 font-bold text-xl mb-2">
          {props.recipe.title}
        </div>
        <div className="flex flex-row justify-between">
          <h3 className="text-black">
            Created on: {props.recipe.created_at.slice(0, 10)}
          </h3>
        </div>
      </div>
    </div>
  );
}
