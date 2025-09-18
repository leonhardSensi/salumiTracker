import { ISubmitButtonProps } from "../../../interfaces/interfaces";

export default function SubmitButton({
  text,
  addStyles,
  disabled,
}: ISubmitButtonProps) {
  return (
    <div
      className={`${addStyles} text-eggshell bg-wetSand rounded-lg hover:bg-eggshell hover:text-stone border-flesh border-2 hover:border-wetSand hover:border-2 hover:shadow-2xl transition-all hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-l text-center focus:ring-primary-800`}
    >
      <button
        type="submit"
        disabled={disabled}
        className={`h-full px-5 py-2.5 rounded-lg ${addStyles}`}
      >
        {text}
      </button>
    </div>
  );
}
