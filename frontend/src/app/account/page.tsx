"use client";

import { getSalumi } from "../../api/salumeApi";
import { getUser } from "../../api/userApi";
import { completedState } from "../../atoms/salumiAtoms";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import { ICompletedSalume, ISalume } from "../../interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { motion } from "framer-motion";

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
          salume.state === "completed" &&
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
  }, [salumiData, completedSalumi, setCompletedSalumi]);

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
  }, [completedSalumi, setAvgRating]);

  let rating = [];
  for (let index = 0; index < Math.floor(avgRating); index++) {
    rating.push(index);
  }

  return (
    <PrivateLayout>
      <motion.div
        className="ml-32 h-full text-stone"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="w-fit font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-6xl my-16">About {data?.name}</h1>
        </motion.div>
        <motion.div
          className="flex ml-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="flex flex-col space-y-12 border-r-flesh border-r-8 border-double pr-16"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl h-fit">Salume Count</h2>
            <h2 className="text-2xl h-fit">Salumi Score</h2>
            <h2 className="text-2xl h-fit">Salumi ID</h2>
          </motion.div>
          <motion.div
            className="ml-16 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="w-fit text-xl text-wetSand">
                {salumiData && salumiData.length}
              </p>
              <Link
                className="w-fit mt-4 text-xl hover:underline"
                href={"/add_salume"}
              >
                {"Create another salume >"}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center">
                <p className="w-fit text-xl pr-3 text-wetSand">{avgRating}</p>
                <div className="flex">
                  {rating.map((star) => (
                    <Image
                      key={`rating-${star}`}
                      className="pr-1 grayscale-0"
                      src={"/salami.svg"}
                      width={30}
                      height={30}
                      alt="star"
                    />
                  ))}
                  {avgRating % 1 !== 0 && (
                    <Image
                      className="pr-1"
                      src="/salami.svg"
                      width={30}
                      height={30}
                      alt="rating"
                      style={{
                        clipPath: `polygon(0 0, ${(avgRating % 1) * 100}% 0, ${
                          (avgRating % 1) * 100
                        }% 100%, 0 100%)`,
                      }}
                    />
                  )}
                </div>
              </div>
              <Link
                className="w-fit mt-4 text-xl hover:underline"
                href={"/salumi/completed"}
              >
                {"Rate more salumi >"}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <p className="text-wetSand text-xl">
                {data ? data.email : "loading..."}
              </p>
              <Link
                className="w-fit mt-4 text-xl hover:underline"
                href={"/account/manage"}
              >
                {"Manage Salumi ID >"}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </PrivateLayout>
  );
}
