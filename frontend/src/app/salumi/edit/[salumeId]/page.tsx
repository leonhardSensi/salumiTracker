"use client";

import { PrivateLayout } from "../../../../components/PrivateLayout/PrivateLayout";
import EditSalume from "../../../../components/salumi/editSalume";

export default function SalumeEdit() {
  return (
    <PrivateLayout>
      {/* <div className="h-fit my-16 overflow-auto rounded-lg bg-salumeBlue shadow-2xl"> */}
      {/* <div className="flex flex-col border border-salumeBlue shadow-2xl rounded-lg p-8 items-center w-full overflow-auto"> */}
      <div className="overflow-auto">
        <EditSalume />
      </div>
      {/* </div> */}
    </PrivateLayout>
  );
}
