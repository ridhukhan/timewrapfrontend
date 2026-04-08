import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import EditProfileModal from "../components/EditProfileModal";
import PostCard from "../components/PostCard";

const Profile = () => {
  const { user, setUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUserPosts = async () => {
      try {
        const res = await axiosInstance.get(`/post/user/${user._id}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      logout();
    } catch (error) {
      toast.error("Logout failed");
      console.log(error)
    }
  };

  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Toaster />

      {/* Cover */}
      <div className="h-48 bg-gradient-to-r from-sky-900 via-sky-700 to-zinc-900" />

      <div className="max-w-2xl mx-auto px-4">

        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <img
            src={user?.profilePic || "https://i.pravatar.cc/150?u=" + user?._id}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-zinc-950 object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-zinc-400 text-sm">@{user?.username}</p>
            <p className="text-zinc-300 text-sm mt-2">{user?.bio || "No bio yet"}</p>

            {/* Post count */}
            <p className="text-zinc-500 text-sm mt-2">
              <span className="text-white font-semibold">{posts.length}</span> posts
            </p>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-xl border border-zinc-600 text-sm hover:bg-zinc-800 transition-all"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-red-500/50 text-red-400 text-sm hover:bg-red-500/10 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 mb-6" />

        {/* Posts */}
        {loadingPosts ? (
          <div className="flex justify-center mt-10">
            <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 gap-3 text-zinc-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">No posts yet</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onDelete={handlePostDelete}
            />
          ))
        )}
      </div>

      {showModal && (
        <EditProfileModal
          onClose={() => setShowModal(false)}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default Profile;