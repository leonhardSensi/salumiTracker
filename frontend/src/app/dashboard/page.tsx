import Curing from "@/components/dashboard/curing";
import Drying from "@/components/dashboard/drying";
import Salting from "@/components/dashboard/salting";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-black text-4xl m-16">Dashboard</h1>
      <div className="grid grid-cols-2 gap-24 w-full justify-items-center">
        <Curing />
        <Salting />
        <Drying />
      </div>
    </div>
  );
}
