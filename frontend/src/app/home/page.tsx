"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { getSalumi } from "../../api/salumeApi";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  saltingState,
  dryingState,
  curingState,
  completedState,
} from "../../atoms/salumiAtoms";
import {
  ISalume,
  ISalumeWithDuration,
  Iuser,
} from "../../interfaces/interfaces";
import { calculateSalumeDuration } from "../../utils/salumeDuration";
import { getUser } from "../../api/userApi";
import { updateUserData } from "../../atoms/userAtoms";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const { data: user } = useQuery(["user"], getUser);

  const [updatedUser, setUpdatedUser] = useRecoilState(updateUserData);
  const [userData, setUserData] = useState<Iuser | undefined>(user && user);

  const fetchUser = async () => {
    const data = await getUser();
    if (data) {
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [updatedUser]);

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

  console.log("Salumi data:", salumi);

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

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  return (
    <PrivateLayout>
      <main className="w-full bg-eggshell text-stone px-32 flex flex-col justify-center space-y-16 font-sans">
        {/* Header Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-center"
        >
          <p className="text-xl mt-2">
            You have <strong>3 salumi</strong> in progress. Next task in{" "}
            <strong>2 days</strong>.
          </p>
        </motion.section>

        {/* Overview Cards */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-stone"
        >
          <motion.div
            variants={sectionVariants}
            custom={1}
            className="bg-flesh p-6 rounded-xl shadow-md text-center flex flex-col justify-between"
          >
            <h3 className="text-xl font-serif mb-2">Active Batches</h3>
            <table>
              <tr className="font-bold">
                <td>Salting</td>
                <td>Drying</td>
                <td>Curing</td>
              </tr>
              <tr>
                <td>{salting.length}</td>
                <td>{drying.length}</td>
                <td>{curing.length}</td>
              </tr>
            </table>
          </motion.div>
          <motion.div
            variants={sectionVariants}
            custom={1.2}
            className="bg-flesh p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-xl font-serifmb-2">Next Task</h3>
            <p>
              Flip <strong>Coppa</strong> in <strong>2 days</strong>
            </p>
          </motion.div>
          <motion.div
            variants={sectionVariants}
            custom={1.4}
            className="bg-flesh p-6 rounded-xl shadow-md text-center"
          >
            <h3 className="text-xl font-serif mb-2">Average Yield</h3>
            <p className="text-2xl font-bold">72%</p>
          </motion.div>
        </motion.section>

        {/* Featured Batch */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="bg-flesh text-stone p-8 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between"
        >
          <div>
            <h2 className="text-2xl font-serif mb-2">
              Featured Batch: Guanciale
            </h2>
            <p>Started: May 1 • Weight: 1.2kg • Ready in: 10 days</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 md:mt-0 bg-wetSand text-white px-6 py-3 rounded-lg text-lg"
          >
            Add Note
          </motion.button>
        </motion.section>

        {/* Recent Activity + Quick Links */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 text-stone"
        >
          <motion.div
            variants={sectionVariants}
            custom={3.1}
            className="bg-flesh p-6 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-serif mb-4">Recent Activity</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Harvested Pancetta (May 14)</li>
              <li>Logged note on Spicy Soppressata</li>
              <li>Added new batch: Fiocco</li>
            </ul>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            custom={3.2}
            className="bg-flesh p-6 rounded-xl shadow-md"
          >
            <h3 className="text-xl font-serif mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/add_salume">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#e0b97f" }}
                  whileTap={{ scale: 0.97 }}
                  className="block w-full bg-wetSand text-eggshell py-2 rounded-md"
                >
                  + Add New Batch
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.03, borderColor: "#e0b97f" }}
                whileTap={{ scale: 0.97 }}
                className="block w-full border border-wetSand text-stone py-2 rounded-md"
              >
                📸 Upload Snapshot
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        {/* Artisan Tip */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={4}
          className="text-center mt-12"
        >
          <h4 className="text-lg font-bold">Daily Tip</h4>
          <p className="italic">“Rotate batches weekly for even drying.”</p>
        </motion.section>
      </main>
    </PrivateLayout>
  );
}
