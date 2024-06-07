"use client";

import { getSalumi } from "../../api/salumeApi";
import { getUser } from "../../api/userApi";
import { completedState } from "../../atoms/salumiAtoms";
import { PrivateLayout } from "../../components/PrivateLayout/PrivateLayout";

import { ICompletedSalume, ISalume } from "../../interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";

export default function Account() {
  const { data } = useQuery(["user"], getUser);
  const { data: salumiData } = useQuery(["salumi"], getSalumi);

  // should be of type <ICompletedSalume[]>
  const [completedSalumi, setCompletedSalumi] =
    useRecoilState<ISalume[]>(completedState);

  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    if (salumiData) {
      salumiData.map((salume) => {
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
  }, [salumiData]);

  useEffect(() => {
    if (completedSalumi) {
      let avg = 0;
      const ratedSalumi = [];
      for (let i = 0; i < completedSalumi.length; i++) {
        const salume = completedSalumi[i];
        if (salume.rating !== undefined && salume.rating !== 0) {
          ratedSalumi.push(salume);
          avg += salume.rating;
        }
      }
      if (ratedSalumi.length !== 0) {
        avg = Math.round((avg / ratedSalumi.length) * 10) / 10;
        setAvgRating(avg);
      }
    }
  }, [completedSalumi]);

  // useEffect(() => {
  //   const handleClickOutside: EventListener = (event) => {
  //     const modal = document.getElementById("crud-modal");
  //     // even if typecasting should be avoided, can i use it here?
  //     if (modal && !modal.contains(event.target as Node)) {
  //       setModalVisibility(false);
  //     }
  //   };
  //   if (isModalOpen) {
  //     document.addEventListener("click", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [isModalOpen]);

  let rating = [];
  for (let index = 0; index < Math.floor(avgRating); index++) {
    rating.push(index);
  }

  let ceilRating = [];
  for (let index = 0; index < Math.floor(5 - avgRating); index++) {
    ceilRating.push(index);
  }
  return (
    <PrivateLayout>
      <>
        <div className="ml-32 h-full bg-account-bg bg-no-repeat bg-right-bottom bg-contain">
          <div className="w-fit font-Satisfy">
            <h1 className="text-salumeWhite text-6xl my-16">
              About {data?.name}
            </h1>
          </div>
          <div className="flex ml-16">
            <div className="flex flex-col space-y-12 border-r-salumeWhite border-r-8 border-double pr-16">
              <h2 className="text-black text-2xl h-fit">Salume Count</h2>
              <h2 className="text-black text-2xl h-fit">Salumi Score</h2>
              <h2 className="text-black text-2xl h-fit">Salumi ID</h2>
            </div>
            <div className="ml-16 space-y-6">
              <div>
                <p className="text-black w-fit text-xl">
                  {salumiData && salumiData.length}
                </p>
                <Link
                  className="text-salumeWhite w-fit mt-4 text-xl hover:underline"
                  href={"/add_salume"}
                >
                  {"Create another salume >"}
                </Link>
              </div>
              <div>
                {/* <div className="flex items-center">
                  <p className="text-black w-fit text-xl pr-3">{avgRating}</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Image
                        key={`rating-${star}`}
                        className={`pr-1 ${
                          star <= avgRating ? "grayscale-0" : "grayscale"
                        }`}
                        src={"/salami.svg"}
                        width={30}
                        height={30}
                        alt="star"
                      />
                    ))}
                  </div> */}

                <div className="flex items-center">
                  <p className="text-black w-fit text-xl pr-3">{avgRating}</p>
                  <div className="flex">
                    {/* Render full stars for the integer part of the average rating */}
                    {rating.map((star) => (
                      <Image
                        key={`rating-${star}`}
                        className={`pr-1 ${
                          star <= avgRating ? "grayscale-0" : "grayscale"
                        }`}
                        src={"/salami.svg"}
                        width={30}
                        height={30}
                        alt="star"
                      />
                    ))}

                    {/* Render partial star if there's a fractional part */}
                    {avgRating % 1 !== 0 && (
                      <Image
                        className="pr-1"
                        src="/salami.svg"
                        width={30}
                        height={30}
                        alt="rating"
                        style={{
                          clipPath: `polygon(0 0, ${
                            (avgRating % 1) * 100
                          }% 0, ${(avgRating % 1) * 100}% 100%, 0 100%)`,
                        }}
                      />
                    )}
                  </div>
                </div>
                <Link
                  className="text-salumeWhite w-fit mt-4 text-xl hover:underline"
                  href={"/salumi/completed"}
                >
                  {"Rate more salumi >"}
                </Link>
              </div>
              <div>
                <p className="text-black text-xl">
                  {data ? data.email : "loading..."}
                </p>
                <Link
                  className="text-salumeWhite w-fit mt-4 text-xl hover:underline"
                  href={"/account/manage"}
                >
                  {"Manage Salumi ID >"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    </PrivateLayout>
  );
}
