import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { firestore } from "../firebase_config/firebase";
import { chatExist } from "../function/getList";
import { v4 as uuid } from "uuid";
function UserCard({ user }) {
  const navigate = useNavigate();
  const chatRef = firestore.collection("Chats");
  const [chatData, loading] = useCollectionData(chatRef);
  const createChat = () => {
    let chatId = uuid()
    firestore
      .collection("Chats")
      .doc(chatId)
      .set({
        id:chatId,
        users: [localStorage.getItem("myUid"), user.uid],
      });
    myNavigate();
  };
  const myNavigate = () => {
    navigate(`/chat/${user.uid}`);
  };
  const clickHandler = () => {
    if (loading) {
      alert("ChatData Undefined");
      return;
    }
    chatExist(chatData, localStorage.getItem("myUid"), user.uid)
      ? myNavigate()
      : createChat();
  };
  return (
    <>
      <div className="card" style={{ width: "250px", margin: "5px" }}>
        <img
          src={user.photoURL}
          alt={user.displayName}
          height={96}
          width={96}
          style={{ borderRadius: "50%" }}
        />

        <div className="card-body">
          <p>Name : {user.displayName}</p>
          <p>Email : {user.email}</p>
          <button onClick={clickHandler} className="btn btn-outline-danger">
            Start Chat
          </button>
        </div>
      </div>
      )
    </>
  );
}

export default UserCard;
