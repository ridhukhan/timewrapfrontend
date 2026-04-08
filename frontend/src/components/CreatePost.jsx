import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!caption.trim() && !media) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      if (media) formData.append("media", media);

      const res = await axiosInstance.post("/post/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onPostCreated(res.data);
      setCaption("");
      setMedia(null);
      setPreview(null);
      toast.success("Post created!");
    } catch (error) {
      toast.error("Failed to create post");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">
      {/* Top row */}
      <div className="flex gap-3">
        <img
          src={user?.profilePic || "https://i.pravatar.cc/150?u=" + user?._id}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover border border-zinc-700 flex-shrink-0"
        />
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="What's on your mind?"
          rows={2}
          className="flex-1 bg-zinc-800 border border-zinc-700 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-2.5 text-white placeholder-zinc-500 text-sm resize-none"
        />
      </div>

      {/* Media preview */}
      {preview && (
        <div className="mt-3 relative inline-block ml-13">
          {media?.type.startsWith("video") ? (
            <video src={preview} className="max-h-48 rounded-xl" controls />
          ) : (
            <img src={preview} alt="preview" className="max-h-48 rounded-xl object-cover" />
          )}
          <button
            onClick={() => { setMedia(null); setPreview(null); }}
            className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center hover:bg-red-500 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-3 pl-13">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-sky-400 text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Photo / Video
        </button>
        <input ref={fileRef} type="file" accept="image/*,video/*" onChange={handleMediaChange} className="hidden" />

        <button
          onClick={handleSubmit}
          disabled={loading || (!caption.trim() && !media)}
          className="px-5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-sm font-bold transition-all disabled:opacity-40"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;