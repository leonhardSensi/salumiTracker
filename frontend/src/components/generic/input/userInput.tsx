import { IUserInput } from "../../../interfaces/interfaces";

export default function UserInput({
  width,
  height,
  step,
  min,
  max,
  addStyle,
  handleChange,
  type,
  name,
  id,
  placeholder,
  required,
  defaultValue,
  autoComplete,
  disabled,
  checked,
  value,
  onClick,
}: IUserInput) {
  return (
    <input
      onChange={handleChange}
      type={type}
      name={name}
      id={id}
      className={`${addStyle} ${width} ${height} text-black border text-xl rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-100 border-gray-300 placeholder-gray-600 focus:ring-blue-500 focus:border-blue-500`}
      placeholder={placeholder}
      required={required}
      step={step}
      min={min}
      max={max}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      disabled={disabled}
      checked={checked}
      value={value}
      onClick={onClick}
    />
  );
}
