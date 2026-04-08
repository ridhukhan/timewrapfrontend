import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useSocket } from "../context/SocketContext";

const InboxDrawer = ({ onClose }) => {

  const { onlineUsers } = useSocket();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/message/users");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUserClick = async (userId) => {
    try {
      const res = await axiosInstance.get(`/message/conversation/${userId}`);
      navigate(`/chat/${res.data._id}`);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-80 bg-zinc-900 border-l border-zinc-800 z-50 flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-zinc-800">
          <h2 className="text-white font-semibold tracking-wide">Messages</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center mt-10">No users found</p>
          ) : (
            users.map((u) => {
              const isOnline = onlineUsers.includes(u._id);
              return (
                <button
                  key={u._id}
                  onClick={() => handleUserClick(u._id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 transition-all border-b border-zinc-800/50"
                >
                  {/* Avatar with online indicator */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={u.profilePic || "https://i.pravatar.cc/150?u=" + u._id}
                      alt={u.name}
                      className="w-11 h-11 rounded-full object-cover border border-zinc-700"
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col items-start">
                    <span className="text-white text-sm font-medium">{u.name}</span>
                    <span className="text-zinc-500 text-xs">@{u.username}</span>
                  </div>

                  {/* Online text */}
                  {isOnline && (
                    <span className="ml-auto text-xs text-green-400">online</span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default InboxDrawer;