import React, { useEffect, useRef, useState } from "react";

function Chatroom() {
  const socket = useRef();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("room");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    socket.current = ws;
    
    socket.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    
    socket.current.onopen = () => {
      socket.current.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: roomId
        }
      }));
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const input = inputRef.current?.value;
    if (input && input.trim()) {
      socket.current.send(JSON.stringify({
        type: "message",
        payload: {
          message: input
        }
      }));
      inputRef.current.value = "";
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Nyte</h1>
          <div className="bg-gray-700 rounded-lg px-4 py-2">
            <p className="text-sm text-gray-300">Room ID: <span className="font-mono font-bold text-blue-400">{roomId}</span></p>
          </div>
        </div>
      </div>
      
      {/* Chat container */}
      <div className="flex-1 flex flex-col max-w-6xl w-full mx-auto p-4">
        {/* Messages area */}
        <div className="flex-1 bg-gray-800 rounded-xl p-4 mb-4 overflow-y-auto max-h-[calc(100vh-180px)]">
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 py-12">
                <p className="text-xl">No messages yet</p>
                <p className="text-sm">Start the conversation!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div 
                  key={index} 
                  className="bg-gray-700 py-2 px-4 rounded-xl text-white max-w-[80%] break-words"
                >
                  {message}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Input area */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            ref={inputRef} 
            className="flex-1 border border-gray-700 bg-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..." 
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={sendMessage}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-3 px-6 font-medium transition-all duration-200 sm:w-auto w-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatroom;