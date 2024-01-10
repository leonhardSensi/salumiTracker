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
}: ICardProps) {
  return (
    <div className="w-2/3 bg-white rounded overflow-hidden shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer">
      <Link href={link}>
        <CardDetails
          details={details}
          image={image}
          imageSize={imageSize}
          children={children}
        />
      </Link>
    </div>
  );
}
