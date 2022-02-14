import React from "react";
import { useNavigate } from "react-router-dom";
function RoomCard({ roomData, authenticated }) {
  const navigate = useNavigate();
  const clickHandler = (id) => {
    navigate(`/room/${id}`);
  };
  return (
    <>
      {roomData.map((room) => {
        return (
          <button
            style={{ margin: "5px" }}
            className="btn btn-info"
            key={room.id}
            onClick={()=>clickHandler(room.id)}
          >
            {room.name}
          </button>
        );
      })}
    </>
  );
}

export default RoomCard;
