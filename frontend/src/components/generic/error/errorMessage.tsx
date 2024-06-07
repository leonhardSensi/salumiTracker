import { IErrorMessage } from "../../../interfaces/interfaces";

export default function ErrorMessage({ errorMessage }: IErrorMessage) {
  return (
    <div className="flex">
      <p className="text-red-500 text-sm">{errorMessage}</p>
    </div>
  );
}
