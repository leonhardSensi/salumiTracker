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
        className={`text-salumeWhite cursor-pointer border border-salumeWhite focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 font-medium rounded-lg text-lg p-2.5 text-center inline-flex items-center transition-colors`}
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
        // className={`z-10 hidden group-hover:block bg-salumeWhite divide-y w-56 divide-gray-100 rounded-md w-group shadow-lg border border-salumeWhite`}
        className="z-10 h-fit max-h-48 overflow-y-auto overflow-x-hidden divide-y w-56 divide-gray-100 rounded-md w-group shadow-lg border border-salumeWhite hidden group-hover:block hover:block absolute bg-salumeWhite py-2 px-3 rounded-b-md"
      >
        <ul
          className="py-2 text-lg font-bold text-salumeBlue"
          aria-labelledby="dropdownDefaultButton"
        >
          {dropDownOptions?.length !== 0 ? (
            dropDownOptions?.map((option, index) => {
              return (
                <li
                  key={`option-${index}`}
                  className="block px-4 py-2 hover:bg-salumeBlue hover:text-salumeWhite transition-all ease-in-out duration-250 border-salumeWhite rounded-md"
                  onClick={() => handleSelect(option, currentId)}
                >
                  {option}
                </li>
              );
            })
          ) : (
            <li className="block px-4 py-2 hover:bg-salumeBlue  hover:text-salumeWhite transition-all ease-in-out duration-250 border-salumeWhite rounded-md">
              No status added
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
