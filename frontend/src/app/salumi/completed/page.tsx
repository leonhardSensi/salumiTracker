"use client";
import { useRef, useEffect, useState } from "react";
import { getSalumi } from "../../../api/salumeApi";
import { PrivateLayout } from "../../../components/PrivateLayout/privateLayout";
import SalumeList from "../../../components/salumi/salumeList";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, TrendingUp, Calendar, Star, Search } from "lucide-react";

export default function CompletedSalumi() {
  const { data: salumiData } = useQuery(["salumi"], getSalumi);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter completed salumi
  const completedSalumi = salumiData?.filter(
    (salume) => salume.state === "completed"
  );

  // Filter by search query
  const filteredSalumi = completedSalumi?.filter((salume) =>
    salume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalCompleted = completedSalumi?.length || 0;
  const ratedSalumi = completedSalumi?.filter((s) => s.rating && s.rating > 0);
  const averageRating =
    ratedSalumi && ratedSalumi.length > 0
      ? (
          ratedSalumi.reduce((sum, s) => sum + (s.rating || 0), 0) /
          ratedSalumi.length
        ).toFixed(1)
      : "0";
  const currentYear = new Date().getFullYear();

  const statCards = [
    {
      icon: Award,
      value: totalCompleted,
      label: "Total Completed",
      color: "text-wetSand",
    },
    {
      icon: Star,
      value: averageRating,
      label: "Average Rating",
      color: "text-wetSand",
    },
    {
      icon: Calendar,
      value: currentYear,
      label: "Active Year",
      color: "text-wetSand",
    },
  ];

  return (
    <PrivateLayout>
      <main className="flex flex-col items-center w-full p-12 text-stone bg-eggshell rounded-tl-[4rem] overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Award size={48} className="text-wetSand" strokeWidth={1.5} />
          </motion.div>
          <h1 className="font-serif text-5xl font-bold text-wetSand mb-2">
            Completed Salumi
          </h1>
          <p className="text-stone text-lg">
            Your collection of finished masterpieces
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-8"
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 24px rgba(139, 111, 71, 0.15)",
                }}
                className="bg-gradient-to-br from-[#faf0e1] to-[#f5ebe0] rounded-2xl p-6 shadow-lg border-2 border-wetSand/20"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <Icon size={32} className={stat.color} strokeWidth={1.5} />
                  <div className="text-4xl font-serif font-bold text-wetSand">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-stone">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full max-w-3xl mb-8"
        >
          <div className="relative">
            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-wetSand/50"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search completed salumi..."
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-wetSand/30 focus:outline-none focus:ring-2 focus:ring-wetSand focus:border-wetSand text-lg shadow-sm bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-wetSand/50 hover:text-wetSand transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Salume List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full max-w-5xl"
        >
          {filteredSalumi && filteredSalumi.length > 0 ? (
            <SalumeList salumi={filteredSalumi} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block mb-4"
              >
                <Award size={64} className="text-wetSand/50" strokeWidth={1} />
              </motion.div>
              <h3 className="font-serif text-2xl font-bold text-wetSand mb-2">
                No salumi found
              </h3>
              <p className="text-stone">
                {searchQuery
                  ? "Try a different search term"
                  : "Complete your first salume to see it here!"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </PrivateLayout>
  );
}
