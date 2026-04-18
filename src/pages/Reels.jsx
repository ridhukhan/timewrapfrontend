import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ReelCard = ({ video, index, activeIndex }) => {
  const videoRef = useRef(null);
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 9000) + 1000
  );
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);

  // Active reel auto play
  useEffect(() => {
    if (!videoRef.current) return;
    if (index === activeIndex) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeIndex, index]);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };

  const handleComment = () => {
    if (!comment.trim()) return;
    setComments((prev) => [
      ...prev,
      { name: user?.name, text: comment, pic: user?.profilePic },
    ]);
    setComment("");
  };

  const videoUrl = video?.video_files?.find(
    (f) => f.quality === "hd" || f.quality === "sd"
  )?.link;

  return (
    <div className="relative w-full h-screen flex-shrink-0 bg-black overflow-hidden">

      {/* Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted={muted}
        playsInline
        onClick={handleVideoClick}
        className="w-full h-full object-cover"
      />

      {/* Pause indicator */}
      {paused && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      {/* Right side actions */}
      <div className="absolute right-3 bottom-32 flex flex-col items-center gap-6">

        {/* Like */}
        <button onClick={handleLike} className="flex flex-col items-center gap-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${liked ? "scale-110" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-7 h-7 transition-colors ${liked ? "text-red-500" : "text-white"}`} fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-white text-xs font-medium">{likeCount.toLocaleString()}</span>
        </button>

        {/* Comment */}
        <button onClick={() => setShowComments(true)} className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="text-white text-xs font-medium">{comments.length}</span>
        </button>

        {/* Mute/Unmute */}
        <button onClick={() => setMuted((prev) => !prev)} className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            {muted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4-4m4 4l4-4M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-6 left-4 right-16 pointer-events-none">
        <p className="text-white font-semibold text-sm mb-1">
          {video?.user?.name || "Pexels Creator"}
        </p>
        <p className="text-zinc-300 text-xs leading-relaxed line-clamp-2">
          {video?.url?.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || "Amazing video"}
        </p>
      </div>

      {/* Comment drawer */}
      {showComments && (
        <>
          <div
            className="absolute inset-0 z-10"
            onClick={() => setShowComments(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-zinc-900 rounded-t-2xl max-h-96 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <h3 className="text-white font-semibold text-sm">Comments</h3>
              <button onClick={() => setShowComments(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Comment list */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {comments.length === 0 ? (
                <p className="text-zinc-500 text-sm text-center py-4">No comments yet</p>
              ) : (
                comments.map((c, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <img
                      src={c.pic || "https://i.pravatar.cc/150?u=" + c.name}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="bg-zinc-800 rounded-xl px-3 py-2">
                      <p className="text-sky-400 text-xs font-medium">{c.name}</p>
                      <p className="text-white text-sm">{c.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment input */}
            <div className="flex gap-2 px-4 py-3 border-t border-zinc-800">
              <img
                src={user?.profilePic || "https://i.pravatar.cc/150?u=" + user?._id}
                alt=""
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                placeholder="Add a comment..."
                className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-sky-400 focus:outline-none rounded-xl px-3 py-2 text-white placeholder-zinc-500 text-sm"
              />
              <button
                onClick={handleComment}
                disabled={!comment.trim()}
                className="px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-sm font-bold disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Reels = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          "https://api.pexels.com/videos/search?query=nature lifestyle travel food&per_page=15&orientation=portrait",
          {
            headers: {
              Authorization: import.meta.env.VITE_PEXELS_API_KEY,
            },
          }
        );
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Snap scroll — active index track করো
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="relative bg-black h-screen">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Reels label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
        <span className="text-white font-bold text-base tracking-wide">Reels</span>
      </div>

      {/* Vertical snap scroll container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll"
        style={{
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            style={{ scrollSnapAlign: "start" }}
            className="h-screen"
          >
            <ReelCard
              video={video}
              index={index}
              activeIndex={activeIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;