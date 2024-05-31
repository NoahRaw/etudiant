import React from "react";
import Avatar from "../chatList/Avatar";

const ChatItem = (props) => {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item${props.user}`}
    >
      <div className={`chat__item__content${props.user}`}>
        <div className="chat__msg">{props.msg}</div>
        <div className="chat__meta">
          <span>Sent {props.timestamp}</span>
        </div>
      </div>
      {props.image && <Avatar isOnline="active" image={props.image} />}
    </div>
  );
};

export default ChatItem;
