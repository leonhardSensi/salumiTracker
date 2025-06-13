"use client";

import { useEffect, useState } from "react";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import DashboardCardDetails from "../../components/dashboard/dashboardCardDetails";
import {
  ISalumeProps,
  ISalumeWithDuration,
  ISalume,
  IDashboardSalumeState,
} from "../../interfaces/interfaces";
import Card from "../../components/generic/card/card";
import { getSalumi } from "../../api/salumeApi";
import { useQuery } from "@tanstack/react-query";
import { useDrop } from "react-dnd";
import { useRecoilState } from "recoil";
import {
  curingState,
  saltingState,
  dryingState,
} from "../../atoms/salumiAtoms";
import { useUpdateSalumeStateMutation } from "../../mutations/salumeMutation";
import Image from "next/image";
import Link from "next/link";
import { calculateSalumeDuration } from "../../utils/salumeDuration";

export default function Dashboard() {
  const { data: salumiData } = useQuery(["salumi"], getSalumi);
  const updateSalumeState = useUpdateSalumeStateMutation();
  const [salumi, setSalumi] = useState(salumiData && salumiData);
  console.log(salumi);

  const fetchSalumi = async () => {
    const data = await getSalumi();
    if (data) {
      setSalumi(data);
    }
  };

  useEffect(() => {
    fetchSalumi();
  }, [salumiData]);

  // const {
  //   status,
  //   error: errorMessage,
  //   data: salumi,
  // } = useQuery({
  //   queryKey: ["salumi"],
  //   queryFn: getSalumi,
  // });

  const [curing, setCuring] =
    useRecoilState<IDashboardSalumeState[]>(curingState);
  const [salting, setSalting] =
    useRecoilState<IDashboardSalumeState[]>(saltingState);
  const [drying, setDrying] =
    useRecoilState<IDashboardSalumeState[]>(dryingState);

  const [hideHints, setHideHints] = useState(false);

  useEffect(() => {
    calcDuration();
  }, [salumiData]);

  const updateSalumiStateWithDuration = (salumi: ISalumeWithDuration[]) => {
    const dryingArr = salumi.filter((item) => item.salume.state === "drying");
    const saltingArr = salumi.filter((item) => item.salume.state === "salting");
    const curingArr = salumi.filter((item) => item.salume.state === "curing");

    setDrying(dryingArr);
    setSalting(saltingArr);
    setCuring(curingArr);
  };

  const calcDuration = async () => {
    // if (salumiData) {
    //   const salumiArr = await Promise.all(
    //     salumiData.map(async (salume) => calculateSalumeDuration(salume))
    //   );
    //   if (salumiArr) {
    //     updateSalumiStateWithDuration(salumiArr);
    //   }
    // }
    if (salumiData) {
      const salumiArr = await Promise.all(
        salumiData.map(async (salume) => calculateSalumeDuration(salume))
      );
      if (salumiArr) {
        updateSalumiStateWithDuration(salumiArr);
      }
    }
  };

  const [{ isOverDrying, getDropResultDrying }, dropTargetDrying] = useDrop({
    accept: "salume",
    drop: (droppedSalume) => {
      addSalumeToSection(droppedSalume as ISalumeProps, isOverDrying);
    },
    // item: () => {
    //   return { id, index };
    // },
    collect: (monitor: any) => ({
      isOverDrying: !!monitor.isOver(),
      getDropResultDrying: monitor.getDropResult(),
    }),
  });

  const [{ isOverSalting, getDropResultSalting }, dropTargetSalting] = useDrop({
    accept: "salume",
    drop: (droppedSalume) => {
      addSalumeToSection(droppedSalume as ISalumeProps, isOverSalting);
    },
    // item: () => {
    //   return { id, index };
    // },
    collect: (monitor: any) => ({
      isOverSalting: !!monitor.isOver(),
      getDropResultSalting: monitor.getDropResult(),
    }),
  });
  const [{ isOverCuring, getDropResultCuring }, dropTargetCuring] = useDrop({
    accept: "salume",
    drop: (droppedSalume) => {
      addSalumeToSection(droppedSalume as ISalumeProps, isOverCuring);
    },
    collect: (monitor: any) => ({
      isOverCuring: !!monitor.isOver(),
      getDropResultCuring: monitor.getDropResult(),
    }),
  });

  const [{ isOverDone, getDropResultDone }, dropTargetDone] = useDrop({
    accept: "salume",
    drop: (droppedSalume) => {
      addSalumeToSection(droppedSalume as ISalumeProps, isOverDone);
    },
    collect: (monitor) => ({
      isOverDone: !!monitor.isOver(),
      getDropResultDone: monitor.getDropResult(),
    }),
  });

  //-------
  //-------
  //-------
  //-------
  //-------
  //-------
  const addSalumeToSection = async (salume: ISalumeProps, isOver: boolean) => {
    // Extract salume data
    const { created_at, id, name, notes, recipe, state, updated_at } =
      salume.salume;
    // Create newSalume object with updated state
    const newSalume: ISalume = {
      created_at,
      id,
      name,
      notes,
      recipe: { id: recipe.id },
      state: isOver
        ? isOverDrying
          ? "drying"
          : isOverSalting
          ? "salting"
          : isOverCuring
          ? "curing"
          : isOverDone
          ? "done"
          : state
        : state,
      updated_at: updated_at,
      rating: 0,
    };

    // Update state based on drop target
    if (isOverDrying) {
      if (state === "drying") {
        return;
      }
      console.log("IMAGE", newSalume.image);
      updateSalumeState.mutate({
        id: newSalume.id,
        name: newSalume.name,
        notes: newSalume.notes,
        recipeId: newSalume.recipe.id,
        state: newSalume.state,
        rating: 0,
      });
      const { duration } = await calculateSalumeDuration(newSalume);
      console.log(duration);
      setDrying([
        ...drying,
        {
          salume: newSalume,
          duration: duration,
        },
      ]);

      //-------
      setSalting(salting.filter((item) => item.salume.id !== id));
      setCuring(curing.filter((item) => item.salume.id !== id));
    } else if (isOverSalting) {
      if (state === "salting") {
        return;
      }
      updateSalumeState.mutate({
        id: newSalume.id,
        name: newSalume.name,
        notes: newSalume.notes,
        recipeId: newSalume.recipe.id,
        state: newSalume.state,
        rating: 0,
      });
      const { duration } = await calculateSalumeDuration(newSalume);

      setSalting([
        ...salting,
        {
          salume: newSalume,
          duration: duration,
        },
      ]);

      //-----
      setDrying(drying.filter((item) => item.salume.id !== id));
      setCuring(curing.filter((item) => item.salume.id !== id));
    } else if (isOverCuring) {
      if (state === "curing") {
        return;
      }
      updateSalumeState.mutate({
        id: newSalume.id,
        name: newSalume.name,
        notes: newSalume.notes,
        recipeId: newSalume.recipe.id,
        state: newSalume.state,
        rating: 0,
      });
      const { duration } = await calculateSalumeDuration(newSalume);

      setCuring([
        ...curing,
        {
          salume: newSalume,
          duration: duration,
        },
      ]);

      //------
      setDrying(drying.filter((item) => item.salume.id !== id));
      setSalting(salting.filter((item) => item.salume.id !== id));
    } else if (isOverDone) {
      updateSalumeState.mutate({
        id: newSalume.id,
        name: newSalume.name,
        notes: newSalume.notes,
        recipeId: newSalume.recipe.id,
        state: newSalume.state,
        rating: 0,
      });

      console.log(newSalume);

      setDrying(drying.filter((item) => item.salume.id !== id));
      setSalting(salting.filter((item) => item.salume.id !== id));
      setCuring(curing.filter((item) => item.salume.id !== id));
    }
  };

  setTimeout(() => {
    setHideHints(true);
  }, 5000);

  return (
    <PrivateLayout>
      <div className="flex flex-col items-center w-full overflow-hidden">
        {/* <h1 className="text-6xl text-eggshell border-b-eggshell border-b-4 border-double font-bold font-Montserrat mt-8">
          Dashboard
        </h1> */}
        {salumi && (
          <div className="w-full flex flex-col justify-center items-center p-12">
            <div className="flex flex-row justify-center items-center w-full space-x-4 mb-8">
              <div
                className="justify-center w-1/2 flex"
                ref={dropTargetSalting}
              >
                <Card
                  details={salting}
                  image={"/salt.svg"}
                  imageSize={{ width: 100, height: 100 }}
                  link={""}
                  status={"Salting"}
                  addStyles={
                    "hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl w-full"
                    // "hover:-translate-x-2/3 group-hover:translate-x-full transition-transform duration-300 ease-in-out"
                  }
                >
                  <DashboardCardDetails salumi={salting} status={"Salting"} />
                </Card>
              </div>
              <div className="justify-center w-1/2 flex" ref={dropTargetDrying}>
                <Card
                  details={drying}
                  image={"/dry.svg"}
                  imageSize={{ width: 100, height: 100 }}
                  link={""}
                  status={"Drying"}
                  addStyles={
                    "hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl w-full"
                    // "hover:-translate-x-1/2 group-hover:translate-x-2/3 transition-transform duration-300 ease-in-out group-hover:scale-150"
                  }
                >
                  <DashboardCardDetails salumi={drying} status={"Drying"} />
                </Card>
              </div>
            </div>
            <div className="justify-center w-1/2 flex" ref={dropTargetCuring}>
              <Card
                details={curing}
                image={"/cure.svg"}
                imageSize={{ width: 100, height: 100 }}
                link={""}
                status={"Curing"}
                addStyles={
                  "hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl"
                  // "hover:-translate-y-full group-hover:translate-y-full transition-transform duration-300 ease-in-out"
                }

                // onClick={() => {
                //   handleClick("curing");
                // }}
              >
                <DashboardCardDetails salumi={curing} status={"Curing"} />
              </Card>
            </div>
            <div
              className="pr-16 w-full flex justify-end align-top mb-8 group"
              ref={dropTargetDone}
            >
              <div>
                <p
                  className={`group-hover:opacity-100 bg-salumeWhite text-salumeBlue shadow-2xl rounded-t-xl rounded-l-xl p-1 transition-opacity ease-in-out duration-300 mr-2 ${
                    hideHints ? "opacity-0" : ""
                  }`}
                >
                  Drop and view your completed salumi here!
                </p>
              </div>
              <Link href="/salumi/completed" className="">
                <Image
                  src={"/waiter.svg"}
                  alt={"waiter"}
                  width={100}
                  height={100}
                  className="hover:scale-110 transition-all duration-300 ease-in-out hover:cursor-pointer"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </PrivateLayout>
  );
}
