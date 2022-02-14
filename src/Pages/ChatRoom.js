import React, { useEffect, useState } from "react";
import SignOut from "../components/SignOut";
import { firestore } from "../firebase_config/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getUpdatedList } from "../function/getList";
import UserList from "../components/UserList";
import Room from "../components/Room";
function ChatRoom({ authenticated }) {
  const userRef = firestore.collection("Users");
  const [users] = useCollectionData(userRef);
  const [visibleUsers, setVisibleUsers] = useState([]);
  useEffect(() => {
    if (users?.length) {
      setVisibleUsers(getUpdatedList(authenticated, users));
    }
  }, [users, authenticated]);
  return (
    <>
      <div className="userList">
        <UserList users={visibleUsers} />
      </div>
      <Room authenticated={authenticated} />
      <SignOut />
    </>
  );
}

export default ChatRoom;
