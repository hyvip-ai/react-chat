import React, { useRef, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase_config/firebase";
import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import GroupMessageList from "../components/GroupMessageList";
function GroupChat({ authenticated }) {
  const { roomId } = useParams();
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();
  const sendMessage = (e) => {
    e.preventDefault();
    let messageObj = {
      id: uuid(),
      text: formValue,
      senderId: localStorage.getItem("myUid"),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      senderName: authenticated.displayName,
      photoURL: authenticated.photoURL,
    };
    console.log(messageObj);
    firestore
      .collection("Rooms")
      .doc(roomId)
      .collection("messages")
      .add(messageObj)
      .then(() => {
        setFormValue("");
        console.log("Message Added");
        scrollToBottom()
      });
  };
  const roomRef = firestore.collection("Rooms").doc(roomId);
  const [roomData, loading] = useDocumentData(roomRef);
  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {!loading ? (
        <>
          <header
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ color: "white" }}>{roomData.name}</h1>
          </header>
          <div>
            <div>
              <main>
                <GroupMessageList docId={roomId} />
                <div style={{marginTop:"15px"}} ref={dummy}></div>
              </main>
            </div>

            <form>
              <input
                placeholder="Let's Talk"
                autoComplete="off"
                type="text"
                id="myMsg"
                value={formValue}
                onInput={(e) => {
                  setFormValue(e.target.value);
                }}
              />
              <button
                type="submit"
                onClick={sendMessage}
                disabled={formValue === "" ? true : false}
              >
                &#9992;
              </button>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
}

export default GroupChat;
