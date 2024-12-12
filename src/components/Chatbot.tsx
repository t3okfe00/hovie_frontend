import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [menu, setMenu] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [conversationState, setConversationState] = useState("");
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    if (isOpen) {
      fetchMenuOptions();
    }
  }, [isOpen]);

  const fetchMenuOptions = async () => {
    const response = await fetch(`${BASE_URL}/chat`, {
      // Changed to use BASE_URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: null,
        userChoice: null,
        conversationState: "mainMenu",
      }),
    });
    const data = await response.json();
    setMessages([{ sender: "bot", text: data.reply }]);
    setMenu(data.menu || []);
    setConversationState(data.conversationState);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    const response = await fetch(`${BASE_URL}/chat`, {
      // Changed to use BASE_URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: input,
        userChoice: null,
        conversationState,
      }),
    });

    const data = await response.json();

    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    setMenu(data.menu || []);
    setConversationState(data.conversationState);
    setInput("");
  };

  const handleOptionClick = async (optionId) => {
    const response = await fetch(`${BASE_URL}/chat`, {
      // Changed to use BASE_URL
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userChoice: optionId,
        query: null,
        conversationState,
      }),
    });

    const data = await response.json();

    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    setMenu(data.menu || []);
    setConversationState(data.conversationState);
  };

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      {isOpen ? (
        <div
          style={{
            width: "300px",
            height: "400px",
            background: "#ffffff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            className="bg-orange-500 text-white px-4 py-2 rounded-t-md cursor-pointer text-center hover:bg-orange-400"
            onClick={() => setIsOpen(false)}
          >
            Close Chatbot
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px 0",
                }}
              >
                <span
                  className={`px-3 py-2 rounded-lg inline-block max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-orange-500 text-black"
                      : "bg-orange-500 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {menu.length > 0 && (
            <div className="p-2 border-t border-gray-200 flex flex-wrap gap-2">
              {menu.map((option) => (
                <button
                  key={option.id}
                  className="p-5 py-1 bg-orange-500 text-sm text-black rounded-md cursor-pointer"
                  onClick={() => handleOptionClick(option.id)}
                >
                  {option.title}
                </button>
              ))}
            </div>
          )}

          <div className="flex p-2 border-t border-gray-300 hover:bg-orange-400">
            <input
              className="text-black flex-1 p-2 border border-gray-300 rounded-md mr-2 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              className="p-2 bg-orange-400 text-black border-none rounded-md cursor-pointer"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          className="p-2 bg-orange-600 text-white rounded-full cursor-pointer w-12 h-12 flex items-center justify-center shadow-md"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
