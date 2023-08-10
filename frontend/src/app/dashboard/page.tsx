"use client";

import { useEffect, useState } from "react";

export default function Profile() {
  interface IresponseData {
    status: string;
    data: IprofileData;
  }

  interface IprofileData {
    user: Iuser;
  }

  interface Iuser {
    created_at: string;
    email: string;
    id: string;
    name: string;
    role: string;
    updated_at: string;
  }

  const [profileData, setProfileData] = useState<IprofileData>();

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch("http://localhost:8000/api/users/me", {
        method: "GET",
        credentials: "include",
      });
      const data: IresponseData = await response.json();
      switch (data.status) {
        case "success":
          setProfileData(data.data);
          break;
        case "fail":
          location.href = "/login";
          break;
        default:
          break;
      }
      console.log(data);
    };
    if (document.cookie === "logged_in=true") {
      getProfile();
    } else {
      location.href = "/login";
    }
  }, []);

  return (
    <div>
      {profileData ? (
        <div>
          <p className="text-black">{profileData.user.name}</p>
          <p className="text-black">{profileData.user.email}</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
