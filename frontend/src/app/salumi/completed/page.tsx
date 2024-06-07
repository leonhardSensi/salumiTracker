"use client";
import { useRef, useEffect } from "react"; // Import useRef and useEffect hooks
import { getSalumi } from "@/api/salumeApi";
import { PrivateLayout } from "@/components/privateLayout/privateLayout";
import SalumeList from "@/components/salumi/salumeList";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

export default function CompletedSalumi() {
  const { data: salumiData } = useQuery(["salumi"], getSalumi);
  // const completedSalumeRef = useRef(null); // Create a ref for the image element

  // useEffect(() => {
  //   gsap.registerPlugin(Draggable);
  //   if (completedSalumeRef.current) {
  //     Draggable.create(completedSalumeRef.current, {
  //       type: "x,y",
  //       // trigger: "body",
  //       inertia: false,
  //       onClick: function () {
  //         console.log("clicked");
  //       },
  //       onDragEnd: function () {
  //         console.log("drag ended");
  //       },
  //     });
  //   }
  // }, [completedSalumeRef]); // Ensure it only runs once after component mount

  return (
    <PrivateLayout>
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col lg:w-1/2 w-screen items-center justify-start mt-16 overflow-hidden bg-salumeBlue rounded-lg shadow-2xl">
          <SalumeList salumi={salumiData} />
        </div>
        <Link href="/add_salume" className="mt-8">
          <div className="">
            <Image
              // ref={completedSalumeRef} // Assign the ref to the image element
              src={"/plusButton.svg"}
              width={50}
              height={50}
              alt="add salume"
              className="invert"
            ></Image>
          </div>
        </Link>
      </div>
      <div className="pl-16 w-fit flex justify-end align-top mb-8 group">
        <Link href="/salumi/completed" className="">
          <Image
            src={"/backArrow.svg"}
            alt={"waiter"}
            width={80}
            height={80}
            className="hover:scale-110 transition-all duration-300 ease-in-out hover:cursor-pointer"
          />
        </Link>
        <div>
          <p
            className={`group-hover:opacity-100 bg-salumeWhite text-salumeBlue shadow-2xl rounded-t-xl rounded-r-xl p-1 transition-opacity ease-in-out duration-300 mr-2`}
          >
            Drop your salumi here to put them back into production!
          </p>
        </div>
      </div>
    </PrivateLayout>
  );
}

// --------------------------------------------------------------------------------------- WITHOUT DRAG'N'DROP ---------------------------------------------------------------------------------------
// "use client";
// import { getSalumi } from "@/api/salumeApi";
// import PrivateLayout from "@/components/privateLayout/privateLayout";
// import SalumeList from "@/components/salumi/salumeList";
// import { useQuery } from "@tanstack/react-query";
// import Link from "next/link";
// import Image from "next/image";

// export default function CompletedSalumi() {
//   const { data: salumiData } = useQuery(["salumi"], getSalumi);

//   return (
//     <PrivateLayout>
//       <div className="flex flex-col w-full h-full items-center">
//         <div className="flex flex-col w-1/2 items-center justify-start mt-16 overflow-hidden bg-salumeBlue rounded-lg shadow-2xl">
//           <SalumeList salumi={salumiData} />
//         </div>
//         <Link href="/add_salume" className="mt-8">
//           <div className="">
//             <Image
//               src={"/plusButton.svg"}
//               width={50}
//               height={50}
//               alt="add salume"
//               className="invert"
//             ></Image>
//           </div>
//         </Link>
//       </div>
//       {/* <div className="w-fit h-fit p-8">
//         <Image
//           src={"/backArrow.svg"}
//           alt={"back arrow"}
//           width={80}
//           height={80}
//         />
//         </div> */}
//       <div
//         className="pl-16 w-fit flex justify-end align-top mb-8 group"
//         // ref={dropTargetDone}
//       >
//         <Link href="/salumi/completed" className="">
//           <Image
//             src={"/backArrow.svg"}
//             alt={"waiter"}
//             width={80}
//             height={80}
//             className="hover:scale-110 transition-all duration-300 ease-in-out hover:cursor-pointer"
//           />
//         </Link>
//         <div>
//           <p
//             className={`group-hover:opacity-100 bg-salumeWhite text-salumeBlue shadow-2xl rounded-t-xl rounded-r-xl p-1 transition-opacity ease-in-out duration-300 mr-2 ${
//               // hideHints ? "opacity-0" : ""
//               ""
//             }`}
//           >
//             Drop your salumi here to put them back into production!
//           </p>
//         </div>
//       </div>
//     </PrivateLayout>
//   );
// }
