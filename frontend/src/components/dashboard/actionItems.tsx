import { IActionItem, IActionItemProps } from "../../interfaces/interfaces";

export default function ActionItems({
  actionItems,
  isLoading,
  isFetching,
}: IActionItemProps) {
  if (isLoading || isFetching || !actionItems) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-black">Loading...</p>
      </div>
    );
  }

  if (actionItems.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-black">None</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="flex px-16 h-full justify-between">
        <ul className="h-full pb-12 space-y-2 list-disc">
          {actionItems.map((actionItem, index) => (
            <li
              key={`${actionItem.salumeName}-${index}`}
              className="text-black"
            >
              {actionItem.salumeName}: {actionItem.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
