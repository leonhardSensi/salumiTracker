import Image from "next/image";

export default function Salting() {
  return (
    <div className="w-2/3 h-fit rounded overflow-hidden shadow-lg hover:scale-105 transition-all duration-200">
      <Image
        width={100}
        height={100}
        className="w-50 px-6 py-4"
        src="/salt.svg"
        alt="Salume"
      />
      <div className="px-6 py-4">
        <div className="text-gray-700 font-bold text-xl mb-2">
          Currently Salting
        </div>
        <div className="flex flex-row justify-between">
          <ul>
            <li className="text-gray-700">Pancetta</li>
            <li className="text-gray-700">Coppa</li>
          </ul>
          <ul>
            <li className="text-gray-700">2 days left</li>
            <li className="text-red-700">done 1 day ago</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
