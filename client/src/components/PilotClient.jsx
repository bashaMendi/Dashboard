import React, { useEffect, useState } from "react";
import TextComponent from "./TextComponent"; 
import VisualComponent from "./VisualComponent"; 
import { io } from "socket.io-client";

const PilotClient = () => {
  const socket = io("http://localhost:3001"); // Connection to the socket.io server according to the address
  const [isTextMode, setIsTextMode] = useState(false); // state to manage the display state
  const [receivedData, setReceivedData] = useState({ // Saving data from the server
    ADI: 0,
    Altitude: 0,
    HIS: 0,
  });

  // Listening for changes from the socket
  useEffect(() => {
    socket.on("send_data", (data) => {
      setReceivedData(data);
    });
  }, [socket]);

  return (
    <div className="w-[80%] mx-auto">
      <div className="w-[80%] h-[150px] mx-auto font-bold text-slate-700 flex justify-center items-center text-4xl">Dashboard</div>
      {/* button Visual */}
      <div className="w-[100%] flex justify-center">
          <button
            onClick={() => {
              setIsTextMode(false);
            }}
            className={`border rounded-md bg-slate-400 m-2 w-[60px] h-[40px] ${
              !isTextMode && "bg-blue-500 text-white"
            }`}
          >
            Visual
          </button>
          {/* button Text */}
          <button
            onClick={() => {
              setIsTextMode(true);
            }}
            className={`bg-slate-400 w-[60px] h-[40px] border rounded-md m-2 ${
              isTextMode && "bg-blue-500 text-white"
            }`}
          >
            Text
          </button>
        </div>
      <div className="w-[100%] flex justify-center mt-5">
        {/* Displaying the view according to the state */}
        <div className="p-3">
          {isTextMode ? <TextComponent data={receivedData} /> : <VisualComponent data={receivedData} />}
        </div>
      </div>
    </div>
  );
};

export default PilotClient;
{/* Buttons for selecting a display */}