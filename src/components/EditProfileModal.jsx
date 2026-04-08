import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";

const EditProfileModal = ({ onClose, setUser }) => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(user?.profilePic || "");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file)); // local preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // FormData লাগবে কারণ file + text একসাথে পাঠাচ্ছি
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("bio", bio);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      const res = await axiosInstance.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
console.log("Response:", res.data);
      setUser(res.data);
      toast.success("Profile updated!");
      onClose();
    } catch (error) {
     console.log("Full error:", error);
  console.log("Error response:", error.response?.data);
  toast.error(error.response?.data?.message || "Update failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-5">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Profile pic preview + upload */}
          <div className="flex flex-col items-center gap-3">
          <img
  src={preview || "https://i.pravatar.cc/150?u=" + user?._id}
  alt="preview"
  className="w-24 h-24 rounded-full object-cover border-2 border-zinc-600"
/>
            <label className="cursor-pointer text-sky-400 text-sm hover:underline">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-3 text-white text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-3 text-white text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs uppercase tracking-widest">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="bg-zinc-800 border border-zinc-600 focus:border-sky-400 focus:outline-none rounded-xl px-4 py-3 text-white text-sm resize-none"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-zinc-600 text-zinc-400 text-sm hover:bg-zinc-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-sm transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;