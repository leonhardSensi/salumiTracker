import { Irecipe } from "@/interfaces/interfaces";
import NoRecipes from "./noRecipes";
import RecipeCard from "./recipeCard";

export default function RecipeList(props: { recipes: Irecipe[] | undefined }) {
  return (
    <div className="flex flex-col w-full h-fit items-center">
      <h1 className="text-black text-4xl m-16">Recipes</h1>

      {props.recipes &&
        (props.recipes.length > 0 ? (
          <div className="mb-16 w-full mx-16 grid grid-cols-2 gap-24 justify-items-center">
            {props.recipes.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </div>
        ) : (
          <NoRecipes />
        ))}
    </div>
  );
}
