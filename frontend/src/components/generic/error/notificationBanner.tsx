import { notificationState } from "../../../atoms/notificationAtoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";

export default function NotificationBanner() {
  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notificationDetails.type && notificationDetails.message) {
      setIsVisible(true);
    }
    const notificationTimeout = setTimeout(() => {
      setNotificationDetails({ type: null, message: null });
      setIsVisible(false);
    }, 5000);
    return () => {
      clearTimeout(notificationTimeout);
    };
  }, [notificationDetails]);

  //   useEffect(() => {
  //     if (animationCompleted) {
  //       const animationTimeout = setTimeout(() => {
  //         setAnimationCompleted(false);
  //       }, 7000);
  //       return () => clearTimeout(animationTimeout);
  //     }
  //   }, [animationCompleted]);

  return (
    <div
      className={`p-4 m-4 text-lg text-green-800 rounded-lg bg-green-100 z-50 top-0 absolute space-x-4 flex ${
        notificationDetails.type === "delete" && "bg-red-300"
      } ${
        notificationDetails.message ? "animate-notification-slide-in" : "hidden"
        //   : "animate-notification-slide-out"
      }`}
      role="alert"
      id="notification-banner"
    >
      <p className="font-medium text-xl">{notificationDetails.message}</p>
      <Image
        onClick={() => {
          setNotificationDetails({ type: null, message: null });
          setIsVisible(false);
        }}
        src="/cross.svg"
        width={30}
        height={30}
        alt="close banner"
        className="cursor-pointer"
      />
    </div>
  );
}
