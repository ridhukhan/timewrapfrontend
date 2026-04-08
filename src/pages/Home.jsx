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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]); // নতুন post সবার উপরে
  };

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

        <h1 className="text-lg font-bold tracking-widest text-sky-400">SOCIAL</h1>

        <button
          onClick={() => setShowInbox(true)}
          className="relative w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 hover:border-sky-500 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </nav>

      {/* Feed */}
      <div className="pt-14 max-w-xl mx-auto px-4 py-6">

        {/* Create post */}
        <CreatePost onPostCreated={handlePostCreated} />

        {/* Posts */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-16 gap-3 text-zinc-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
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