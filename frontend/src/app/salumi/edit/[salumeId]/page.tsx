"use client";

import { PrivateLayout } from "../../../../components/PrivateLayout/privateLayout";
import EditSalume from "../../../../components/salumi/editSalume";

export default function SalumeEdit() {
  return (
    <PrivateLayout>
      {/* <div className="h-fit my-16 overflow-auto rounded-lg bg-salumeBlue shadow-2xl"> */}
      {/* <div className="flex flex-col border border-salumeBlue shadow-2xl rounded-lg p-8 items-center w-full overflow-auto"> */}
      <div className="flex flex-col items-center w-full p-12">
        <EditSalume />
      </div>
      {/* </div> */}
    </PrivateLayout>
  );
}
