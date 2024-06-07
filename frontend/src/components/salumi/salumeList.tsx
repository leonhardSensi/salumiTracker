"use client";
import { completedState } from "../../atoms/salumiAtoms";
import { ISalume } from "../../interfaces/interfaces";
import Link from "next/link";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Rating from "../generic/rating/rating";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

export default function SalumeList(props: { salumi: ISalume[] | undefined }) {
  // const { data: salumiData } = useQuery(["salumi"], getSalumi);

  useEffect(() => {
    gsap.registerPlugin(Draggable);
    props.salumi &&
      props.salumi.forEach((salume, index) => {
        Draggable.create(`#completedSalume-${index}`, {
          type: "x,y",
          inertia: true,
          bounds: null,
          // liveSnap: {
          //   y: [0, 100, 200, 300],
          // },
          onClick: function () {
            console.log("clicked");
          },
          onDragEnd: function () {
            console.log("drag ended");
          },
        });
      });
    //   // if (completedSalumeRef.current) {
    //   //   Draggable.create(completedSalumeRef.current, {
    //   //     type: "x,y",
    //   //     inertia: true,
    //   //     bounds: {
    //   //       top: 0,
    //   //       left: 0,
    //   //       width: 5000,
    //   //       height: 5000,
    //   //     },
    //   //     // liveSnap: {
    //   //     //   y: [0, 100, 200, 300],
    //   //     // },
    //   //     onClick: function () {
    //   //       console.log("clicked");
    //   //     },
    //   //     onDragEnd: function () {
    //   //       console.log("drag ended");
    //   //     },
    //   //   });
    //   // }
  }, []);

  const [completedSalumi, setCompletedSalumi] =
    useRecoilState<ISalume[]>(completedState);

  useEffect(() => {
    if (props.salumi) {
      props.salumi.map((salume) => {
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
  }, [props.salumi]);

  return (
    <>
      {props.salumi ? (
        <>
          {props.salumi.length === 0 ? (
            <div className="flex text-xl justify-center text-black">
              <p>
                No Salumi found. Let your current ones finish first or{" "}
                <Link
                  className="text-salumeWhite underline"
                  href={"/add_salume"}
                >
                  create a new one
                </Link>
              </p>
            </div>
          ) : (
            <table className="w-full text-left mb-16">
              <thead className="text-6xl text-gray-700 w-full text-center">
                <tr>
                  <th className="font-bold font-Montserrat text-salumeWhite pb-8 flex justify-center">
                    <h1 className="w-fit border-b-salumeWhite border-b-4 border-double">
                      Completed Salumi
                    </h1>
                  </th>
                </tr>
              </thead>
              <tbody>
                {completedSalumi.map((salume, index) => {
                  return (
                    <tr
                      id={`completedSalume-${index}`}
                      key={`recipe-${salume.id}`}
                      className="border-y border-salumeWhite hover:bg-salumeWhite hover:text-salumeBlue hover:border-y-salumeBlue text-salumeWhite w-full transition-colors duration-300"
                    >
                      <td className="cursor-pointer font-medium  whitespace-nowrap flex justify-between items-center">
                        <Link
                          href={`/salumi/${salume.id}`}
                          className="w-full px-6 py-4"
                        >
                          <p className="font-Satisfy text-4xl">
                            - {salume.name}
                          </p>
                        </Link>
                        {salume.rating === 0 && (
                          <p className="text-lg absolute right-80 border-salumeWhite rounded-t-xl rounded-r-xl bg-salumeWhite text-salumeBlue p-2">
                            Rate now!
                          </p>
                        )}
                        <div className="mr-14">
                          <Rating
                            salume={salume}
                            // refetch={props.refetch}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
    </>
  );
}
