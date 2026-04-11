import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import FollowButton from "./FollowButton";

const FollowListModal = ({ type, userId, onClose }) => {
  const { user } = useAuth();
  const { onlineUsers } = useSocket();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(`/follow/list/${userId}?type=${type}`);
        setList(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [userId, type]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 h-12 border-b border-zinc-800">
          <h2 className="text-white font-semibold capitalize">{type}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : list.length === 0 ? (
            <p className="text-zinc-500 text-sm text-center py-10">No {type} yet</p>
          ) : (
            list.map((u) => {
              const isOnline = onlineUsers.includes(u._id);
              const isMe = u._id === user?._id;

              return (
                <div
                  key={u._id}
                  className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-all"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={u.profilePic || "https://i.pravatar.cc/150?u=" + u._id}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-zinc-900" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{u.name}</p>
                    <p className="text-zinc-500 text-xs">@{u.username}</p>
                  </div>

                  {!isMe && (
                    <FollowButton
                      targetUserId={u._id}
                      initialFollowing={u.followers?.includes(user?._id)}
                      initialIsFriend={
                        u.followers?.includes(user?._id) &&
                        u.following?.includes(user?._id)
                      }
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default FollowListModal;