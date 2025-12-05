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
  const content = (
    <CardDetails
      details={details}
      image={image}
      imageSize={imageSize}
      status={status}
    >
      {children}
    </CardDetails>
  );

  return (
    <div
      className={`${addStyles} h-80 w-full bg-flesh border border-wetSand rounded-xl shadow-xl text-stone ${
        link ? "cursor-pointer" : ""
      }`}
    >
      {link ? <Link href={link}>{content}</Link> : content}
    </div>
  );
}
