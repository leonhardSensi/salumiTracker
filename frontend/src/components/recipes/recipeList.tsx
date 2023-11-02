"use client";
import { Irecipe } from "@/interfaces/interfaces";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RecipeList(props: { recipes: Irecipe[] | undefined }) {
  const router = useRouter();

  return (
    // <>
    //   {props.recipes &&
    //     (props.recipes.length > 0 ? (
    //       <div className="mb-16 w-full mx-16 grid grid-cols-2 gap-24 justify-items-center">
    //         {props.recipes.map((recipe) => (
    //           <Card
    //             details={recipe}
    //             image={`http://localhost:8000/recipes/${recipe.image}`}
    //             key={recipe.id}
    //             imageSize={{ width: 200, height: 200 }}
    //             link={`/recipes/${recipe.id}`}
    //           >
    //             <RecipeCardDetails recipe={recipe} key={recipe.id} />
    //           </Card>
    //         ))}
    //         <LoadingCard />
    //       </div>
    //     ) : (
    //       <NoRecipes />
    //     ))}
    // </>
    <>
      {props.recipes ? (
        <>
          {props.recipes.length === 0 ? (
            <div className="flex text-xl justify-center text-black">
              <p>No recipes found. Create a new one instead!</p>
            </div>
          ) : (
            <table className="border rounded-lg w-full text-m text-left text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="w-full">
                  <th scope="col" className="px-6 py-3">
                    name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    created at
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {props.recipes.map((recipe) => (
                  <tr
                    key={`recipe-${recipe.id}`}
                    className="bg-gray-800 border-b hover:bg-gray-700 transition-all"
                  >
                    <th
                      scope="row"
                      className="text-xl cursor-pointer px-6 py-4 font-medium text-white whitespace-nowrap "
                      onClick={() => router.push(`/recipes/edit/${recipe.id}`)}
                    >
                      {/* <Image
                  src={`http://localhost:8000/recipes/${recipe.image}`}
                  width={100}
                  height={100}
                  alt="recipe image"
                /> */}
                      {recipe.title}
                    </th>
                    <td
                      className="cursor-pointer px-6 py-4"
                      onClick={() => router.push(`/recipes/edit/${recipe.id}`)}
                    >
                      {new Date(recipe.created_at).getDate()}/
                      {new Date(recipe.created_at).getMonth()}/
                      {new Date(recipe.created_at).getFullYear()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="relative group inline-block">
                        <button className="flex flex-row group-hover:bg-gray-700 py-2 px-4 rounded-t-md text-white hover:text-gray-300 transition-colors w-fit">
                          <Image
                            className="w-4"
                            src={"./edit.svg"}
                            width={100}
                            height={100}
                            alt="edit"
                          />
                        </button>
                        <div className="z-10 w-fit hidden group-hover:block absolute bg-white py-2 px-3 rounded-md shadow-lg">
                          <Link
                            className="block py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md"
                            href={`/recipes/edit/${recipe.id}`}
                          >
                            Edit
                          </Link>
                          <Link
                            className="block py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md"
                            href="/"
                          >
                            Delete
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <div className="flex text-xl justify-center text-black">
          <p className="text-black">
            There was an error getting recipes. Please{" "}
            <span
              className="text-blue-400 underline cursor-pointer"
              onClick={() => location.reload()}
            >
              try again
            </span>
            .
          </p>
        </div>
      )}
    </>
  );
}
