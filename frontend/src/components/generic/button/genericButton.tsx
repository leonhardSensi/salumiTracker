import { IGenericButtonProps } from "@/interfaces/interfaces";

export default function GenericButton({
  text,
  onClick,
  addStyles,
}: IGenericButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${addStyles} text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800`}
    >
      {text}
    </button>
  );
}
