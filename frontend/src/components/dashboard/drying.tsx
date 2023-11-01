import Image from "next/image";

export default function Drying() {
  return (
    <div className="w-2/3 h-fit rounded overflow-hidden shadow-lg hover:scale-105 transition-all duration-200">
      <Image
        width={100}
        height={100}
        className="w-50 px-6 py-4"
        src={"/dry.svg"}
        alt="Salume"
      />
      <div className="px-6 py-4">
        <div className="text-gray-700 font-bold text-xl mb-2">
          Currently Drying
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-gray-700">None</p>
        </div>
      </div>
    </div>
  );
}
