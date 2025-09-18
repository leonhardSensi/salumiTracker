"use client";
import { ISalume } from "../../interfaces/interfaces";
import Link from "next/link";
import Rating from "../generic/rating/rating";
import Image from "next/image";

export default function SalumeList(props: { salumi: ISalume[] | undefined }) {
  return (
    <div className="w-full h-[65vh] overflow-y-auto bg-eggshell rounded-lg p-6">
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
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full space-y-6">
              {props.salumi.map((salume, index) =>
                salume.state === "completed" ? (
                  <Link href={`/salumi/${salume.id}`} key={salume.id}>
                    <div
                      id={`completedSalume-${index}`}
                      className={`mb-6 break-inside-avoid rounded-lg shadow-2xl border-flesh bg-flesh flex flex-col items-center transition-all duration-200 hover:scale-[1.02] cursor-pointer
                        ${
                          salume.image
                            ? "p-8 min-h-[320px] min-w-[260px] sm:min-w-[320px] lg:min-w-[340px]"
                            : "p-4 min-h-[160px] min-w-[180px] sm:min-w-[200px] lg:min-w-[220px]"
                        }
                      `}
                    >
                      {salume.image && (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND}/salumePictures/${salume.image}`}
                          width={180}
                          height={180}
                          alt="salume"
                          className="w-full rounded-md mb-4 object-cover"
                        />
                      )}

                      <div className="w-full items-start">
                        <Rating salume={salume} />
                        <h1 className="text-xl font-bold mt-4">
                          {salume.name}
                        </h1>
                        {salume.notes && (
                          <h2 className="text-lg mt-1">{salume.notes}</h2>
                        )}
                        <p className="text-sm text-wetSand mt-2">
                          {new Date(salume.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : null
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex text-xl justify-center text-black">
          <p className="text-black">
            There was an error getting salumi. Please
            <span
              className="text-blue-400 underline cursor-pointer"
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
