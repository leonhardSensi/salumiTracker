import { ICardDetailsProps } from "../../../interfaces/interfaces";
import Image from "next/image";

export default function CardDetails({
  image,
  imageSize,
  children,
  status,
}: ICardDetailsProps) {
  return (
    <div className="flex flex-col items-center h-full overflow-hidden">
      <div className="border-b-wetSand border-b-2 w-full flex items-center flex-col mb-4">
        <Image
          width={imageSize.width}
          height={imageSize.height}
          src={image}
          className="px-6 py-4"
          alt="card image"
        />
        <div className="font-Montserrat text-4xl pb-2 text-center">
          {status}
        </div>
      </div>
      <div className="overflow-auto w-full h-full">{children}</div>
    </div>
  );
}
