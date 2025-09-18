import { atom, useRecoilValue } from "recoil";
import { getSalumi } from "../api/salumeApi";
import { calculateSalumeDuration } from "./salumeDuration";
import { IActionItem, ISalume } from "../interfaces/interfaces";

const generateActionItems = async (salumi: ISalume[]) => {
  const actionItems: IActionItem[] = [];

  await Promise.all(
    salumi.map(async (salume) => {
      const { duration } = await calculateSalumeDuration(salume);
      switch (salume.state) {
        case "salting":
          if (duration === 1 || duration === 2) {
            actionItems.push({
              salumeId: salume.id,
              salumeName: salume.name,
              message: "Flip in salt to ensure even curing.",
              priority: 1,
            });
          }
          if (duration >= 5) {
            actionItems.push({
              salumeId: salume.id,
              salumeName: salume.name,
              message: "Consider moving to drying stage soon.",
              priority: 2,
            });
          }
          break;
        case "drying":
          if (duration % 7 === 0) {
            actionItems.push({
              salumeId: salume.id,
              salumeName: salume.name,
              message: "Weight & log progress today.",
              priority: 1,
            });
          }
          if (duration >= 21) {
            actionItems.push({
              salumeId: salume.id,
              salumeName: salume.name,
              message: "Inspect for mold and adjust humidity if needed.",
              priority: 2,
            });
          }
          break;
        case "curing":
          if (duration % 14 === 0) {
            actionItems.push({
              salumeId: salume.id,
              salumeName: salume.name,
              message: "Inspect casing and condition of meat.",
              priority: 1,
            });
          }
          break;
        default:
          if (duration <= 0) {
            actionItems.push({
              salumeId: salume.id,
              salumeName: salume.name,
              message: "Check if salume is ready for consumption.",
              priority: 1,
            });
          }
      }
    })
  );

  return actionItems;
};

export default generateActionItems;
