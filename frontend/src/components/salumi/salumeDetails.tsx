import { getSalume } from "@/api/salumeApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import LoadingSpinner from "../generic/loading/loadingSpinner";
import Image from "next/image";
import React, { useState } from "react";
import { getUser } from "@/api/userApi";
import Link from "next/link";
import { ISalume } from "@/interfaces/interfaces";
import { instanceOf } from "@/utils/typeChecker";
import { useModal } from "@/utils/modalProvider";
import { useRecoilState } from "recoil";
import { modalData } from "@/atoms/modalAtoms";

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

  return (
    <div className="m-24 flex flex-col items-center">
      {salumeStatus === "loading" && <LoadingSpinner />}
      {salumeError === "error" && (
        <p className="text-black">{JSON.stringify(salumeError)}</p>
      )}
      {instanceOf(salume) && userData && (
        <>
          <div className="w-1/3">
            <div className="flex flex-col border border-salumeBlue shadow-2xl rounded-lg p-8 items-center w-full">
              <div className="flex items-center w-full mb-4 justify-between">
                <div className="flex items-center space-x-4">
                  <div className="border rounded-full bg-black w-fit">
                    <Image
                      width={40}
                      height={40}
                      src={`http://localhost:8000/profilePictures/${userData.photo}`}
                      alt="profile picture"
                      className="border rounded-full profile-picture"
                    />
                  </div>
                  <h2>{userData.name}</h2>
                </div>
                {/* <Image src={"/edit.svg"} alt={"edit"} width={20} height={20} /> */}
                <div className="relative group inline-block">
                  <button className="py-2 rounded-t-md group-hover:invert">
                    <div className="group">
                      <Image
                        src={"/edit.svg"}
                        width={20}
                        height={20}
                        alt="edit"
                      />
                    </div>
                  </button>
                  <div className="z-10 w-36 hidden group-hover:block absolute bg-salumeBlue py-2 px-3 rounded-md shadow-lg font-Montserrat border-black border">
                    {/* <ul className="w-full">
                      <li className="cursor-pointer block py-1 px-2 text-sm text-salumeWhite hover:text-salumeBlue hover:bg-salumeWhite rounded-md font-bold">
                        <label htmlFor="salumeImg" className="cursor-pointer">
                          {salume.image ? "Edit picture" : "Add picture"}
                        </label>
                        <input
                          name="salumeImg"
                          id="salumeImg"
                          type="file"
                          className="hidden"
                          onChange={(e) => handleChange(e)}
                          accept="image/*"
                        />
                      </li>
                      <li className="cursor-pointer block py-1 px-2 text-sm text-salumeWhite hover:text-salumeBlue hover:bg-salumeWhite rounded-md font-bold">
                        Delete picture
                      </li>
                    </ul> */}
                    <Link
                      href={`/salumi/edit/${salume.id}`}
                      className="cursor-pointer block py-1 px-2 text-sm text-salumeWhite hover:text-salumeBlue hover:bg-salumeWhite rounded-md font-bold"
                    >
                      Edit
                    </Link>
                    <li
                      className="cursor-pointer block py-1 px-2 text-sm text-salumeWhite hover:text-salumeBlue hover:bg-salumeWhite rounded-md font-bold"
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
                          },
                        });
                      }}
                    >
                      Delete
                    </li>
                  </div>
                </div>
              </div>

              {salume.image && (
                <Image
                  src={`http://localhost:8000/salumePictures/${salume.image}`}
                  width={100}
                  height={100}
                  alt="salume"
                  className="w-full"
                />
              )}

              <div className="w-full items-start">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Image
                      key={`rating-${star}`}
                      className={`pr-1 ${
                        star <= salume.rating ? "grayscale-0" : "grayscale"
                      }`}
                      src={"/salami.svg"}
                      width={30}
                      height={30}
                      alt="star"
                    />
                  ))}
                </div>

                <h1 className="text-xl font-bold mt-4">{salume.name}</h1>
                <h2 className="text-lg">{salume.notes}</h2>
              </div>
            </div>

            {/* <div className="flex flex-col w-full mt-16"> */}
            {/* <form onSubmit={handleSubmit} className="w-full"> */}
            {/* <label htmlFor="completedNotes" className="text-2xl w-full">
                  Add notes for next time!
                </label>
                <textarea
                  name="completedNotes"
                  onChange={handleChange}
                  id="completedNotes"
                  placeholder="- Less salt"
                  className="w-full h-32 text-black mt-1 mb-4 border text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-100 border-gray-300 placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  required={true}
                /> */}
            {/* <div className="flex flex-col space-y-4">
                  <label htmlFor="salumeImg" className="text-2xl w-full">
                    Upload a picture of your salume
                  </label>
                  <input
                    name="salumeImg"
                    type="file"
                    className="border-salumeWhite border"
                    onChange={(e) => handleChange(e)}
                    accept="image/*"
                  />
                  <StatusButton
                    reqSuccess={updateSalume.isLoading ? "pending" : "false"}
                  />
                </div> */}
            {/* </form> */}
            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
}
