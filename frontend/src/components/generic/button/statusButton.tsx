export default function StatusButton(props: { reqSuccess: string }) {
  const renderButton = () => {
    {
      switch (props.reqSuccess) {
        case "true":
          return (
            <div className="text-eggshell bg-wetSand hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-l px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
              <button type="submit">Success</button>
            </div>
          );

        case "pending":
          return (
            <div className="text-eggshell bg-wetSand hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-l px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
              <button type="button">
                <div
                  className="mr-2 animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white"
                  role="status"
                  aria-label="loading"
                ></div>
                Processing...
              </button>
            </div>
          );
        case "false":
          return (
            <div className="text-eggshell bg-wetSand hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-l text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
              <button type="submit" className="w-full h-full px-5 py-2.5">
                Save
              </button>{" "}
            </div>
          );
        default:
          break;
      }
    }
  };
  return <>{renderButton()}</>;
}
