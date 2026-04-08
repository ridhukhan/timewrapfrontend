import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import toast, { Toaster } from "react-hot-toast";

const Chat = () => {
  const { conversationId } = useParams();
  const { user } = useAuth();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherUser, setOtherUser] = useState(null);

  const bottomRef = useRef(null);
  const fileRef = useRef(null);

  // Messages load
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get(`/message/${conversationId}/messages`);
        setMessages(res.data);

        // Other user বের করো
        const convRes = await axiosInstance.get(`/message/conversation-info/${conversationId}`);
        setOtherUser(convRes.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [conversationId]);

  // Socket — real-time message receive
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      if (message.conversationId === conversationId) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off("newMessage");
  }, [socket, conversationId]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleSend = async () => {
    if (!text.trim() && !media) return;
    setSending(true);

    try {
      const formData = new FormData();
      formData.append("conversationId", conversationId);
      formData.append("text", text);
      if (media) formData.append("media", media);

      const res = await axiosInstance.post("/message/send", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessages((prev) => [...prev, res.data]);

      // Socket দিয়ে emit করো
      socket?.emit("sendMessage", {
        ...res.data,
        conversationId,
      });

      setText("");
      setMedia(null);
      setMediaPreview(null);
    } catch (error) {
      toast.error("Failed to send");
      console.log(error)
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (messageId) => {
    try {
      await axiosInstance.delete(`/message/${messageId}`);
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
    } catch (error) {
      toast.error("Delete failed");
      console.log(error)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <Toaster />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 h-14 flex items-center px-4 gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {otherUser && (
          <>
            <img
              src={otherUser.profilePic || "https://i.pravatar.cc/150?u=" + otherUser._id}
              alt={otherUser.name}
              className="w-8 h-8 rounded-full object-cover border border-zinc-600"
            />
            <div>
              <p className="text-sm font-medium text-white">{otherUser.name}</p>
              <p className="text-xs text-zinc-500">@{otherUser.username}</p>
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 pt-14 pb-24 px-4 overflow-y-auto max-w-2xl mx-auto w-full">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full mt-20">
            <p className="text-zinc-600 text-sm">No messages yet. Say hi!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender._id === user._id || msg.sender === user._id;
            return (
              <div
                key={msg._id}
                className={`flex mb-3 gap-2 ${isMe ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar — other user */}
                {!isMe && (
                  <img
                    src={msg.sender.profilePic || "https://i.pravatar.cc/150?u=" + msg.sender._id}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover self-end flex-shrink-0"
                  />
                )}

                <div className={`flex flex-col gap-1 max-w-xs ${isMe ? "items-end" : "items-start"}`}>

                  {/* Bubble */}
                  <div
                    className={`relative group px-4 py-2 rounded-2xl text-sm leading-relaxed
                      ${isMe
                        ? "bg-sky-500 text-black rounded-br-sm"
                        : "bg-zinc-800 text-white rounded-bl-sm border border-zinc-700"
                      }`}
                  >
                    {/* Text */}
                    {msg.text && <p>{msg.text}</p>}

                    {/* Image */}
                    {msg.mediaType === "image" && (
                      <img
                        src={msg.mediaUrl}
                        alt="media"
                        className="max-w-[200px] rounded-xl mt-1 cursor-pointer"
                        onClick={() => window.open(msg.mediaUrl, "_blank")}
                      />
                    )}

                    {/* Video */}
                    {msg.mediaType === "video" && (
                      <video
                        src={msg.mediaUrl}
                        controls
                        className="max-w-[200px] rounded-xl mt-1"
                      />
                    )}

                    {/* Delete button — hover এ দেখাবে */}
                    {isMe && (
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="absolute -left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Time */}
                  <span className="text-xs text-zinc-600 px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Media preview */}
      {mediaPreview && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 bg-zinc-800 border border-zinc-700 rounded-2xl p-2 flex items-center gap-2">
          {media?.type.startsWith("video") ? (
            <video src={mediaPreview} className="h-16 rounded-xl" />
          ) : (
            <img src={mediaPreview} alt="preview" className="h-16 rounded-xl object-cover" />
          )}
          <button
            onClick={() => { setMedia(null); setMediaPreview(null); }}
            className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Input bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-2">

          {/* Media upload */}
          <button
            onClick={() => fileRef.current?.click()}
            className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:border-sky-500 hover:bg-zinc-700 transition-all flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="hidden"
          />

          {/* Text input */}
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 text-sm"
          />

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={sending || (!text.trim() && !media)}
            className="w-9 h-9 rounded-xl bg-sky-500 hover:bg-sky-400 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;