import Link from "next/link";

export default function NoRecipes() {
  return (
    <div className="w-fit mx-16 flex flex-col justify-center items-center">
      <p className="text-black text-xl">
        Nothing found. Please create a new recipe first!
      </p>
      <Link href={"/add_recipe"}>
        <button
          type="button"
          className="w-fit text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
        >
          Create
        </button>
      </Link>
    </div>
  );
}
