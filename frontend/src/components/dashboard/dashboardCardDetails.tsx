import { ISalumiProps } from "../../interfaces/interfaces";
import SalumePreview from "./salumePreview";
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

  // const itemsPerPage = 3;

  // const renderSalumi = salumi.slice(currentIndex, currentIndex + itemsPerPage);

  // const handleNext = () => {
  //   if (currentIndex + itemsPerPage < salumi.length) {
  //     setCurrentIndex(currentIndex + itemsPerPage);
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentIndex - itemsPerPage <= 0) {
  //     setCurrentIndex(currentIndex - itemsPerPage);
  //   }
  // };

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

    <div className="w-full h-full overflow-auto">
      <div className="flex h-full justify-between">
        <ul className="h-full w-full space-y-2">
          {salumi.length > 0 ? (
            salumi.map((salume, index) => (
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
      </div>
    </div>
  );
}
