import PrivateLayout from "@/components/privateLayout/privateLayout";
import RecipeDetails from "@/components/recipes/recipeDetails";

export default function Recipe() {
  return (
    <PrivateLayout>
      <div>
        <RecipeDetails />
      </div>
    </PrivateLayout>
  );
}
