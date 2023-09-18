import { ISubmitButton } from "@/interfaces/interfaces";

export default function SubmitButton({ text }: ISubmitButton) {
  return (
    <button
      type="submit"
      className="w-full text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
    >
      {text}
    </button>
  );
}
