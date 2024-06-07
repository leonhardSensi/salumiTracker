"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { PrivateLayout } from "../components/PrivateLayout/privateLayout";

import "swiper/css";
// import "swiper/css/effect-cards";

// import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { getSalumi } from "../api/salumeApi";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  saltingState,
  dryingState,
  curingState,
  completedState,
} from "../atoms/salumiAtoms";
import { ISalume, ISalumeWithDuration } from "../interfaces/interfaces";
import { calculateSalumeDuration } from "../utils/salumeDuration";

export default function Home() {
  const {
    status,
    error: errorMessage,
    data: salumi,
  } = useQuery({
    queryKey: ["salumi"],
    queryFn: getSalumi,
  });

  const [completedSalumi, setCompletedSalumi] =
    useRecoilState<ISalume[]>(completedState);

  useEffect(() => {
    if (salumi) {
      salumi.map((salume) => {
        if (
          salume.state === "done" &&
          !completedSalumi.some(
            (existingSalume) => existingSalume.id === salume.id
          )
        ) {
          setCompletedSalumi((prevCompletedSalumi) => [
            ...prevCompletedSalumi,
            salume,
          ]);
        }
      });
    }
  }, [salumi]);

  const [salting, setSalting] = useRecoilState(saltingState);
  const [drying, setDrying] = useRecoilState(dryingState);
  const [curing, setCuring] = useRecoilState(curingState);

  const updateSalumiStateWithDuration = (salumi: ISalumeWithDuration[]) => {
    const dryingArr = salumi.filter((item) => item.salume.state === "drying");
    const saltingArr = salumi.filter((item) => item.salume.state === "salting");
    const curingArr = salumi.filter((item) => item.salume.state === "curing");

    setDrying(dryingArr);
    setSalting(saltingArr);
    setCuring(curingArr);
  };

  useEffect(() => {
    calcDuration();
  }, [salumi]);

  // const calculateSalumeDuration = async (salume: ISalume) => {
  //   const recipe = await getRecipe(salume.recipe.id);
  //   let duration = 0;
  //   let salumeDuration = 0;
  //   if (recipe) {
  //     switch (salume.state) {
  //       case "drying":
  //         salumeDuration = recipe.drying.duration;

  //         break;
  //       case "salting":
  //         salumeDuration = recipe.salting.duration;

  //         break;
  //       case "curing":
  //         salumeDuration = recipe.curing.duration;
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //   const createdDate = new Date(salume.updated_at);
  //   const currentDate = new Date();

  //   const completionDate = new Date(createdDate);
  //   completionDate.setDate(completionDate.getDate() + salumeDuration);

  //   const timeDiff = completionDate.getTime() - currentDate.getTime();

  //   duration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  //   return { salume, duration };
  // };

  const calcDuration = async () => {
    if (salumi) {
      const salumiArr = await Promise.all(
        salumi.map(async (salume) => calculateSalumeDuration(salume))
      );
      updateSalumiStateWithDuration(salumiArr);
    }
  };

  //-------
  //-------
  //-------
  //-------
  //-------
  //-------
  return (
    <PrivateLayout>
      <main className="font-Montserrat flex h-3/4 flex-col items-center justify-around p-24 bg-salumeBlue overflow-hidden shadow-md z-10 border-b-black border-b-4">
        <h1 className="text-salumeWhite text-8xl text-center">
          Salumi Tracker
        </h1>
        <Image
          src={"/charcuterie.svg"}
          width={400}
          height={400}
          alt="Charcuterie board"
          className="mb-8"
          priority={true}
        />

        <div className="bg-salumeWhite text-center lg:w-1/3 lg:h-1/3 w-3/4 h-1/3 overflow-hidden lg:flex items-center justify-center absolute bottom-1 rounded-full cursor-pointer">
          <Image
            src={"/arrow.svg"}
            alt={"prev-arrow"}
            width={50}
            height={50}
            className="image-swiper-button-prev rotate-180 cursor-pointer"
          />
          <Swiper
            modules={[Pagination, Navigation]}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
            pagination={{
              dynamicBullets: true,
            }}
            className="w-full h-3/4 swiper-container font-Montserrat lg:text-6xl text-4xl"
          >
            <SwiperSlide className="text-black">
              <div className="flex flex-col justify-center items-center">
                <h1 className="mt-8">Now Salting</h1>
                <h3 className="mt-12 font-Satisfy">
                  {salting[0] ? salting[0].salume.name : "None"}
                </h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="text-black">
              <div className="flex flex-col justify-center items-center">
                <h1 className="mt-8">Now Drying</h1>
                <h3 className="mt-12 font-Satisfy">
                  {drying[0] ? drying[0].salume.name : "None"}
                </h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="text-black ">
              <div className="flex flex-col justify-center items-center">
                <h1 className=" mt-8">Now Curing</h1>
                <h3 className="mt-12 font-Satisfy">
                  {curing[0] ? curing[0].salume.name : "None"}
                </h3>
              </div>
            </SwiperSlide>
          </Swiper>
          <Image
            src={"/arrow.svg"}
            alt={"prev-arrow"}
            width={50}
            height={50}
            className="image-swiper-button-next cursor-pointer"
          />
        </div>
      </main>
      <div className="bg-salumeWhite h-1/4 w-full"></div>
    </PrivateLayout>
  );
}
