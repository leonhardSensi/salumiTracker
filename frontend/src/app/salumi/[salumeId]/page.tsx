"use client";
import { PrivateLayout } from "../../../components/PrivateLayout/privateLayout";
import SalumeDetails from "../../../components/salumi/salumeDetails";

export default function Salume() {
  return (
    <PrivateLayout>
      <div className="flex flex-col items-center w-full p-12">
        <SalumeDetails />
      </div>
    </PrivateLayout>
  );
}
