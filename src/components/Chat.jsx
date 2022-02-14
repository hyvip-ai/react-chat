import moment from "moment";
import React from "react";

function Chat({ chat }) {
  let className =
    chat.senderId === localStorage.getItem("myUid") ? "sent" : "received";
  return (
    <>
      {chat ? (
        <div className={className}>
          <p>
            {chat.text}
            <br />
            <span className="time">
            {chat.createdAt?moment(chat.createdAt.seconds * 1000).format("LT"):""}
            </span>
          </p>
        </div>
      ) : null}
    </>
  );
}

export default Chat;
