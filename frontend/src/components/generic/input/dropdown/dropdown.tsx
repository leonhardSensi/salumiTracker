import { IDropDown } from "../../../../interfaces/interfaces";

export const Dropdown: React.FC<IDropDown> = ({
  dropDownOptions,
  disabled,
  handleSelect,
  currentId,
  dropdownText,
}) => {
  return (
    <div className="relative group inline-block w-full max-w-md">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`w-full flex flex-row items-center justify-between border border-wetSand focus:ring-4 focus:outline-none focus:ring-primary-300 bg-white/95 hover:bg-flesh/60 font-medium rounded-xl text-lg px-4 py-3 text-wetSand transition-colors shadow-md ${
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        }`}
        type="button"
        disabled={disabled}
      >
        <span className="font-semibold">{dropdownText}</span>
        <svg
          className="w-4 h-4 ml-2 group-hover:-rotate-180 transition-all duration-300 ease-in-out"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className="absolute left-0 top-full z-20 w-full max-w-md rounded-xl shadow-2xl bg-white/95 border border-wetSand transition-all duration-200 opacity-0 pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto group-hover:opacity-100 group-hover:pointer-events-auto"
      >
        {dropDownOptions?.length !== 0 ? (
          dropDownOptions?.map((option, index) => (
            <div
              key={`option-${index}`}
              className="px-6 py-3 cursor-pointer text-lg text-wetSand hover:bg-wetSand/90 hover:text-eggshell transition-all rounded-xl"
              onClick={() => handleSelect(option, currentId)}
            >
              <span className="font-semibold">{option}</span>
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-center text-wetSand text-lg">
            Add status first
          </div>
        )}
      </div>
    </div>
  );
};
