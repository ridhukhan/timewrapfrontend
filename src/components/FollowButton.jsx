import { useState } from "react";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

const FollowButton = ({ targetUserId, initialFollowing, initialIsFriend }) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing || false);
  const [isFriend, setIsFriend] = useState(initialIsFriend || false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/follow/toggle/${targetUserId}`);

      // Backend থেকে আসা fresh data দিয়ে update করো
      const amIFollowingThem = res.data.following
        .map((id) => id.toString())
        .includes(targetUserId.toString());

      const areWeFriends = res.data.isFriend;

      setIsFollowing(amIFollowingThem);
      setIsFriend(areWeFriends);
    } catch (error) {
      toast.error("Failed");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 flex-shrink-0 ${
        isFriend
          ? "bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400"
          : isFollowing
          ? "bg-zinc-800 border border-zinc-600 text-zinc-300 hover:border-red-500/50 hover:text-red-400"
          : "bg-sky-500 hover:bg-sky-400 text-black"
      }`}
    >
      {loading ? "..." : isFriend ? "👥 Friends" : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;