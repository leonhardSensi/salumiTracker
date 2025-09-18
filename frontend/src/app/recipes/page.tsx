"use client";

import RecipeCarousel from "../../components/recipes/recipeDeck";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import { useQuery } from "@tanstack/react-query";
import { RecipeError, getRecipes } from "../../api/recipeApi";
import { Irecipe } from "../../interfaces/interfaces";
import { ModalProvider } from "../../utils/modalProvider";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import RecipeDeck from "../../components/recipes/recipeDeck";

export default function Recipes() {
  const {
    status,
    error: errorMessage,
    data: recipes,
  } = useQuery<Irecipe[], RecipeError>({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };
  const listVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };
  const headingVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.1 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.5 },
    },
    hover: {
      scale: 1.12,
      rotate: -10,
      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
    },
    tap: { scale: 0.95, rotate: 0 },
  };

  return (
    <ModalProvider>
      <PrivateLayout>
        <motion.div
          className="flex flex-col w-full h-[100vh] overflow-y-auto items-center p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="w-fit text-6xl text-wetSand font-serif"
            variants={headingVariants}
            initial="hidden"
            animate="visible"
          >
            Your finished Salumi
          </motion.h1>

          <motion.div
            className="text-stone flex flex-col w-full items-center justify-start mt-12 overflow-auto"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            <RecipeDeck recipes={recipes} />
          </motion.div>
          <Link href="/add_recipe" className="mt-4">
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              className="rounded-full"
            >
              <Image
                src={"/plusButton.svg"}
                width={50}
                height={50}
                alt="add recipe"
              />
            </motion.div>
          </Link>
        </motion.div>
      </PrivateLayout>
    </ModalProvider>
  );
}
