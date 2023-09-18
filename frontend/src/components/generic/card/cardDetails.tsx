import { ICardDetailsProps } from "@/interfaces/interfaces";
import Image from "next/image";

export default function CardDetails({
  image,
  imageSize,
  children,
}: ICardDetailsProps) {
  return (
    <div>
      <Image
        width={imageSize.width}
        height={imageSize.height}
        src={image}
        className="w-50 px-6 py-4"
        alt="card image"
      />
      {children}
    </div>
  );
}
