import React, { useState, useEffect } from "react";

import axios from "axios";
import RoomChat from "../roomChat/roomChat";

// Assuming you have a ChatRoom component

// Define an interface representing the shape of a chat object
interface Chat {
  room_chat_id: number;
  dokter_id: number;
  customer_id: number;
  room_chat_createdAt: string;
  room_chat_updatedAt: string;
  customer_name: string;
  message: string;
  message_createdAt: string;
  message_updatedAt: string;
  dokter_name: string;
  customer_email: string;
}

function Messages() {
  const [chats, setChats] = useState<Chat[]>([]); // Provide the Chat[] type
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [customerId, setCustomerId] = useState(0);
  const [dokterId, setDokterId] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");
  const [roomChatId, setRoomChatId] = useState(Number)

  useEffect(() => {
    // Fetch data from the API endpoint
    const dokterId = localStorage.getItem("dokterId");
    axios
      .post("http://localhost:8000/Message/ChatList", {
        // Auth: isLoggedIn,

        Auth: "",
        // customerId: 1,
        dokterId: parseInt(dokterId ?? ""),
      })
      .then((response) => {
        setChats(response.data.data.chatList);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error, display error message, or provide user feedback
      });
  }, []); // Run this effect only once, on component mount

  // Event handler for selecting a chat room
  const handleChatSelect = (
    chatId: number,
    customerId: number,
    customer_email: string,
    roomChatId: number
  ) => {
    setSelectedChatId(chatId);
    setCustomerId(customerId);
    setCustomerEmail(customer_email);
    setRoomChatId(roomChatId);
  };

  
  return (
    <>
      <div className="mt-6"></div>
      <div className="flex flex-col px-[120px] h-screen py-[120px] justify-center content-center ">
        <div className="font-poppins font-bold text-4xl leading-loose">
          Chat
        </div>

        <div className="container mx-auto h-[41.75rem] border w-full  rounded-xl">
          <div className="flex  h-full">
            {/* Chat List */}
            <div className="h-full">
              <div className="flex flex-col w-80 h-[465px] bg-white border  overflow-hidden rounded-tl-[12px] rounded-bl-[12px]">
                <div className="bg-gray-100 px-4 py-2">
                  <h2 className="text-lg font-bold">Chat List</h2>
                </div>
                <div className="divide-y divide-gray-300 overflow-y-auto">
                  {chats.length > 0 ? (
                    chats.map((chat) => (
                      <div
                        key={chat.room_chat_id}
                        className="p-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          handleChatSelect(
                            chat.room_chat_id,
                            chat.customer_id,
                            chat.customer_email,
                            chat.room_chat_id
                          )
                        }>
                        <div className="mb-2">
                          <h2 className="text-lg font-bold">
                            {chat.customer_name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {chat.message}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {chat.message_createdAt}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="p-4 text-gray-500">No chats available</p>
                  )}
                </div>
              </div>
            </div>
            {/* Selected Chat */}
            <div className="flex w-full h-full">
              <RoomChat
                customerId={customerId}
                customer_email={customerEmail}
                roomChatId={roomChatId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
