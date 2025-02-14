import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser?.avatar || "default-avatar.png"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dt4grdzw6/image/upload";
    const CLOUDINARY_PRESET = "CLOUDINARY_PRESET";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    setFilePerc(0); // Reset progress before upload starts
    setFileUploadError(false);

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", CLOUDINARY_URL, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setFilePerc(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response.secure_url);
          setFormData((prev) => ({ ...prev, avatar: response.secure_url }));
          setFilePerc(100);
        } else {
          setFileUploadError(true);
        }
      };

      xhr.onerror = () => {
        setFileUploadError(true);
      };

      xhr.send(formData);
    } catch (error) {
      setFileUploadError(true);
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p>
          {fileUploadError ? (
            <span className="text-red-700">Error: Image upload failed</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.userName}
          onChange={handleChange}
          id="userName"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="password"
          className="border p-3 rounded-lg"
        />

        <button
          disabled={isLoading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : "no error"}</p>
      {updateSuccess && (
        <p className="text-green-700 mt-=">Profile updated successfully!</p>
      )}
    </div>
  );
}
