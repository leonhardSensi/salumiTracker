import { IGenericButtonProps } from "@/interfaces/interfaces";

export default function GenericButton({
  text,
  onClick,
  addStyles,
  disabled,
}: IGenericButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${addStyles} px-5 text-salumeBlue hover:bg-hoverSalumeWhite font-medium rounded-lg text-l text-center`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
