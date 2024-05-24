import { ISalumiProps } from "@/interfaces/interfaces";
import SalumePreview from "./salumePreview";
import Image from "next/image";
import { useState } from "react";

export default function DashboardCardDetails({ salumi, status }: ISalumiProps) {
  // const [curing, setCuring] = useRecoilState<ISalumeArr[]>(curingState);
  // const [salting, setSalting] = useRecoilState<ISalumeArr[]>(saltingState);
  // const [drying, setDrying] = useRecoilState<ISalumeArr[]>(dryingState);
  // function dropHandler(e) {
  //   e.preventDefault();
  //   // Get the id of the target and add the moved element to the target's DOM
  //   const data = e.dataTransfer.getData("text");
  //   e.target.appendChild(document.getElementById(data));
  // }

  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 3;

  const renderSalumi = salumi.slice(currentIndex, currentIndex + itemsPerPage);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < salumi.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage <= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    // <div className="w-full">
    //   <div>
    //     <div className="flex flex-col px-16">
    //       <ul className="">
    //         {salumi.length > 0 ? (
    //           salumi.map((salume, index) => {
    //             return (
    //               <SalumePreview
    //                 salume={salume.salume}
    //                 duration={salume.duration}
    //                 key={`${status}-${index}`}
    //               />
    //             );
    //           })
    //         ) : (
    //           <li className="text-black">None</li>
    //         )}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full h-full overflow-hidden">
      <div className="flex px-16 h-full justify-between">
        <ul className="h-full pb-12">
          {salumi.length > 0 ? (
            renderSalumi.map((salume, index) => (
              <SalumePreview
                salume={salume.salume}
                duration={salume.duration}
                key={`${status}-${index}`}
              />
            ))
          ) : (
            <li className="text-black">None</li>
          )}
        </ul>
        {salumi.length > 3 && (
          <div className="flex flex-col items-center space-y-12">
            {/* <Image src={"/arrow2.svg"} width={100} height={100} alt="up" /> */}
            <button
              className={`text-4xl ${currentIndex === 0 && "hidden"}`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ↑
            </button>
            <button
              className={`text-4xl ${
                currentIndex + itemsPerPage >= salumi.length && "hidden"
              }`}
              onClick={handleNext}
              disabled={currentIndex + itemsPerPage >= salumi.length}
            >
              ↓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
