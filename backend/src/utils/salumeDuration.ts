import { getRecipe } from "../services/recipe.service";
import { findSalumi } from "../services/salume.service";

export async function calcRemainingDuration(userId: string) {
  const salumi = await findSalumi(userId);
  const salumiWithDuration: { salume: string; daysRemaining: number }[] = [];
  console.log("------------");
  await Promise.all(
    salumi.map(async (salume) => {
      if (salume.state !== "done") {
        const recipe = await getRecipe(salume.recipe.id);
        let duration = 0;
        let salumeDuration = 0;
        if (recipe) {
          switch (salume.state) {
            case "drying":
              salumeDuration = recipe.drying.duration;

              break;
            case "salting":
              salumeDuration = recipe.salting.duration;

              break;
            case "curing":
              salumeDuration = recipe.curing.duration;
              break;
            default:
              break;
          }
        }
        const createdDate = new Date(salume.updated_at);
        const currentDate = new Date();

        const completionDate = new Date(createdDate);
        completionDate.setDate(completionDate.getDate() + salumeDuration);

        const timeDiff = completionDate.getTime() - currentDate.getTime();

        duration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (duration < 5) {
          salumiWithDuration.push({
            salume: salume.name,
            daysRemaining: duration,
          });
        }
      }
    })
  );
  return salumiWithDuration;
}
