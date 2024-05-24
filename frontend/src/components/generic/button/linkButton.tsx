import { ILinkButtonProps } from "@/interfaces/interfaces";
import Link from "next/link";

export default function LinkButton({
  text,
  href,
  width,
  height,
}: ILinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${width} ${height} flex items-center justify-center m-8 text-xl p-4 text-salumeWhite bg-salumeBlue hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-primary-800`}
    >
      {text}
    </Link>
  );
}
