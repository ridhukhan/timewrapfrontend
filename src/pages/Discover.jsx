import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import FollowButton from "../components/FollowButton";

const Discover = () => {
  const { user } = useAuth();
  const { onlineUsers } = useSocket();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 h-14 flex items-center px-4 gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-all flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white font-semibold">Discover People</h1>
      </div>

      <div className="pt-14 max-w-xl mx-auto px-4 py-4">

        {/* Search */}
        <div className="relative mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people..."
            className="w-full bg-zinc-800 border border-zinc-700 focus:border-sky-400 focus:outline-none rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-zinc-500 text-sm"
          />
        </div>

        {/* User list */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center mt-10">No users found</p>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((u) => {
              const isOnline = onlineUsers.includes(u._id);

              // ✅ fix — ObjectId toString() দিয়ে compare
              const isFollowing = u.followers?.some(
                (f) => (f._id || f).toString() === user?._id?.toString()
              );
              const isFriend =
                u.followers?.some(
                  (f) => (f._id || f).toString() === user?._id?.toString()
                ) &&
                u.following?.some(
                  (f) => (f._id || f).toString() === user?._id?.toString()
                );

              return (
                <div
                  key={u._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={u.profilePic || "https://i.pravatar.cc/150?u=" + u._id}
                      alt={u.name}
                      className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                    />
                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{u.name}</p>
                    <p className="text-zinc-500 text-xs truncate">@{u.username}</p>
                    {u.bio && (
                      <p className="text-zinc-400 text-xs mt-0.5 truncate">{u.bio}</p>
                    )}
                    <div className="flex gap-3 mt-1">
                      <span className="text-zinc-600 text-xs">
                        <span className="text-zinc-400 font-medium">{u.followers?.length || 0}</span> followers
                      </span>
                      <span className="text-zinc-600 text-xs">
                        <span className="text-zinc-400 font-medium">{u.following?.length || 0}</span> following
                      </span>
                    </div>
                  </div>

                  {/* Follow button */}
                  <FollowButton
                    targetUserId={u._id}
                    initialFollowing={isFollowing}
                    initialIsFriend={isFriend}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover;