"use client";

import { useEffect, useState } from "react";
import { PrivateLayout } from "../../components/PrivateLayout/privateLayout";
import DashboardCardDetails from "../../components/dashboard/dashboardCardDetails";
import {
  ISalumeProps,
  ISalumeWithDuration,
  ISalume,
  IDashboardSalumeState,
  IActionItem,
} from "../../interfaces/interfaces";
import Card from "../../components/generic/card/card";
import { getSalumi } from "../../api/salumeApi";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import {
  curingState,
  saltingState,
  dryingState,
  completedState,
} from "../../atoms/salumiAtoms";
import { useUpdateSalumeStateMutation } from "../../mutations/salumeMutation";
import { calculateSalumeDuration } from "../../utils/salumeDuration";
import { motion, easeOut } from "framer-motion";
import generateActionItems from "../../utils/actionItems";
import ActionItems from "../../components/dashboard/actionItems";
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

  const [curing, setCuring] =
    useRecoilState<IDashboardSalumeState[]>(curingState);
  const [salting, setSalting] =
    useRecoilState<IDashboardSalumeState[]>(saltingState);
  const [drying, setDrying] =
    useRecoilState<IDashboardSalumeState[]>(dryingState);

  const [completed, setCompleted] = useRecoilState<IDashboardSalumeState[]>(
    completedState as any
  );
  const [actionItems, setActionItems] = useState<IActionItem[]>();

  const [hideHints, setHideHints] = useState(false);
  const [dragOverZone, setDragOverZone] = useState<string | null>(null);

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
    if (salumiData) {
      const salumiArr = await Promise.all(
        salumiData.map(async (salume) => calculateSalumeDuration(salume))
      );
      if (salumiArr) {
        updateSalumiStateWithDuration(salumiArr);
      }
    }
  };

  // Native HTML5 drag handlers
  const handleDragOver = (e: React.DragEvent, zone: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverZone(zone);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    setDragOverZone(null);
  };

  const handleDrop = async (e: React.DragEvent, targetState: string) => {
    e.preventDefault();
    setDragOverZone(null);

    const data = e.dataTransfer.getData("application/json");
    if (!data) return;

    const droppedItem = JSON.parse(data);
    const { salume } = droppedItem;

    // Don't do anything if dropping in the same state
    if (salume.state === targetState) return;

    // Extract salume data
    const { created_at, id, name, notes, recipe, state, updated_at } = salume;

    // Create newSalume object with updated state
    const newSalume: ISalume = {
      created_at,
      id,
      name,
      notes,
      recipe: { id: recipe.id },
      state: targetState,
      updated_at: updated_at,
      rating: 0,
    };

    // Update backend
    updateSalumeState.mutate({
      id: newSalume.id,
      name: newSalume.name,
      notes: newSalume.notes,
      recipeId: newSalume.recipe.id,
      state: newSalume.state,
      rating: 0,
    });

    // Recalculate duration
    const { duration } = await calculateSalumeDuration(newSalume);

    // Create new item
    const newItem = {
      salume: newSalume,
      duration: duration,
    };

    // IMPORTANT: Remove from all states FIRST, then add to target
    const filteredSalting = salting.filter((item) => item.salume.id !== id);
    const filteredDrying = drying.filter((item) => item.salume.id !== id);
    const filteredCuring = curing.filter((item) => item.salume.id !== id);
    const filteredCompleted = completed.filter((item) => item.salume.id !== id);

    // Update all states at once
    setSalting(filteredSalting);
    setDrying(filteredDrying);
    setCuring(filteredCuring);
    setCompleted(filteredCompleted);

    // Add to target state
    switch (targetState) {
      case "drying":
        setDrying([...filteredDrying, newItem]);
        break;
      case "salting":
        setSalting([...filteredSalting, newItem]);
        break;
      case "curing":
        setCuring([...filteredCuring, newItem]);
        break;
      case "completed":
        setCompleted([...filteredCompleted, newItem]);
        break;
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
        <div className="flex flex-col items-center w-full h-[100vh] overflow-y-auto border-eggshell rounded-tl-[4rem] bg-eggshell">
          {salumi && (
            <div className="w-full flex flex-col justify-center items-center p-12">
              <div className="flex flex-row justify-center items-center w-full space-x-4 mb-8">
                <div
                  className="justify-center w-1/2 flex"
                  onDragOver={(e) => handleDragOver(e, "salting")}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "salting")}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className={`w-full transition-all duration-200 ${
                      dragOverZone === "salting"
                        ? "scale-105 ring-4 ring-wetSand/50"
                        : ""
                    }`}
                  >
                    <Card
                      details={salting}
                      image={"/salt.svg"}
                      imageSize={{ width: 100, height: 100 }}
                      link=""
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
                  onDragOver={(e) => handleDragOver(e, "drying")}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "drying")}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className={`w-full transition-all duration-200 ${
                      dragOverZone === "drying"
                        ? "scale-105 ring-4 ring-wetSand/50"
                        : ""
                    }`}
                  >
                    <Card
                      details={drying}
                      image={"/dry.svg"}
                      imageSize={{ width: 100, height: 100 }}
                      link=""
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
                  onDragOver={(e) => handleDragOver(e, "curing")}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "curing")}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className={`w-full transition-all duration-200 ${
                      dragOverZone === "curing"
                        ? "scale-105 ring-4 ring-wetSand/50"
                        : ""
                    }`}
                  >
                    <Card
                      details={curing}
                      image={"/cure.svg"}
                      imageSize={{ width: 100, height: 100 }}
                      link=""
                      status={"Curing"}
                      addStyles={
                        "shadow-md transition-all duration-200 hover:shadow-2xl w-full"
                      }
                    >
                      <DashboardCardDetails salumi={curing} status={"Curing"} />
                    </Card>
                  </motion.div>
                </div>
                <div className="justify-center w-1/2 flex">
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full"
                  >
                    <Card
                      details={completed}
                      image={"/action.svg"}
                      imageSize={{ width: 100, height: 100 }}
                      link=""
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
