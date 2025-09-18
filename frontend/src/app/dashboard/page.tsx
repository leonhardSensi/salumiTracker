"use client";

import { useEffect, useState } from "react";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import DashboardCardDetails from "../../components/dashboard/dashboardCardDetails";
import {
  ISalumeProps,
  ISalumeWithDuration,
  ISalume,
  IDashboardSalumeState,
  ICompletedSalume,
  IActionItem,
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
  completedState,
} from "../../atoms/salumiAtoms";
import { useUpdateSalumeStateMutation } from "../../mutations/salumeMutation";
import Image from "next/image";
import Link from "next/link";
import { calculateSalumeDuration } from "../../utils/salumeDuration";
import { motion, easeOut } from "framer-motion";
import generateActionItems from "../../utils/actionItems";
import ActionItems from "../../components/dashboard/actionItems";
import Modal from "../../components/generic/modal/modal";
import { ModalProvider } from "../../utils/modalProvider";

export default function Dashboard() {
  const {
    data: salumiData,
    isLoading,
    isFetching,
  } = useQuery(["salumi"], getSalumi);
  const updateSalumeState = useUpdateSalumeStateMutation();
  const [salumi, setSalumi] = useState(salumiData && salumiData);

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
  const [completed, setCompleted] =
    useRecoilState<IDashboardSalumeState[]>(completedState);
  const [actionItems, setActionItems] = useState<IActionItem[]>();

  const [hideHints, setHideHints] = useState(false);

  useEffect(() => {
    calcDuration();
  }, [salumiData]);

  useEffect(() => {
    if (salumiData) {
      (async () => {
        const items = await generateActionItems(salumiData);
        setActionItems(items);
      })();
    }
  }, [salumiData]);

  const updateSalumiStateWithDuration = (salumi: ISalumeWithDuration[]) => {
    const dryingArr = salumi.filter((item) => item.salume.state === "drying");
    const saltingArr = salumi.filter((item) => item.salume.state === "salting");
    const curingArr = salumi.filter((item) => item.salume.state === "curing");
    const completedArr = salumi.filter(
      (item) => item.salume.state === "completed"
    );
    setDrying(dryingArr);
    setSalting(saltingArr);
    setCuring(curingArr);
    setCompleted(completedArr);
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

  const [{ isOverCompleted, getDropResultCompleted }, dropTargetCompleted] =
    useDrop({
      accept: "salume",
      drop: (droppedSalume) => {
        addSalumeToSection(droppedSalume as ISalumeProps, isOverCompleted);
      },
      collect: (monitor) => ({
        isOverCompleted: !!monitor.isOver(),
        getDropResultCompleted: monitor.getDropResult(),
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
          : isOverCompleted
          ? "completed"
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
      setCompleted(completed.filter((item) => item.salume.id !== id));
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
      setCompleted(completed.filter((item) => item.salume.id !== id));
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
      setCompleted(completed.filter((item) => item.salume.id !== id));
    } else if (isOverCompleted) {
      updateSalumeState.mutate({
        id: newSalume.id,
        name: newSalume.name,
        notes: newSalume.notes,
        recipeId: newSalume.recipe.id,
        state: newSalume.state,
        rating: 0,
      });

      const { duration } = await calculateSalumeDuration(newSalume);

      setCompleted([
        ...completed,
        {
          salume: newSalume,
          duration: duration,
        },
      ]);

      setDrying(drying.filter((item) => item.salume.id !== id));
      setSalting(salting.filter((item) => item.salume.id !== id));
      setCuring(curing.filter((item) => item.salume.id !== id));
    }
  };

  setTimeout(() => {
    setHideHints(true);
  }, 5000);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: easeOut },
    },
  };

  return (
    <ModalProvider>
      <PrivateLayout>
        <div className="flex flex-col items-center w-full h-[100vh] overflow-y-auto">
          {salumi && (
            <div className="w-full flex flex-col justify-center items-center p-12">
              <div className="flex flex-row justify-center items-center w-full space-x-4 mb-8">
                <div
                  className="justify-center w-1/2 flex"
                  ref={dropTargetSalting}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    }}
                    className="w-full"
                  >
                    <Card
                      details={salting}
                      image={"/salt.svg"}
                      imageSize={{ width: 100, height: 100 }}
                      link={""}
                      status={"Salting"}
                      addStyles={
                        "shadow-md transition-all duration-200 hover:shadow-2xl w-full"
                      }
                    >
                      <DashboardCardDetails
                        salumi={salting}
                        status={"Salting"}
                      />
                    </Card>
                  </motion.div>
                </div>
                <div
                  className="justify-center w-1/2 flex"
                  ref={dropTargetDrying}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    }}
                    className="w-full"
                  >
                    <Card
                      details={drying}
                      image={"/dry.svg"}
                      imageSize={{ width: 100, height: 100 }}
                      link={""}
                      status={"Drying"}
                      addStyles={
                        "shadow-md transition-all duration-200 hover:shadow-2xl w-full"
                      }
                    >
                      <DashboardCardDetails salumi={drying} status={"Drying"} />
                    </Card>
                  </motion.div>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center w-full space-x-4 mb-8">
                <div
                  className="justify-center w-1/2 flex"
                  ref={dropTargetCuring}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    }}
                    className="w-full"
                  >
                    <Card
                      details={curing}
                      image={"/cure.svg"}
                      imageSize={{ width: 100, height: 100 }}
                      link={""}
                      status={"Curing"}
                      addStyles={
                        "shadow-md transition-all duration-200 hover:shadow-2xl w-full"
                      }
                    >
                      <DashboardCardDetails salumi={curing} status={"Curing"} />
                    </Card>
                  </motion.div>
                </div>
                <div
                  className="justify-center w-1/2 flex"
                  // ref={dropTargetCompleted}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    }}
                    className="w-full"
                  >
                    <Card
                      details={completed}
                      image={"/action.svg"}
                      imageSize={{ width: 100, height: 100 }}
                      link={""}
                      status={"Action Items"}
                      addStyles={
                        "shadow-md transition-all duration-200 hover:shadow-2xl w-full"
                      }
                    >
                      <ActionItems
                        actionItems={actionItems}
                        isLoading={isLoading}
                        isFetching={isFetching}
                      />
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </div>
      </PrivateLayout>
    </ModalProvider>
  );
}
