"use client";

import PrivateLayout from "@/components/privateLayout/privateLayout";
import SalumeInput from "@/components/generic/input/salumeInput";

export default function NewSalume() {
  return (
    <PrivateLayout>
      <div className="w-full flex flex-col items-center h-full justify-center my-16">
        <div className="py-16 w-2/3">
          <SalumeInput />
        </div>
      </div>
    </PrivateLayout>
  );
}
