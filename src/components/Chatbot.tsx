// // src/components/Chatbot.js
// import React, { useState } from "react";

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");

//     const handleSend = async () => {
//         if (!input.trim()) return;

//         // Add user message
//         const newMessages = [...messages, { sender: "user", text: input }];
//         setMessages(newMessages);

//         // Send message to the backend
//         const response = await fetch("http://localhost:3000/chat", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ message: input }),
//         });

//         const data = await response.json();

//         // Add bot response
//         setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
//         setInput("");
//     };

//     return (
//         <div style={{ maxWidth: "400px", margin: "0 auto", border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
//             <div style={{ height: "300px", overflowY: "auto", border: "1px solid #eee", marginBottom: "10px", padding: "5px" }}>
//                 {messages.map((msg, idx) => (
//                     <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
//                         <span style={{ background: msg.sender === "user" ? "#daf1da" : "#f1f1f1", padding: "5px 10px", borderRadius: "10px" }}>
//                             {msg.text}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <input
//                     style={{ width: "calc(100% - 60px)", padding: "5px" }}
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Type a message"
//                 />
//                 <button style={{ width: "50px", padding: "5px" }} onClick={handleSend}>
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Chatbot;



// src/components/Chatbot.js
import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // To toggle the chatbot popup

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Send message to the backend
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    // Add bot response
    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
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
            style={{
              background: "orange",
              color: "black",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => setIsOpen(false)} // Close the chatbot
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
                  style={{
                    background: msg.sender === "user" ? "#FFA500" : "#FFA500",
                    color: msg.sender === "user" ? "#000" : "#333",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    display: "inline-block",
                    maxWidth: "80%",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #eee" }}>
            <input
              style={{
                color:"black",
                flex: 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginRight: "10px",
                outline: "none",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              style={{
                padding: "10px",
                background: "#FFA500",
                color: "black",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          style={{
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => setIsOpen(true)} // Open the chatbot
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
