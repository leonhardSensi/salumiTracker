import { IimageFileProp } from "@/interfaces/interfaces";
import Image from "next/image";

export default function ImgPreview(props: IimageFileProp) {
  return props.image ? (
    // <div className="ml-16 mb-16">
    //   <img
    //     id="imgPreview"
    //     src={URL.createObjectURL(props.image)}
    //     alt="uploaded image preview"
    //     className="mb-2 h-32"
    //   />
    //   <p className="text-black">{props.image.name}</p>
    // </div>

    <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
      <div className="flex items-center justify-around">
        <Image
          src={URL.createObjectURL(props.image)}
          width={50}
          height={50}
          className="mr-2"
          alt="image preview"
        />
        <span className="truncate pr-3 text-base font-medium text-[#07074D]">
          {props.image.name}
        </span>
        <button className="text-[#07074D]"></button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
