"use client";
import { Irecipe } from "../../interfaces/interfaces";
import Link from "next/link";
import Image from "next/image";
import { useModal } from "../../utils/modalProvider";
import { useRecoilState } from "recoil";
import { modalData } from "../../atoms/modalAtoms";

export default function RecipeList(props: { recipes: Irecipe[] | undefined }) {
  const { openModal } = useModal();
  const [modalDetails, setModalDetails] = useRecoilState(modalData);

  return (
    <>
      {props.recipes ? (
        <>
          {props.recipes.length === 0 ? (
            <div className="flex text-xl justify-center">
              <p>No recipes found. Create a new one instead!</p>
            </div>
          ) : (
            <table className="w-full text-left mb-16">
              {/* <thead className="lg:text-6xl text-3xl w-full text-center">
                <tr>
                  <th className="font-bold font-Montserrat pb-8 flex justify-center">
                    <h1 className="w-fit border-b-salumeWhite border-b-4 border-double">
                      Recipes
                    </h1>
                  </th>
                </tr>
              </thead> */}
              <tbody>
                {props.recipes.map((recipe) => (
                  <tr
                    key={`recipe-${recipe.id}`}
                    className="border-y border-wetSand hover:bg-gradient-to-l from-eggshell hover:text-wetSand hover:border-y-eggshell w-full transition-colors duration-100"
                  >
                    <td className="lg:text-4xl cursor-pointer  font-medium  whitespace-nowrap flex justify-between items-center">
                      {/* <Image
                        src={`http://localhost:8000/recipes/${recipe.image}`}
                        width={100}
                        height={100}
                        alt="recipe image"
                      /> */}
                      <Link
                        href={`/recipes/${recipe.id}`}
                        className="w-full px-6 py-4"
                      >
                        <p className="font-serif">- {recipe.title}</p>
                      </Link>
                      {/* <td
                      className="cursor-pointer px-6 py-4"
                      onClick={() => router.push(`/recipes/edit/${recipe.id}`)}
                    >
                      {new Date(recipe.created_at).getDate()}/
                      {new Date(recipe.created_at).getMonth() + 1}/
                      {new Date(recipe.created_at).getFullYear()}
                    </td> */}
                      {/* <div className="relative group inline-block">
                        <button className="flex flex-row py-2 px-4 rounded-t-md text-white w-full">
                          <div className="p-2 group">
                            <Image
                              className=""
                              src={"./editButton.svg"}
                              width={40}
                              height={40}
                              alt="edit"
                            />
                          </div>
                        </button>
                        <div className="z-10 w-fit hidden group-hover:block absolute bg-salumeBlue py-2 px-3 rounded-md shadow-lg font-Montserrat border-black border">
                          <Link
                            className="block py-1 px-2 text-sm text-salumeWhite hover:text-salumeBlue hover:bg-salumeWhite rounded-md font-bold"
                            href={`/recipes/edit/${recipe.id}`}
                          >
                            Edit
                          </Link>
                          <Link
                            className="block py-1 px-2 text-sm text-salumeWhite hover:text-salumeBlue hover:bg-salumeWhite rounded-md font-bold"
                            href="/"
                          >
                            Delete
                          </Link>
                        </div>
                      </div> */}
                      <div className="flex px-6">
                        <Link href={`/recipes/edit/${recipe.id}`}>
                          <Image
                            className="mr-8 md:w-10 w-6"
                            src={"./editButton.svg"}
                            width={100}
                            height={100}
                            alt="edit"
                          />
                        </Link>
                        <Image
                          className="md:w-10 w-6"
                          src={"./delete.svg"}
                          width={100}
                          height={100}
                          alt="delete"
                          onClick={() => {
                            openModal();
                            setModalDetails({
                              type: "delete",
                              subject: "recipe",
                              info: {
                                data: {
                                  name: recipe.title,
                                  id: recipe.id,
                                },
                                image: "",
                                title: "",
                                details: "",
                                inputLabel: "",
                                placeHolder: "",
                                user: {},
                                recipeSteps: [],
                              },
                            });
                          }}
                        />
                        {/* <DeleteIcon /> */}

                        {/* <UserCard
                            title={"delete"}
                            details={"sure?"}
                            imgSrc={"/account.svg"}
                            isModalOpen={isModalOpen}
                            openModal={openModal}
                            closeModal={closeModal}
                          /> */}

                        {/* <UserCard
                            title={"Delete recipe"}
                            details={"sure?"}
                            imgSrc={""}
                            isModalOpen={isModalOpen}
                            openModal={openModal}
                            closeModal={closeModal}
                          /> */}
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

{
  /*<>
{props.recipes ? (
  <>
    {props.recipes.length === 0 ? (
      <div className="flex text-xl justify-center text-black">
        <p>No recipes found. Create a new one instead!</p>
      </div>
    ) : (
      <table className="w-full text-m text-gray-500  mb-16">
        <thead className="text-4xl text-gray-700 uppercase w-full text-center">
          <tr>
            <th className="w-full text font-Montserrat text-salumeWhite border-b border-salumeWhite">
              Recipes
            </th>
          </tr>
          {/* <tr className="w-full">
             <th scope="col" className="px-6 py-3">
              name
            </th>
             <th scope="col" className="px-6 py-3">
              created at
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="text-left">
          {props.recipes.map((recipe) => (
            <tr
              key={`recipe-${recipe.id}`}
              className="border-b border-salumeWhite hover:bg-gray-700 transition-all w-full"
            >
              <td
                scope="row"
                className="text-xl cursor-pointer px-6 py-4 font-medium text-white whitespace-nowrap font-Satisfy"
                onClick={() => router.push(`/recipes/edit/${recipe.id}`)}
              >
                {/* <Image
                  src={`http://localhost:8000/recipes/${recipe.image}`}
                  width={100}
                  height={100}
                  alt="recipe image"
                /> 
                - {recipe.title}
              </td>
              {/* <td
                className="cursor-pointer px-6 py-4"
                onClick={() => router.push(`/recipes/edit/${recipe.id}`)}
              >
                {new Date(recipe.created_at).getDate()}/
                {new Date(recipe.created_at).getMonth() + 1}/
                {new Date(recipe.created_at).getFullYear()}
              </td> 

              <td className="px-6 py-4">
                {/* <div className="relative group inline-block">
                  <button className="flex flex-row py-2 px-4 rounded-t-md w-fit">
                  <div className="">
                    <Image
                      className="group"
                      src={"./editButton.svg"}
                      width={150}
                      height={150}
                      alt="edit button"
                    />
                  </div>
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
                <div className="relative group inline-block">
                  <button className="flex flex-row group-hover:bg-white/10 py-2 px-4 rounded-t-md text-white hover:text-gray-300 transition-colors w-fit">
                    <Image
                      className="group-hover:invert invert"
                      src={"./editButton.svg"}
                      width={150}
                      height={150}
                      alt="edit button"
                    />
                  </button>
                  <div className="w-full hidden group-hover:block absolute bg-white py-2 px-3 rounded-b-md shadow-lg">
                    <Link
                      className="block py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md"
                      href="/account"
                    >
                      My Settings
                    </Link>
                    <Link
                      className="block py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded-md"
                      href="/logout"
                    >
                      Logout
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
*/
}
