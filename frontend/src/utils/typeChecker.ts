import { ICut, ISpice, IStep } from "@/interfaces/interfaces";

export function handleCurrentItem(
  currentItem: ICut | ISpice | IStep | undefined,
  data: string
) {
  if (currentItem) {
    switch (data) {
      case "name":
        return currentItem.name;
      case "quantity":
        if ("quantity" in currentItem) {
          return JSON.stringify(currentItem.quantity);
        }
        break;
      case "description":
        if ("description" in currentItem) {
          return currentItem.description;
        }
        break;
      case "duration":
        if ("duration" in currentItem) {
          return JSON.stringify(currentItem.duration);
        }
        break;
      default:
        break;
    }
  }
}
