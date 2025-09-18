import { getSalume } from "../../api/salumeApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import LoadingSpinner from "../generic/loading/loadingSpinner";
import Image from "next/image";
import React from "react";
import { getUser } from "../../api/userApi";
import Link from "next/link";
import { instanceOf } from "../../utils/typeChecker";
import { useModal } from "../../utils/modalProvider";
import { useRecoilState } from "recoil";
import { modalData } from "../../atoms/modalAtoms";

export default function SalumeDetails() {
  const { data: userData } = useQuery(["user"], getUser);
  const { openModal } = useModal();
  const [modalDetails, setModalDetails] = useRecoilState(modalData);

  const params = useParams();
  const {
    status: salumeStatus,
    error: salumeError,
    data: salume,
  } = useQuery({
    queryKey: ["salume", params.salumeId],
    queryFn: () => getSalume(params.salumeId as string),
  });

  console.log("Salume Details:", salume);

  return (
    <div className="min-h-screen w-full bg-eggshell px-0 py-8 flex flex-col items-center">
      {salumeStatus === "loading" && <LoadingSpinner />}
      {salumeError === "error" && (
        <p className="text-black">{JSON.stringify(salumeError)}</p>
      )}
      {instanceOf(salume) && userData && (
        <div className="bg-flesh/90 shadow-2xl rounded-3xl p-10 max-w-3xl w-full flex flex-col items-center border-2 border-wetSand">
          {/* Header */}
          <div className="flex items-center w-full mb-8 justify-between">
            <div className="flex items-center space-x-4">
              <div className="border-4 border-wetSand rounded-full bg-black w-fit shadow-lg">
                <Image
                  width={56}
                  height={56}
                  src={`${process.env.NEXT_PUBLIC_BACKEND}/profilePictures/${userData.photo}`}
                  alt="profile picture"
                  className="border rounded-full profile-picture"
                />
              </div>
              <h2 className="text-lg font-semibold text-wetSand">
                Made by {userData.name}
              </h2>
            </div>
            <div className="relative group inline-block">
              <button className="py-2 rounded-t-md invert">
                <div className="group">
                  <Image src={"/edit.svg"} width={28} height={28} alt="edit" />
                </div>
              </button>
              <div className="z-10 w-36 hidden group-hover:block absolute bg-wetSand py-2 px-3 rounded-md shadow-lg font-Montserrat right-0">
                <Link
                  href={`/salumi/edit/${salume.id}`}
                  className="cursor-pointer block py-1 px-2 text-sm text-eggshell hover:text-stone hover:bg-eggshell rounded-md font-bold"
                >
                  Edit
                </Link>
                <button
                  className="cursor-pointer block py-1 px-2 text-sm text-eggshell hover:text-stone hover:bg-eggshell rounded-md font-bold"
                  onClick={() => {
                    openModal();
                    setModalDetails({
                      type: "delete",
                      subject: "salume",
                      info: {
                        data: {
                          name: salume.name,
                          id: salume.id,
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
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Salume Image */}
          {salume.image && (
            <div className="w-full flex justify-center mb-8">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND}/salumePictures/${salume.image}`}
                width={320}
                height={320}
                alt="salume"
                className="rounded-2xl shadow-lg object-cover max-h-72"
              />
            </div>
          )}

          {/* Details */}
          <div className="w-full flex flex-col items-center">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  key={`rating-${star}`}
                  className={`pr-1 ${
                    star <= salume.rating ? "grayscale-0" : "grayscale"
                  }`}
                  src={"/salami.svg"}
                  width={36}
                  height={36}
                  alt="star"
                />
              ))}
            </div>
            <h1 className="text-3xl font-bold mt-2 text-wetSand drop-shadow mb-2">
              {salume.name}
            </h1>
            {salume.notes && (
              <h2 className="text-lg italic text-stone mb-2">{salume.notes}</h2>
            )}
            <h2 className="text-lg font-semibold text-wetSand mb-2">
              Start weight:{" "}
              <span className="font-mono">{salume.startWeight}g</span>
            </h2>

            <h2 className="text-lg font-semibold text-wetSand mb-2">
              Final weight:{" "}
              <span className="font-mono">{salume.finalWeight}g</span>
            </h2>
            <p className="text-sm text-stone mt-2">
              Created:{" "}
              {new Date(salume.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
