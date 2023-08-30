import PrivateLayout from "@/components/PrivateLayout/privateLayout";
import Curing from "@/components/dashboard/curing";
import Drying from "@/components/dashboard/drying";
import Salting from "@/components/dashboard/salting";

export default function Dashboard() {
  return (
    <PrivateLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-black text-4xl m-16">Dashboard edds</h1>
        <div className="grid grid-cols-2 gap-24 w-full justify-items-center">
          <Curing />
          <Salting />
          <Drying />
        </div>
      </div>
    </PrivateLayout>
  );
}
