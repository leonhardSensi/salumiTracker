import { IsalumiProps } from "@/interfaces/interfaces";

export default function DashboardCardDetails({ salumi, status }: IsalumiProps) {
  return (
    <div>
      <div className="px-6 py-4">
        <div className="text-gray-700 font-bold text-xl mb-2">
          Currently {status}
        </div>

        <div className="flex flex-col">
          {salumi.length > 0 ? (
            salumi.map((salume) => {
              return (
                <div key={salumi.indexOf(salume)}>
                  <ul className="flex justify-between w-full">
                    <li className="text-gray-700">{salume.name}</li>
                    {salume.daysLeft > 0 ? (
                      <li className="text-gray-700">
                        {salume.daysLeft} days left
                      </li>
                    ) : salume.daysLeft === 0 ? (
                      <li className="text-green-500">Ready</li>
                    ) : (
                      <li className="text-red-500">
                        {salume.daysLeft.toString().split("-")} days ago
                      </li>
                    )}
                  </ul>
                </div>
              );
            })
          ) : (
            <p className="text-black">None</p>
          )}
        </div>
      </div>
    </div>
  );
}
