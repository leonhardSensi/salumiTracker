import { modalData } from "../../../atoms/modalAtoms";
import { useRecoilState } from "recoil";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css/pagination";

export default function ModalDetails() {
  const [modalDetails, setModalDetails] = useRecoilState(modalData);
  console.log(modalDetails.info?.data);
  return (
    <div className="flex items-center">
      <Image
        src={"/arrow.svg"}
        alt={"prev-arrow"}
        width={50}
        height={50}
        className="image-swiper-button-prev rotate-180 cursor-pointer"
      />
      <Swiper
        modules={[Pagination, Navigation]}
        className="w-full swiper-container"
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        pagination={{
          type: "progressbar",
        }}
      >
        {modalDetails.info &&
          modalDetails.info.recipeSteps.map((step, index) => {
            return (
              <SwiperSlide className="p-14" key={`step-${index}`}>
                <div className="">
                  <div className="flex flex-col justify-start text-black">
                    <h4 className="text-2xl underline font-semibold">
                      {step.name}
                    </h4>
                    {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="50px"
                  height="50px"
                  className="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                  //   xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <g>
                    <path
                      className="opacity:0.577"
                      fill="#f"
                      d="M 13.5,3.5 C 14.552,3.35055 15.552,3.51722 16.5,4C 23.4145,10.41 29.7479,17.2433 35.5,24.5C 29.7479,31.7567 23.4145,38.59 16.5,45C 15.552,45.4828 14.552,45.6495 13.5,45.5C 13.3505,44.448 13.5172,43.448 14,42.5C 20.0149,36.6521 25.8482,30.6521 31.5,24.5C 25.8482,18.3479 20.0149,12.3479 14,6.5C 13.5172,5.55198 13.3505,4.55198 13.5,3.5 Z"
                    />
                  </g>
                </svg> */}

                    <p>{/* Step {index + 1}/{modalDetails.data.length} */}</p>
                    <h5 className="text-xl mt-8"> Duration: </h5>
                    <p>
                      {step.duration ? step.duration : step.statusDuration}
                      {step.duration ? "minutes" : "days"}
                    </p>
                    <h5 className="text-xl mt-8"> Description: </h5>
                    <p>{step.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <Image
        src={"/arrow.svg"}
        alt={"next-arrow"}
        width={50}
        height={50}
        className="image-swiper-button-next cursor-pointer"
      />
    </div>
  );
}
