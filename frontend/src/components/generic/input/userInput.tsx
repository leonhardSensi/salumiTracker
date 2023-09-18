import { IUserInput } from "@/interfaces/interfaces";

export default function UserInput({
  width,
  height,
  addStyle,
  handleChange,
  type,
  name,
  id,
  placeholder,
  required,
}: IUserInput) {
  return (
    <input
      onChange={handleChange}
      type={type}
      name={name}
      id={id}
      className={`${addStyle} border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block ${width} p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500`}
      placeholder={placeholder}
      required={required}
    />
  );
}
