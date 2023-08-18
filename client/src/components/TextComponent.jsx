import React from "react";

const TextComponent = (props) => {
  const { Altitude, HIS, ADI } = props.data; // Receiving the parameters sent to the component

  return (
    // The data display in text
    <div className=" text-2xl h-[200px] w-[700px] p-3">
      <div className="flex justify-center">
      <div className="mr-10">
        <h1 className="font-bold">Altitude : <span className="font-normal">{ Altitude }</span></h1>
      </div>
      <div className="mr-10">
        <h1 className="font-bold">HIS : <span className="font-normal">{HIS}</span></h1>
      </div>
      <div>
        <h1 className="font-bold">ADI : <span className="font-normal">{ADI}</span></h1>
      </div>
      </div>
      <div className="mt-5 text-center">
        <h1>Press any key</h1>
      </div>
      <div className="mt-3 text-center">
        <h1>-Sending Data </h1>
      </div>
    </div>
  );
};

export default TextComponent;
