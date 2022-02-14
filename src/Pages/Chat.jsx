import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { v4 as uuid } from "uuid";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { firestore } from "../firebase_config/firebase";
import { getRequiredDocument } from "../function/getList";
import ChatScreen from "../components/ChatScreen";
function Chat() {
  const { uid } = useParams();
  const userRef = firestore.collection("Users").doc(uid);
  const [data] = useDocumentData(userRef);
  const [docId, setDocId] = useState("");
  useEffect(() => {
    firestore
      .collection("Chats")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          getRequiredDocument(doc.data(), localStorage.getItem("myUid"), uid) &&
            setDocId(doc.id);
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dummy = useRef();
  const [formValue, setFormValue] = useState("");
  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    let messageObject = {
      id: uuid(),
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      senderId: localStorage.getItem("myUid"),
      receiverId: uid,
    };
    firestore
      .collection("Chats")
      .doc(docId)
      .collection("messages")
      .doc(uuid())
      .set(messageObject)
      .then(() => {
        setFormValue("");
        scrollToBottom();
      });
  };
  return (
    <>
      {docId !== "" ? (
        <>
          <header
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={data?.photoURL}
              alt={data?.displayName}
              style={{ borderRadius: "50%" }}
            />
            <p style={{ color: "white", marginLeft: "20px" }}>
              {data?.displayName}
            </p>
          </header>
          <div>
            <div>
              <main>
                <ChatScreen docId={docId} />
                <div ref={dummy}></div>
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

export default Chat;
