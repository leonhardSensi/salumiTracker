import { getSalume } from "../../api/salumeApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import LoadingSpinner from "../generic/loading/loadingSpinner";
import Image from "next/image";
import { useAddSalumeImageMutation } from "../../mutations/salumeMutation";
import React, { useState } from "react";
import { getUser } from "../../api/userApi";
import Rating from "../generic/rating/rating";
import UserInput from "../generic/input/userInput";
import { useRouter } from "next/navigation";
import GenericButton from "../generic/button/genericButton";
import StatusButton from "../generic/button/statusButton";
import { instanceOf } from "../../utils/typeChecker";
import { useRecoilState } from "recoil";
import { notificationState } from "../../atoms/notificationAtoms";

export default function EditSalume() {
  const { data: userData } = useQuery(["user"], getUser);
  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);

  const router = useRouter();

  const params = useParams();
  const {
    status: salumeStatus,
    error: salumeError,
    data: salume,
  } = useQuery({
    queryKey: ["salume", params.salumeId],
    queryFn: () => getSalume(params.salumeId as string),
  });

  const [salumeImg, setSalumeImg] = useState<File>();

  const [salumeName, setSalumeName] = useState(salume && salume.name);
  const [salumeNotes, setSalumeNotes] = useState(salume && salume.notes);

  const updateSalume = useAddSalumeImageMutation();

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLFormElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >,
    inputType: string
  ) => {
    switch (inputType) {
      case "name":
        setSalumeName(e.target.value);
        break;
      case "notes":
        setSalumeNotes(e.target.value);
        break;
      case "image":
        if (e.target instanceof HTMLInputElement && e.target.files) {
          setSalumeImg(e.target.files[0]);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (salumeImg && salumeName && salumeNotes && instanceOf(salume)) {
      const newSalume = {
        ...salume,
        name: salumeName,
        notes: salumeNotes,
        image: salumeImg,
      };

      const response = await updateSalume.mutateAsync({
        id: newSalume.id,
        name: newSalume.name,
        notes: newSalume.notes,
        state: newSalume.state,
        image: newSalume.image,
        rating: newSalume.rating,
        recipeId: newSalume.recipe.id,
      });
      if (response && response.status === 200) {
        setNotificationDetails({
          type: "salumeUpdate",
          message: "Salume updated successfully!",
        });
        router.push(`/salumi/${salume.id}`);
      }
    }
  };

  return (
    <div className="">
      {salumeStatus === "loading" && <LoadingSpinner />}
      {salumeError === "error" && (
        <p className="text-black">{JSON.stringify(salumeError)}</p>
      )}
      {instanceOf(salume) && userData && (
        <div className="flex justify-center my-24">
          <div className="border border-salumeBlue shadow-2xl rounded-lg w-1/3 p-8">
            <div className="mb-4">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex items-center w-full mb-4 justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="border rounded-full bg-black w-fit">
                      <Image
                        width={40}
                        height={40}
                        src={`${process.env.NEXT_PUBLIC_BACKEND}/profilePictures/${userData.photo}`}
                        alt="profile picture"
                        className="border rounded-full profile-picture"
                      />
                    </div>
                    <h2>{userData.name}</h2>
                  </div>
                </div>

                <div className="cursor-pointer relative group bg-salumeBlue mb-6 w-full">
                  <Image
                    width={100}
                    height={100}
                    priority={true}
                    placeholder="blur"
                    blurDataURL="/salami.svg"
                    src={`${process.env.NEXT_PUBLIC_BACKEND}/salumePictures/${salume.image}`}
                    alt="salume image"
                    className="w-full transition-opacity duration-300 ease-in-out bg-black group-hover:opacity-70"
                  />
                  <div className="overlay absolute inset-0">
                    <label
                      htmlFor="salumeImage"
                      className="text-white text-2xl cursor-pointer w-full h-full flex justify-center items-center"
                    >
                      Edit
                    </label>
                    <input
                      name="salumeImage"
                      id="salumeImage"
                      type="file"
                      className="hidden"
                      onClick={() => console.log("hello")}
                      onChange={(e) => {
                        handleChange(e, "image");
                      }}
                      accept="image/*"
                    />
                  </div>
                </div>

                {/* <Image
                  //   src={`http://localhost:8000/salumePictures/${salume.image}`}
                  //   width={100}
                  //   height={100}
                  //   alt="salume"
                  //   className="w-full"
                  // />
                      */}

                <div className="w-full items-start flex flex-col">
                  {/* <div className="flex">
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
                </div> */}
                  <div className="mb-4">
                    <h3>Rating</h3>
                    <Rating salume={salume} />
                  </div>
                  {/* <h1 className="text-xl font-bold mt-4">{salume.name}</h1> */}
                  {/* <h2 className="text-lg">{salume.notes}</h2> */}
                  <div className="mb-4">
                    <label htmlFor="salumeName">Name</label>
                    <UserInput
                      handleChange={(e) => handleChange(e, "name")}
                      type={"text"}
                      name={"salumeName"}
                      id={"salumeName"}
                      defaultValue={salume.name}
                      required={false}
                      placeholder=""
                      addStyle="w-full"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label htmlFor="salumeNotes">Description</label>
                    <textarea
                      className="text-black w-full h-32"
                      id="salumeNotes"
                      name="salumeNotes"
                      defaultValue={salume.notes}
                      onChange={(e) => handleChange(e, "notes")}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <GenericButton
                    text={"Cancel"}
                    onClick={() => router.push(`/salumi/${salume.id}`)}
                  />
                  <StatusButton reqSuccess={"false"} />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
