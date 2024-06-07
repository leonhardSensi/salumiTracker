import Image from "next/image";
import { useEffect, useState } from "react";
import { useUpdateSalumeRatingMutation } from "@/mutations/salumeMutation";
import { ISalumeProps } from "@/interfaces/interfaces";
import NewSalume from "@/app/add_salume/page";

export default function Rating({ salume }: ISalumeProps) {
  //   refetch;
  const [rating, setRating] = useState(salume.rating);
  //   const { data: salumiData, refetch: refetchSalumi } = useQuery(
  //     ["salumi"],
  //     getSalumi
  //   );

  const updateSalumeRating = useUpdateSalumeRatingMutation();

  const handleStarHover = (starValue: number) => {
    setRating(starValue);
  };

  const handleStarClick = async (starValue: number) => {
    if (starValue === salume.rating) {
      const newSalume = {
        ...salume,
        id: salume.id,
        rating: 0,
      };
      await updateSalumeRating.mutateAsync(newSalume);
      console.log(newSalume);
    } else {
      const newSalume = { ...salume, id: salume.id, rating: starValue };
      // const salumeToUpdate = Object.assign(salume, newSalume);
      await updateSalumeRating.mutateAsync(newSalume);
      console.log(newSalume);
    }
    // setRating(starValue);
    // props.refetch();
    location.reload();
  };

  useEffect(() => {}, [rating]);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Image
          key={`rating-${star}`}
          className={`pr-1 cursor-pointer transition-all ease-in-out ${
            star <= rating ? "grayscale-0" : "grayscale"
          }`}
          src={"/salami.svg"}
          width={30}
          height={30}
          alt="star"
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={() => handleStarHover(salume.rating)}
          onClick={() => handleStarClick(star)}
        />
      ))}
    </div>
  );
}
