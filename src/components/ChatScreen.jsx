import React, { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase_config/firebase";
import ChatList from "./ChatList";

function ChatScreen({ docId, scrollToBottom }) {
 
  const messageRef = firestore
    .collection("Chats")
    .doc(docId)
    .collection("messages");
  const messageQuery = messageRef.orderBy("createdAt", "asc");
  const [messages, loading] = useCollectionData(messageQuery);
  useEffect(() => {
    scrollToBottom();
  }, [messages,scrollToBottom]);
  return <>{!loading ? <ChatList chats={messages} /> : null}</>;
}

export default ChatScreen;
