"use client";
import Link from "next/link";
import Image from "next/image";
import { PublicLayout } from "../components/PublicLayout/publicLayout";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7 },
  }),
};

export default function LandingPage() {
  return (
    <PublicLayout>
      <div className="p-4 bg-wetSand">
        {/* Hero Section */}
        <main className="flex flex-col min-h-[80vh] border rounded-3xl bg-eggshell shadow-2xl mb-4">
          <div className="flex h-fit px-48 py-16 justify-between items-center">
            <motion.div
              className="w-1/2 text-black flex flex-col justify-center space-y-12"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <motion.h1
                className="text-7xl font-serif leading-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Track Your Salumi Production
              </motion.h1>
              <motion.h3
                className="text-2xl text-justify text-black"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Easily track and manage your salumi batches from start to finish
                with our intuitive tracking application.
              </motion.h3>
              <motion.div
                className="w-full flex justify-start"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <Link href="/register">
                  <motion.button
                    whileHover={{
                      scale: 1.06,
                      backgroundColor: "#e0b97f",
                      color: "#fff",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-wetSand py-4 px-8 text-white text-xl rounded-xl hover:shadow-md hover:bg-eggshell hover:text-wetSand hover:border-solid hover:border-wetSand hover:border-2 border-eggshell border-2 transition-all"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="w-1/2 flex justify-end"
              initial={{ opacity: 0, scale: 0.95, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            >
              <Image
                src={"/salumeSelection.png"}
                alt="salumi selection"
                width={400}
                height={400}
                className="drop-shadow-xl rounded-2xl"
                priority
              />
            </motion.div>
          </div>
        </main>

        {/* Features Section */}
        <motion.section
          id="how-it-works"
          className="py-24 px-32 space-y-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-5xl font-serif text-center text-eggshell"
            variants={fadeUp}
            custom={0}
          >
            Why Salumi Tracker?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center"
            variants={fadeUp}
            custom={1}
          >
            {[
              {
                img: "./batch.png",
                title: "Batch Tracking",
                desc: "Monitor weight, start/end dates, and curing status with visual meters.",
              },
              {
                img: "./timer.png",
                title: "Curing Timers",
                desc: "Stay on top of flips, checks, and estimated readiness.",
              },
              {
                img: "./metrics.png",
                title: "Detailed Metrics",
                desc: "Visualize aging time, yield, and moisture loss trends over time.",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15 + 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                  }}
                  className="bg-eggshell rounded-xl shadow-xl transition-all"
                >
                  <Image
                    width={300}
                    height={300}
                    src={feature.img}
                    alt={feature.title}
                    className="mx-auto mb-6 rounded-xl"
                  />
                </motion.div>
                <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
                <p className="mt-4">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          className="bg-eggshell py-24 px-32 border rounded-3xl shadow-2xl mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-5xl font-serif text-center text-wetSand mb-20"
            variants={fadeUp}
            custom={0}
          >
            How It Works
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center text-stone-800"
            variants={fadeUp}
            custom={1}
          >
            {[
              {
                img: "/createBatch.png",
                title: "1. Create a Batch",
                desc: "Choose your salumi type and log initial weight and curing start date.",
              },
              {
                img: "/trackProgress.png",
                title: "2. Track the Process",
                desc: "Monitor curing, weight loss, and milestones using intuitive dashboards.",
              },
              {
                img: "/getNotified.png",
                title: "3. Get Notified",
                desc: "Receive timely updates on when to flip, check, or harvest your batch.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center space-y-6 text-wetSand"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.18 + 0.2,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                  }}
                  className="rounded-md shadow-sm bg-eggshell"
                >
                  <Image
                    src={step.img}
                    alt={step.title}
                    width={200}
                    height={200}
                    className="rounded-md"
                  />
                </motion.div>
                <h3 className="text-2xl font-bold font-serif">{step.title}</h3>
                <p className="text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Call To Action */}
        <motion.section
          className="text-white py-24 px-32 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className="text-4xl font-serif mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Ready to Craft Perfect Salumi?
          </motion.h2>
          <Link href="/register">
            <motion.button
              whileHover={{
                scale: 1.07,
                backgroundColor: "#e0b97f",
                color: "#fff",
                boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
              }}
              whileTap={{ scale: 0.97 }}
              className="bg-eggshell text-wetSand font-bold text-xl px-10 py-4 rounded-xl hover:shadow-md hover:bg-wetSand hover:text-eggshell hover:border-solid hover:border-eggshell hover:border-2 border-wetSand border-2 transition-all"
            >
              Join Now
            </motion.button>
          </Link>
        </motion.section>
      </div>
    </PublicLayout>
  );
}
