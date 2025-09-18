"use client";
import { useRef, useEffect } from "react";
import { getSalumi } from "../../../api/salumeApi";
import { PrivateLayout } from "../../../components/PrivateLayout/privateLayout";
import SalumeList from "../../../components/salumi/salumeList";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CompletedSalumi() {
  const { data: salumiData } = useQuery(["salumi"], getSalumi);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };
  const headingVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.1 },
    },
  };
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.5 },
    },
    hover: {
      scale: 1.12,
      rotate: -10,
      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    },
    tap: { scale: 0.95, rotate: 0 },
  };

  return (
    <PrivateLayout>
      <motion.div
        className="flex flex-col items-center w-full p-12 text-stone"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="w-fit text-6xl text-wetSand font-serif mb-8"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Your finished Salumi
        </motion.h1>
        {/* Optionally, animate SalumeList items inside the component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full"
        >
          <SalumeList salumi={salumiData} />
        </motion.div>
        <Link href="/add_salume" className="mt-8">
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            className="rounded-full"
          >
            <Image
              src={"/plusButton.svg"}
              width={50}
              height={50}
              alt="add salume"
            />
          </motion.div>
        </Link>
      </motion.div>
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
