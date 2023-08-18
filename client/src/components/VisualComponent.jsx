import React, { useEffect, useState } from "react";
import { CgArrowUp } from "react-icons/cg";
import { io } from "socket.io-client";

const VisualComponent = (props) => {
  // state's of the colors
  const [greenUp, setGreenUp] = useState(false);
  const [greenDown, setGreenDown] = useState(false);
  const [blueDown, setBlueDown] = useState(false);
  const [blueUp, setBlueUp] = useState(false);
  const { Altitude, HIS, ADI } = props.data;
  let adi = Number(ADI); // Convert ADI to number

  // Listening to the ADI change and changing the colors accordingly
  useEffect(() => {
    if (adi === -100) {
      setGreenUp(true);
      setGreenDown(true);
      setBlueUp(false);
      setBlueDown(false);
    } else if (adi === 100) {
      setBlueDown(true);
      setBlueUp(true);
      setGreenDown(false);
      setGreenUp(false);
    } else if (adi === 0) {
      setBlueUp(true);
      setBlueDown(false);
      setGreenDown(true);
      setGreenUp(false);
    } else if (adi !== 100 && adi && -100 && adi !== 0) {
      setBlueUp(false);
      setBlueDown(false);
      setGreenDown(false);
      setGreenUp(false);
    }
  }, [adi]);

  // Divide by the value obtained to move the line
  let alt = Altitude / 10;
  if (alt === 300) {
    alt = 290;
  }
  return (
    <div className="text-white flex justify-between items-center  w-[700px]">
      {/* Introducing Altitude */}
      <div className="m-5 text-lg text-center relative  font-medium w-[50px] h-[300px] border-[3px] bg-slate-400 text-black  ">
        <div className="h-[33.3%]">3000</div>
        <div className="h-[33.3%]">2000</div>
        <div className="h-[33.3%]">1000</div>
        <div
          className={"w-[45px] border-black border-[4px] absolute"}
          style={{ bottom: `${alt}px` }} // The position of the line according to the height
        ></div>
      </div>

      {/* Introducing HIS With rotate */}
      <div className=" relative w-[0px] h-[200px]">
        <CgArrowUp
          color="black"
          className="text-8xl z-10  absolute top-[25%] left-[115px]"
        />
      </div>
      <div className="bg-slate-700 h-[250px] w-[250px] rounded-full flex justify-center items-center">
      <div
        style={{ rotate: `${HIS - 360}deg` }} // Setting the rotation angle according to the HIS value
        className="rotate- border-4 relative  text-black font-bold justify-center items-center pb-7 text-lg  bg-slate-400 rounded-full w-[200px] h-[200px]"
      >
        <div className="h-[50%] items-start justify-center flex">0</div>
        <div className="flex justify-between  ">
          <div className="pl-1">270</div>
          <div className="pr-1">180</div>
        </div>
        <div className="h-[50%] items-end  justify-center flex">
          <p>90</p>
        </div>
      </div>
      </div>

      {/* Introducing ADI */}
      <div className="bg-slate-700 h-[250px] w-[250px] rounded-full flex justify-center items-center">
      <div
        className={`text-black text-center  border-4 rounded-full w-[200px] h-[200px]`}
      >
        <div
          className={`relative rounded-t-full ${blueUp && "bg-blue-500"}  ${
            greenUp && "bg-green-500"
          } h-[50%]`}
        >
          {" "}
        </div>
        <div
          dir="rtl"
          className={` ${blueUp && "bg-blue-500"}  ${
            greenDown && "bg-green-500"
          } rounded-b-full h-[50%]`}
        ></div>
      </div>
      </div>
    </div>
  );
};

export default VisualComponent;
