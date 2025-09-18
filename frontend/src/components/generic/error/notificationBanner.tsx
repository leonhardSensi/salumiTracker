import { notificationState } from "../../../atoms/notificationAtoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const bannerVariants = {
  hidden: { y: -80, opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 32,
      duration: 0.5,
    },
  },
  exit: {
    y: -80,
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.35, ease: "easeInOut" as const },
  },
};

export default function NotificationBanner() {
  const [notificationDetails, setNotificationDetails] =
    useRecoilState(notificationState);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const valid =
      notificationDetails.type &&
      typeof notificationDetails.type === "string" &&
      notificationDetails.message &&
      typeof notificationDetails.message === "string" &&
      notificationDetails.message.trim().length > 0;

    if (valid) {
      setIsVisible(true);
      const notificationTimeout = setTimeout(() => {
        setNotificationDetails({
          type: null,
          message: null,
          duration: null,
          undo: false,
          onUndo: null,
          undoLabel: null,
        });
        setIsVisible(false);
      }, notificationDetails.duration || 3500);
      return () => clearTimeout(notificationTimeout);
    } else {
      setIsVisible(false);
    }
  }, [notificationDetails, setNotificationDetails]);

  return (
    <AnimatePresence>
      {isVisible && notificationDetails.type && notificationDetails.message && (
        <motion.div
          key="notification-banner"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={bannerVariants}
          className={`fixed left-1/2 -translate-x-1/2 top-8 px-8 py-4 text-lg rounded-2xl shadow-2xl flex items-center gap-4 z-[9999]
            ${
              notificationDetails.type === "delete"
                ? "bg-red-400 text-red-900"
                : "bg-green-400 text-green-900"
            }
            backdrop-blur-xl border border-wetSand`}
          role="alert"
          id="notification-banner"
        >
          <p className="font-semibold text-xl drop-shadow">
            {notificationDetails.message}
          </p>
          {notificationDetails.undo && notificationDetails.onUndo && (
            <button
              className="ml-4 px-4 py-2 rounded-lg bg-wetSand text-eggshell font-semibold shadow hover:bg-wetSand/90 transition"
              onClick={() => {
                notificationDetails.onUndo?.();
                setNotificationDetails({
                  type: null,
                  message: null,
                  duration: null,
                  undo: false,
                  onUndo: null,
                });
                setIsVisible(false);
              }}
            >
              {notificationDetails.undoLabel || "Undo"}
            </button>
          )}
          <Image
            onClick={() => {
              setNotificationDetails({
                type: null,
                message: null,
                duration: null,
                undo: false,
                onUndo: null,
                undoLabel: undefined,
              });
              setIsVisible(false);
            }}
            src="/cross.svg"
            width={28}
            height={28}
            alt="close banner"
            className="cursor-pointer hover:scale-110 transition-transform"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
