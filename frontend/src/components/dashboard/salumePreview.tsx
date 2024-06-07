"use client";
import { useEffect, useState } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import Image from "next/image";
import Link from "next/link";
import { ISalumeWithDuration } from "../../interfaces/interfaces";

export default function SalumePreview({
  salume,
  duration,
}: ISalumeWithDuration) {
  const [isActive, setIsActive] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "salume",
    item: { salume: salume },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {}, [salume]);

  return (
    <>
      <li
        key={`salume-${salume.id}`}
        className={`flex w-full items-center ${isDragging ? "hidden" : ""}`}
        ref={drag}
        // onMouseDown={() => {
        //   setIsActive(!isActive);
        // }}
        // onMouseUp={() => {
        //   setIsActive(!isActive);
        // }}
      >
        {salume ? (
          <>
            {isActive ? (
              <Image
                src="/salami.svg"
                width={30}
                height={30}
                alt="drag"
                className=""
              />
            ) : (
              <>
                <Image
                  src="/drag.svg"
                  width={30}
                  height={30}
                  alt="drag"
                  className="invert"
                />
                <div className="flex justify-between ml-4 w-full space-x-8 items-center">
                  <Link href={`/salumi/${salume.id}`}>
                    <li className="text-black text-4xl font-Satisfy">
                      {salume.name}
                    </li>
                  </Link>

                  {duration > 0 ? (
                    <li>{duration.toString()} days left</li>
                  ) : duration === 0 ? (
                    <li className="text-salumeWhite">Ready</li>
                  ) : (
                    <li className="text-red-300">
                      {duration.toString().slice(1)} days ago
                    </li>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <li className="text-black text-4xl font-Satisfy">Loading...</li>
        )}
      </li>
    </>
  );
}
