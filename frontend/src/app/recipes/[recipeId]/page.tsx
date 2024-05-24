import PrivateLayout from "@/components/privateLayout/privateLayout";
import RecipeDetails from "@/components/recipes/recipeDetails";

export default function Recipe() {
  return (
    <PrivateLayout>
      <div className="flex flex-col items-center h-fit overflow-auto my-16 rounded-lg bg-salumeBlue mx-80 z-10 shadow-2xl">
        <div className="py-16 w-2/3">
          <RecipeDetails />
        </div>
      </div>
    </PrivateLayout>
  );
}
