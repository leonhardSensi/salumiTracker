import { IItem } from "@/interfaces/interfaces";

export function handleCurrentItem(
  currentItem: IItem | undefined,
  data: string
) {
  if (currentItem) {
    switch (data) {
      case "name":
        return currentItem.name;
      case "quantity":
        if ("quantity" in currentItem && currentItem.quantity !== 0) {
          return JSON.stringify(currentItem.quantity);
        }
        break;
      case "description":
        if ("description" in currentItem) {
          return currentItem.description;
        }
        break;
      case "duration":
        if ("duration" in currentItem && currentItem.duration !== 0) {
          return JSON.stringify(currentItem.duration);
        }
        break;
      default:
        break;
    }
  }
}
