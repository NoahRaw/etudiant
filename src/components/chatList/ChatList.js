import React, { useState, useEffect } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";

const ChatList = ({ setOtherId }) => {
  const [allChats, setAllChats] = useState([]);
  const [allChatsOriginal, setAllChatsOriginal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearch = () => {
    const filteredChats = searchInJsonData(searchTerm);
    setAllChats(filteredChats);
  };

  const searchInJsonData = (searchTerm) => {
    return allChatsOriginal.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Fonction asynchrone pour effectuer la requête HTTP
    const fetchData = async () => {
      try {
        // Remplacez 'YOUR_API_URL' par l'URL réelle de votre service web
        const response = await fetch(
          "https://messagebackendvoitureoccasion-production-b056.up.railway.app/api/chat/ListConversation",
          {
            method: "GET",
            headers: {
              // Remplacez 'YOUR_TOKEN' par le véritable token requis par votre service
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAllChats(data); // Met à jour le state avec les données reçues
          setAllChatsOriginal(data);
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

    // Appel de la fonction fetchData
    fetchData();
  }, [authToken]); // Le tableau vide signifie que cela ne dépend d'aucune autre dépendance

  return (
    <div className="main__chatlist">
      <div className="chatlist__heading">
        <h2>Chats</h2>
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input
            type="text"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button className="search-btn" onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      {loading === true && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src="Loading_2.gif" alt="Loading..." />
                  </div>
                )}
      <div className="chatlist__items">
        {allChats.map((item, index) => {
          return (
            <ChatListItems
              item={item}
              name={item.name}
              key={item.userId}
              userId={item.userId}
              animationDelay={index + 1}
              active={item.active ? "active" : ""}
              isOnline={item.online ? "active" : ""}
              image={item.image}
              setOtherId={setOtherId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;