"use client";

import { Package } from "lucide-react";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import SalumeInput from "../../components/generic/input/salumi/salumeInput";
import { ModalProvider } from "../../utils/modalProvider";
import { motion } from "framer-motion";

export default function NewSalume() {
  return (
    <ModalProvider>
      <PrivateLayout>
        <main className="flex-1 p-8 bg-eggshell rounded-tl-[4rem] overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Package size={48} className="text-wetSand" strokeWidth={1.5} />
            </motion.div>
            <h1 className="font-serif text-5xl font-bold text-wetSand mb-4">
              Create a New Salume
            </h1>
          </motion.div>

          <motion.div
            className="flex flex-col items-center w-full rounded-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SalumeInput />
          </motion.div>
        </main>
      </PrivateLayout>
    </ModalProvider>
  );
}
