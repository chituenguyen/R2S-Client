import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import mqtt from 'mqtt';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
}

function ChatPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClose = () => {
    if (client) {
      client.end(true); // Force immediate disconnect
      setClient(null);
    }
    setIsOpen(false);
    setMessages([]);
    setNewMessage('');
    setIsConnecting(false);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsConnecting(true);
    const topic = 'r2s';
    
    // Fixed MQTT client configuration
    const mqttUrl = 'wss://devapi.uniscore.vn:443/mqtt';
    const options = {
      username: 'football',
      password: 'football123',
      reconnectPeriod: 0, // Disable automatic reconnection
      connectTimeout: 5000, // 5 second timeout
      clean: true // Start with a clean session
    };

    // Create MQTT client with correct configuration
    const mqttClient = mqtt.connect(mqttUrl, options);

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      setIsConnecting(false);
      mqttClient.subscribe(topic, (err) => {
        if (err) console.error('Subscribe error:', err);
        else console.log('Subscribed to r2s topic');
      });
    });

    mqttClient.on('message', (topic, payload) => {
      const newMessage = {
        id: Date.now().toString(),
        text: payload.toString(),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT error:', err);
      setIsConnecting(false);
    });

    mqttClient.on('close', () => {
      setIsConnecting(false);
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end(true);
        setClient(null);
      }
    };
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !newMessage.trim() || isConnecting) return;

    client.publish('r2s', newMessage);
    setNewMessage('');
  };

  return (
    <div className="fixed bottom-20 right-4 flex flex-col items-end">
      {/* Chat Icon Button */}
      <button
        onClick={() => isOpen ? handleClose() : setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 ease-in-out"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Chat Room {isConnecting && <span className="text-sm">(Connecting...)</span>}
            </h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-gray-100 rounded-lg p-3 break-words"
              >
                <p className="text-gray-800">{message.text}</p>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                disabled={isConnecting}
              />
              <button
                type="submit"
                className={`${
                  isConnecting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white rounded-lg px-4 py-2 transition-colors duration-200`}
                disabled={isConnecting}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatPage;