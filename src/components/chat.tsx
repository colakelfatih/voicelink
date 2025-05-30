'use client';

import { useState } from 'react';

interface ChatProps {
  roomName: string;
  username: string;
}

export function Chat({ roomName, username }: ChatProps) {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // TODO: Implement message sending logic
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat</h2>
        <p className="text-sm text-gray-500">Room: {roomName}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Messages will be displayed here */}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 