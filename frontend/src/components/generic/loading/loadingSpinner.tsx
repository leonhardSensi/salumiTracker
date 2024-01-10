import Image from "next/image";

export default function LoadingSpinner() {
  return (
    // <div className=" w-full min-h-screen flex justify-center items-center">
    //   <div className="flex min-h-screen w-full items-center justify-center ">
    //     <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-gray-900 to-red-500 animate-spin">
    //       <div className="h-9 w-9 rounded-full bg-white"></div>
    //     </div>
    //   </div>
    // </div>
    <Image
      src={"/salamiSlice.svg"}
      width={100}
      height={100}
      alt={"loading spinner"}
      className="animate-spin"
    />
  );
}
