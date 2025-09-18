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
      className={`${addStyle} ${width} ${height} text-black text-xl block p-2.5 placeholder-gray-600 focus:flesh rounded-xl border-wetSand border px-4 py-2 bg-white `}
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
