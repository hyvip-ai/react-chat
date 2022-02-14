import React, { useEffect, useState } from "react";
import { firestore } from "../firebase_config/firebase";
import { v4 as uuid } from "uuid";
import { useCollectionData } from "react-firebase-hooks/firestore";
import RoomCard from "./RoomCard";
function Room({ authenticated }) {
  const [room, setRoom] = useState("");
  const roomRef = firestore.collection("Rooms");
  const [roomData, loading] = useCollectionData(roomRef);
  const clickHandler = () => {
    let roomObject = {
      id: uuid(),
      name: room,
      users: [],
    };
    console.log(roomObject);
    firestore
      .collection("Rooms")
      .doc(roomObject.id)
      .set(roomObject)
      .then(() => {
        setRoom("")
      });
  };
  useEffect(()=>{
    if(!loading){
      console.log(roomData)
    }
  },[roomData, loading])
  return (
    <div className="room">
      <div>
        <h1>Rooms</h1>
        {
          !loading?<RoomCard roomData={roomData} authenticated={authenticated} />:null
        }
      </div>
      <form>
        <input
          type="text"
          placeholder="Enter a Room Name..."
          value={room}
          onInput={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button
          disabled={room === ""}
          type="button"
          className="btn btn-primary"
          onClick={clickHandler}
        >
          Create A Room
        </button>
      </form>
    </div>
  );
}

export default Room;
