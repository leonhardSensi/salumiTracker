import { ICardProps } from "@/interfaces/interfaces";
import Link from "next/link";
import React from "react";
import CardDetails from "./cardDetails";

export default function Card({
  details,
  image,
  imageSize,
  children,
  link,
  addStyles,
  status,
}: ICardProps) {
  return (
    // <div
    //   className={`${addStyles} w-1/3 h-80 bg-salumeBlue rounded-full border-salumeWhite border-2 shadow-xl cursor-pointer`}
    // >
    //   <Link href={link}>
    //     <CardDetails
    //       details={details}
    //       image={image}
    //       imageSize={imageSize}
    //       children={children}
    //       status={status}
    //     />
    //   </Link>
    // </div>
    <div
      className={`${addStyles} w-1/3 h-80 bg-salumeBlue rounded-full border-salumeWhite border-2 shadow-xl cursor-pointer overflow-hidden`}
    >
      <Link href={link}>
        <CardDetails
          details={details}
          image={image}
          imageSize={imageSize}
          status={status}
        >
          {children}
        </CardDetails>
      </Link>
    </div>
  );
}
