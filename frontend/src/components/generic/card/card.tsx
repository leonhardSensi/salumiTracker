import { ICardProps } from "../../../interfaces/interfaces";
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
    <div
      className={`${addStyles} h-80 w-full bg-flesh rounded-xl shadow-xl text-stone cursor-pointer`}
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
