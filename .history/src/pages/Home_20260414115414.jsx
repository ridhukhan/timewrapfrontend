import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import { Toaster } from "react-hot-toast";
import InboxDrawer from "../components/InboxDrawer";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showInbox, setShowInbox] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // ✅ Fetch from backend only
  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/post/feed");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ✅ New post instantly add (optimistic UI)
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // ✅ Delete post from UI
  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Toaster />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src={user?.profilePic || "https://i.pravatar.cc/150?u=" + user?._id}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover border border-zinc-600"
          />
          <span className="text-sm font-medium text-zinc-300 hidden sm:block">
            {user?.name}
          </span>
        </button>

        <h1 className="text-lg font-bold tracking-widest text-sky-400">
          SOCIAL
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/discover")}
            className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 hover:border-sky-500 transition-all"
          >
            👥
          </button>

          <button
            onClick={() => setShowInbox(true)}
            className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 hover:border-sky-500 transition-all"
          >
            💬
          </button>
        </div>
      </nav>

      {/* Feed */}
      <div className="pt-14 max-w-xl mx-auto px-4 py-6 mt-5">
        <CreatePost onPostCreated={handlePostCreated} />

        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16 gap-3 text-zinc-600">
            <p className="text-sm">No posts yet. Be the first!</p>
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

      {showInbox && <InboxDrawer onClose={() => setShowInbox(false)} />}
    </div>
  );
};

export default Home;