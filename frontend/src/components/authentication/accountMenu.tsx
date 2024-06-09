"use client";

import { IManageProps, IprofileData, Iuser } from "../../interfaces/interfaces";
import { useUpdateUserMutation } from "../../mutations/userMutations";
import Image from "next/image";

export default function AccountMenu(props: IprofileData) {
  // const { data } = useQuery(["user"], getUser);
  const updateUser = useUpdateUserMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLFormElement>
  ) => {
    const photo = e.target.files[0];
    if (props.user) {
      const user = {
        // name: props.user.name,
        // email: props.user.email,
        // dateOfBirth: props.user.date_of_birth,
        photo,
      };
      updateUser.mutate(user);
      // window.location.reload();
    }
  };

  return (
    <div>
      {props.user && (
        <div>
          <div className="flex">
            <div className="ml-16 w-full">
              <div className="text-black my-8 flex">
                <div className="cursor-pointer relative group border rounded-full bg-black mb-6 w-fit">
                  <Image
                    width={100}
                    height={100}
                    src={`${process.env.NEXT_PUBLIC_BACKEND}/profilePictures/${props.user.photo}`}
                    alt="profile picture"
                    className="border rounded-full profile-picture transition-opacity duration-300 ease-in-out group-hover:opacity-40"
                  />
                  <div className="overlay absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    <label
                      htmlFor="profilePicture"
                      className="text-white cursor-pointer w-full h-full flex justify-center items-center"
                    >
                      Edit
                    </label>
                    <input
                      name="profilePicture"
                      id="profilePicture"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      accept="image/*"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center pl-8 space-y-2">
                  <p className="text-xl font-semibold">{props.user.name}</p>
                  <p className="text-xl">{props.user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
