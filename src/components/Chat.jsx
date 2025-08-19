import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaPaperPlane, FaUserCircle, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  const fetchTargetUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${targetUserId}`, {
        withCredentials: true,
      });
      setTargetUser(res.data.user); // Assuming the backend returns { user: { firstName, lastName } }
    } catch (err) {
      console.error("Error fetching target user:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
    fetchTargetUser();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Chat Header */}
        <div className="bg-base-300 border-b border-base-300 p-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle hover:bg-base-200"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full bg-gradient-to-r from-primary to-secondary">
                <FaUserCircle className="w-8 h-8 mx-auto mt-1 text-base-100" />
              </div>
            </div>
            <div>
              {/* <h2 className="font-semibold text-lg">Chat</h2> */}
              <h2 className="font-semibold text-lg">
                {targetUser
                  ? `${targetUser.firstName} ${targetUser.lastName}`
                  : "Chat"}
              </h2>
              <p className="text-sm text-gray-400">Active now</p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
          {messages.map((msg, index) => {
            const isOwnMessage = user.firstName === msg.firstName;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-2xl p-4 shadow-md ${
                    isOwnMessage
                      ? "bg-primary text-primary-content"
                      : "bg-base-100 border border-base-300"
                  }`}
                >
                  {!isOwnMessage && (
                    <div className="text-sm font-semibold mb-1 text-primary">
                      {msg.firstName} {msg.lastName}
                    </div>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <div
                    className={`text-xs mt-2 ${
                      isOwnMessage ? "text-primary-content/70" : "text-gray-400"
                    }`}
                  >
                    Just now
                  </div>
                </div>
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-base-300 border-t border-base-300 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="input input-bordered w-full pr-12 focus:ring-2 focus:ring-primary"
              />
            </div>
            <motion.button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              whileTap={{ scale: 0.95 }}
              className={`btn btn-primary btn-circle ${
                !newMessage.trim() ? "btn-disabled" : ""
              }`}
            >
              <FaPaperPlane />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
