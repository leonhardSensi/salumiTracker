"use client";

import { useEffect, useState } from "react";
import PrivateLayout from "@/components/privateLayout/privateLayout";
import DashboardCardDetails from "@/components/dashboard/dashboardCardDetails";
import { Isalume } from "@/interfaces/interfaces";
import Card from "@/components/generic/card/card";

export default function Dashboard() {
  const curingArr = [
    {
      state: "Curing",
      name: "Coppa",
      date: new Date("2023-09-17"),
      image: "/cure.svg",
      daysLeft: 0,
    },
    {
      state: "Curing",
      name: "Bresaiola",
      date: new Date("2023-09-13"),
      image: "/cure.svg",
      daysLeft: 0,
    },
  ];

  const saltingArr = [
    {
      state: "Salting",
      name: "Pancetta",
      date: new Date("2023-09-25"),
      image: "/salt.svg",
      daysLeft: 0,
    },
    {
      state: "Salting",
      name: "Coppa",
      date: new Date("2023-09-05"),
      image: "/salt.svg",
      daysLeft: 0,
    },
  ];

  const dryingArr: Isalume[] = [
    // {
    //   state: "Drying",
    //   name: "Coppa",
    //   date: new Date("2023-09-23"),
    //   image: "/salt.svg",
    //   daysLeft: 0,
    // },
  ];

  const [curing, setCuring] = useState<Isalume[]>([]);
  const [salting, setSalting] = useState<Isalume[]>([]);
  const [drying, setDrying] = useState<Isalume[]>([]);

  useEffect(() => {
    curingArr.length > 0 &&
      curingArr.forEach((salume) => {
        const currentDate = new Date();
        const targetDate = salume.date;

        const timeDifference = targetDate.getTime() - currentDate.getTime();
        const newDaysLeft =
          Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        salume.daysLeft = newDaysLeft;
        setCuring(curingArr);
      });

    saltingArr.length > 0 &&
      saltingArr.forEach((salume) => {
        const currentDate = new Date();
        const targetDate = salume.date;

        const timeDifference = targetDate.getTime() - currentDate.getTime();
        const newDaysLeft =
          Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        salume.daysLeft = newDaysLeft;
        setSalting(saltingArr);
      });

    dryingArr.length > 0 &&
      dryingArr.forEach((salume) => {
        const currentDate = new Date();
        const targetDate = salume.date;

        const timeDifference = targetDate.getTime() - currentDate.getTime();
        const newDaysLeft =
          Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
        salume.daysLeft = newDaysLeft;
        setDrying(dryingArr);
      });
  }, []);

  return (
    <PrivateLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-black text-4xl m-16">Dashboard</h1>
        {curing && salting && drying && (
          <div className="grid grid-cols-2 gap-24 w-full justify-items-center">
            <Card
              details={curing}
              image={"/cure.svg"}
              imageSize={{ width: 100, height: 100 }}
              link={""}
            >
              <DashboardCardDetails salumi={curing} status={"Curing"} />
            </Card>
            <Card
              details={salting}
              image={"/salt.svg"}
              imageSize={{ width: 100, height: 100 }}
              link={""}
            >
              <DashboardCardDetails salumi={salting} status={"Salting"} />
            </Card>
            <Card
              details={drying}
              image={"/dry.svg"}
              imageSize={{ width: 100, height: 100 }}
              link={""}
            >
              <DashboardCardDetails salumi={drying} status={"Drying"} />
            </Card>
          </div>
        )}
      </div>
    </PrivateLayout>
  );
}
