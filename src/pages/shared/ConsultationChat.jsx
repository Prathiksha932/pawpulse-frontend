import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getConsultation, getMessageHistory } from '../../api/consultationApi';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';

const ConsultationChat = () => {
  const { id: consultationId } = useParams();
  const { socket, isConnected } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const bottomRef = useRef(null);

  const { data: consultation } = useQuery({
    queryKey: ['consultation', consultationId],
    queryFn: () => getConsultation(consultationId),
  });

  const { data: history, isLoading: loadingHistory } = useQuery({
    queryKey: ['messages', consultationId],
    queryFn: () => getMessageHistory(consultationId, { limit: 50 }),
    enabled: !!consultationId,
  });

  useEffect(() => {
    if (history?.messages) setMessages(history.messages);
  }, [history]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.emit('join-consultation', consultationId);

    const handleNewMessage = (msg) => {
      if (msg.consultationId === consultationId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on('new-message', handleNewMessage);

    return () => {
      socket.off('new-message', handleNewMessage);
    };
  }, [socket, isConnected, consultationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim() || !socket) return;
    socket.emit('send-message', { consultationId, content: draft.trim() });
    setDraft('');
  };

  if (loadingHistory) return <p>Loading conversation...</p>;

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-xl bg-white shadow">
      <div className="border-b p-4">
        <p className="font-semibold text-gray-900">
          Consultation — {consultation?.animalId?.name}
        </p>
        <p className="text-xs text-gray-500">{isConnected ? '● Connected' : '○ Connecting...'}</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => {
          const isMine = msg.senderId === user._id || msg.senderId?._id === user._id;
          return (
            <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                  isMine ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2 border-t p-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={!isConnected}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ConsultationChat;