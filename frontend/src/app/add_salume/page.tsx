"use client";

import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import SalumeInput from "../../components/generic/input/salumi/salumeInput";
import { ModalProvider } from "../../utils/modalProvider";
import { motion } from "framer-motion"; // Add this import

export default function NewSalume() {
  return (
    <ModalProvider>
      <PrivateLayout>
        <motion.div
          className="flex flex-col items-center w-full p-12 h-[90vh]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="w-fit text-6xl text-wetSand font-serif mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Add Salume
          </motion.h1>

          <motion.div
            className="flex flex-col items-center h-fit w-full overflow-auto rounded-xl bg-flesh shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SalumeInput />
          </motion.div>
        </motion.div>
      </PrivateLayout>
    </ModalProvider>
  );
}
