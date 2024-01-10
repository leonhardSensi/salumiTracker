export default function StatusButton(props: { reqSuccess: string }) {
  const renderButton = () => {
    {
      switch (props.reqSuccess) {
        case "true":
          return (
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-l px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
            >
              Success
            </button>
          );

        case "pending":
          return (
            <button
              type="button"
              className="text-white bg-red-500 font-medium rounded-lg text-l px-5 py-2.5 bg-primary-600"
            >
              <div
                className="mr-2 animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
                role="status"
                aria-label="loading"
              ></div>
              Processing...
            </button>
          );
        case "false":
          return (
            <button
              type="submit"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-l px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
            >
              Save
            </button>
          );
        default:
          break;
      }
    }
  };
  return <>{renderButton()}</>;
}
