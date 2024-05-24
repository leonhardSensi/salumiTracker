"use client";

import PrivateLayout from "@/components/privateLayout/privateLayout";
import SalumeInput from "@/components/generic/input/salumi/salumeInput";
import { ModalProvider } from "@/utils/modalProvider";
import NotificationBanner from "@/components/generic/error/notificationBanner";

export default function NewSalume() {
  return (
    <ModalProvider>
      <PrivateLayout>
        <div className="flex flex-col items-center h-fit my-16 overflow-auto rounded-lg bg-salumeBlue mx-80 shadow-2xl">
          <h1 className="w-fit text-6xl text-salumeWhite border-b-salumeWhite border-b-4 border-double font-bold font-Montserrat mt-16">
            Add Salume
          </h1>
          <div className="py-16 w-2/3">
            <SalumeInput />
          </div>
        </div>
      </PrivateLayout>
    </ModalProvider>
  );
}
