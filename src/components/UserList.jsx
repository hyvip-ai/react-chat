import React from "react";
import UserCard from "./UserCard";

function UserList({ users }) {
  return (
    <>
      {users?.map(function (user) {
        return <UserCard key={user.uid} user={user} />; 
      })}
    </>
  );
}

export default UserList;
