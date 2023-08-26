"use client";

import { useEffect, useState } from "react";

export default function Account() {
  const [email, setEmail] = useState<String>("");
  const [name, setName] = useState<String>("");

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const name = sessionStorage.getItem("name");

    if (email && name) {
      setEmail(email);
      setName(name);
    }
  }, []);

  return (
    <div className="h-screen">
      <h1 className="text-black text-4xl m-16 h-fit">Account</h1>

      <p className="text-black text-xl ml-16">Name: {name}</p>
      <p className="text-black text-xl ml-16">Email: {email}</p>
    </div>
  );
}
