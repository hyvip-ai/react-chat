import moment from "moment";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase_config/firebase";

function GroupMessageList({ docId }) {
  const messageRef = firestore
    .collection("Rooms")
    .doc(docId)
    .collection("messages");
    const messagesQuery = messageRef.orderBy('createdAt','asc');
  const [messages, loading] = useCollectionData(messagesQuery);
  return (
    <>
      {!loading ? (
        <>
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={
                  message.senderId === localStorage.getItem("myUid")
                    ? "sent"
                    : "received"
                }
              >
                <div className="senderData">
                    <strong>{message.senderName}</strong>
                  <img src={message.photoURL} alt={message.senderName} />
                </div>
                <p>
                  {message.text}
                  <br />
                  <span className="time">
                    {message.createdAt
                      ? moment(message.createdAt.seconds * 1000).format("LT")
                      : ""}
                  </span>
                </p>
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
}

export default GroupMessageList;
