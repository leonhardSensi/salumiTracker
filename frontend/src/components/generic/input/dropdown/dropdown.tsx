import { IDropDown } from "../../../../interfaces/interfaces";

export const Dropdown: React.FC<IDropDown> = ({
  dropDownOptions,
  disabled,
  handleSelect,
  currentId,
  dropdownText,
}) => {
  return (
    <div className="mb-4 group">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`cursor-pointer border border-wetSand focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 font-medium rounded-lg text-lg p-1 text-center inline-flex items-center transition-colors`}
        type="button"
        // Why is this disabled attribute not working? Even if I directly pass true, it is not disabled. In Chrome dev tools it is also shown as disabled
        disabled={disabled}
      >
        {dropdownText}
        <svg
          className="w-2.5 h-2.5 ms-3 group-hover:-rotate-180 transition-all duration-300 ease-in-out"
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
        className="z-10 h-fit max-h-48 overflow-y-auto overflow-x-hidden divide-y w-fit divide-gray-100 rounded-md w-group shadow-lg border border-wetSand hidden group-hover:block hover:block absolute bg-wetSand py-2 px-3 rounded-b-md"
      >
        <ul
          className="py-2 text-lg font-bold text-eggshell"
          aria-labelledby="dropdownDefaultButton"
        >
          {dropDownOptions?.length !== 0 ? (
            dropDownOptions?.map((option, index) => {
              return (
                <li
                  key={`option-${index}`}
                  className="block px-4 py-2 hover:bg-eggshell hover:cursor-pointer hover:text-stone transition-all ease-in-out duration-250 rounded-md"
                  onClick={() => handleSelect(option, currentId)}
                >
                  {option}
                </li>
              );
            })
          ) : (
            <li className="block hover:bg-wetSand  hover:text-eggshell transition-all ease-in-out duration-250 rounded-md">
              Add status first
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
