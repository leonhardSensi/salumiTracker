import { IGenericButtonProps } from "../../../interfaces/interfaces";

export default function GenericButton({
  text,
  onClick,
  addStyles,
  disabled,
  type,
}: IGenericButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${addStyles} px-5 text-stone transition-all hover:bg-eggshell font-medium rounded-lg text-l text-center`}
      disabled={disabled}
      type={type || "submit"}
    >
      {text}
    </button>
  );
}
