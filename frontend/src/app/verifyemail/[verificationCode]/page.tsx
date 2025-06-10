"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function VerifyEmailPage() {
  const { verificationCode } = useParams();
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [message, setMessage] = useState("");
  console.log("Params", useParams());

  useEffect(() => {
    console.log("Verification code:", verificationCode);
    if (!verificationCode) {
      setStatus("error");
      console.log("Verification code is missing.");
      return;
    }
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/auth/verifyemail/${verificationCode}`
    )
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Verification failed.");
      });
  }, [verificationCode]);

  if (status === "pending")
    return (
      <div>
        <p className="text-green-600 text-4xl">Verifying...</p>
      </div>
    );
  return (
    <div>
      <h1>{status === "success" ? "Success!" : "Error"}</h1>
      <p>{message}</p>
    </div>
  );
}
