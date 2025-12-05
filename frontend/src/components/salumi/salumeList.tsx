"use client";
import { ISalume } from "../../interfaces/interfaces";
import Link from "next/link";
import Rating from "../generic/rating/rating";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SalumeList(props: { salumi: ISalume[] | undefined }) {
  return (
    <div className="max-w-4xl">
      {props.salumi ? (
        <>
          {props.salumi.length === 0 ? (
            <div className="flex text-xl justify-center">
              <p>
                No Salumi found. Let your current ones finish first or{" "}
                <Link className="text-wetSand underline" href={"/add_salume"}>
                  create a new one
                </Link>
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {props.salumi.map((salume, index) =>
                salume.state === "completed" ? (
                  <motion.div
                    key={salume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="break-inside-avoid mb-6"
                  >
                    <Link href={`/salumi/${salume.id}`}>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl shadow-lg border-2 border-wetSand/20 bg-gradient-to-br from-[#faf0e1] to-[#f5ebe0] overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                      >
                        {salume.image && (
                          <div className="w-full aspect-square relative overflow-hidden">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_BACKEND}/salumePictures/${salume.image}`}
                              fill
                              alt={salume.name}
                              className="object-cover"
                            />
                          </div>
                        )}

                        <div className="p-5">
                          <Rating salume={salume} />

                          <h1 className="text-xl font-serif font-bold mt-3 text-wetSand">
                            {salume.name}
                          </h1>

                          {salume.notes && (
                            <p className="text-sm text-stone mt-2 line-clamp-3">
                              {salume.notes}
                            </p>
                          )}

                          <div className="flex items-center gap-2 mt-3 text-xs text-wetSand/70">
                            <div className="w-1.5 h-1.5 rounded-full bg-wetSand" />
                            <span>
                              {new Date(salume.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ) : null
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex text-xl justify-center">
          <p>
            There was an error getting salumi. Please{" "}
            <span
              className="text-wetSand underline cursor-pointer"
              onClick={() => location.reload()}
            >
              try again
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
}
