import { ISubmitButtonProps } from "../../../interfaces/interfaces";

export default function SubmitButton({
  text,
  addStyles,
  disabled,
}: ISubmitButtonProps) {
  return (
    <div
      className={`${addStyles} text-salumeWhite bg-salumeBlue rounded-lg hover:opacity-80 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-l text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800`}
    >
      <button
        type="submit"
        disabled={disabled}
        className={`w-full h-full px-5 py-2.5 rounded-lg ${addStyles}`}
      >
        {text}
      </button>
    </div>
  );
}
