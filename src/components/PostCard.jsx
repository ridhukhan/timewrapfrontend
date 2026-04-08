import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

const PostCard = ({ post, onDelete }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commenting, setCommenting] = useState(false);

  const isLiked = likes.includes(user?._id);
  const isMyPost = post.author?._id === user?._id;

  const handleLike = async () => {
    try {
      const res = await axiosInstance.put(`/post/like/${post._id}`);
      setLikes(res.data.likes);
    } catch (error) {
      toast.error("Failed");
      console.log(error)
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    setCommenting(true);
    try {
      const res = await axiosInstance.post(`/post/comment/${post._id}`, {
        text: commentText,
      });
      setComments(res.data.comments);
      setCommentText("");
    } catch (error) {
      toast.error("Failed");
      console.log(error)
    } finally {
      setCommenting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/post/${post._id}`);
      onDelete(post._id);
      toast.success("Post deleted");
    } catch (error) {
      toast.error("Failed");
      console.log(error)
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-4">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={post.author?.profilePic || "https://i.pravatar.cc/150?u=" + post.author?._id}
            alt={post.author?.name}
            className="w-9 h-9 rounded-full object-cover border border-zinc-700"
          />
          <div>
            <p className="text-white text-sm font-medium">{post.author?.name}</p>
            <p className="text-zinc-500 text-xs">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
              })}
            </p>
          </div>
        </div>

        {isMyPost && (
          <button
            onClick={handleDelete}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="text-zinc-200 text-sm px-4 pb-3 leading-relaxed">{post.caption}</p>
      )}

      {/* Media */}
      {post.mediaType === "image" && (
        <img
          src={post.mediaUrl}
          alt="post"
          className="w-full max-h-[500px] object-cover"
        />
      )}
      {post.mediaType === "video" && (
        <video
          src={post.mediaUrl}
          controls
          className="w-full max-h-[500px]"
        />
      )}

      {/* Actions */}
      <div className="px-4 py-3 flex items-center gap-4 border-t border-zinc-800">

        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-all ${
            isLiked ? "text-red-500" : "text-zinc-400 hover:text-red-400"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{likes.length}</span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-sky-400 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{comments.length}</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-zinc-800">

          {/* Comment list */}
          <div className="mt-3 flex flex-col gap-2 max-h-48 overflow-y-auto">
            {comments.length === 0 ? (
              <p className="text-zinc-600 text-xs text-center py-2">No comments yet</p>
            ) : (
              comments.map((c, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <img
                    src={c.user?.profilePic || "https://i.pravatar.cc/150?u=" + c.user?._id}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-zinc-700"
                  />
                  <div className="bg-zinc-800 rounded-xl px-3 py-2 flex-1">
                    <p className="text-sky-400 text-xs font-medium">{c.user?.name}</p>
                    <p className="text-zinc-300 text-sm">{c.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Comment input */}
          <div className="flex gap-2 mt-3">
            <img
              src={user?.profilePic || "https://i.pravatar.cc/150?u=" + user?._id}
              alt=""
              className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-zinc-700"
            />
            <div className="flex-1 flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                placeholder="Write a comment..."
                className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-sky-400 focus:outline-none rounded-xl px-3 py-2 text-white placeholder-zinc-500 text-sm"
              />
              <button
                onClick={handleComment}
                disabled={commenting || !commentText.trim()}
                className="px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-sm font-bold transition-all disabled:opacity-40"
              >
                {commenting ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;