import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase_config/firebase";
import ChatList from "./ChatList";

function ChatScreen({ docId }) {
  const messageRef = firestore
    .collection("Chats")
    .doc(docId)
    .collection("messages");
    const messageQuery = messageRef.orderBy('createdAt','asc')
  const [messages, loading] = useCollectionData(messageQuery);
  return <>{!loading ? <ChatList chats={messages} /> : null}</>;
}

export default ChatScreen;
