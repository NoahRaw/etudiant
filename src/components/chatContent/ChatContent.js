import React, { useState, useEffect, useRef } from "react";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";

const ChatContent = ({ otherId }) => {
  const messagesEndRef = useRef(null);
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://messagebackendvoitureoccasion-production-b056.up.railway.app/api/chat/ListMessage?otherUserId=${otherId.userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setChat(data);
        } else {
          console.error("Erreur lors de la requête HTTP:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête HTTP:", error);
      }
      finally
      {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, otherId]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        createNewMessage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    scrollToBottom();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat, msg]);

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  const webService = async (message) => 
  {
      // Appel du service web pour enregistrer le message
      try {
        const response = await fetch(`https://messagebackendvoitureoccasion-production-b056.up.railway.app/api/chat?userToSend=${otherId.userId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: message }),
        });

        if (!response.ok) {
          console.error("Erreur lors de la requête HTTP:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête HTTP:", error);
      }
  }

  const createNewMessage = () => {
    if (msg !== "") {
      const newChatItem = {
        key: chat.length + 1,
        type: "",
        msg: msg,
        image: otherId.image,
      };

      // Envoyer le nouveau message au serveur ici si nécessaire

      const updatedChat = [...chat, newChatItem];
      setChat(updatedChat);
      scrollToBottom();
      webService(msg);
      setMsg("");
    }
  };

  const handleSendButtonClick = () => {
    createNewMessage();
  };

  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar isOnline="active" image={otherId.image} />
            <p>{otherId.name}</p>
          </div>
        </div>

        <div className="blocks">
          <div className="settings">
            <button className="btn-nobg">
              <i className="fa fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      <div ref={messagesEndRef} />
      <div className="content__body">
      {loading === true && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src="Loading_2.gif" alt="Loading..." />
                  </div>
                )}
        <div className="chat__items">
          {chat.map((itm, index) => (
            <ChatItem
              animationDelay={index + 2}
              key={itm.key}
              user={itm.type}
              msg={itm.msg}
              image={itm.image}
              timestamp={itm.timestamp}
            />
          ))}
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={msg}
          />
          <button className="btnSendMsg" id="sendMsgBtn" onClick={handleSendButtonClick}>
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
