import React from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";

const ChatBody = ({otherId,setOtherId,isConnected,setCurrentComponent}) => {

    return (
      <div className="main__chatbody">
      {isConnected===true && (
      <div className="main__chatbody">
        <ChatList setOtherId={setOtherId}/>
        {otherId.userId && <ChatContent otherId={otherId}/>}
        {otherId.userId && <UserProfile otherId={otherId}/>}
      </div>
    )};
    {isConnected===false && setCurrentComponent('login')}
    </div>
    )
}

export default ChatBody;
