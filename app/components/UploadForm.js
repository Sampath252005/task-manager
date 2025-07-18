"use client";
import { useRef, useState } from "react";
import Image from "next/image";

export default function UploadForm({ userId, onUpload, currentPhoto }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Trigger hidden input on edit icon click
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  // Upload photo to Cloudinary via API
  const handleUpload = async () => {
    if (!image || !userId) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", userId);

    try {
      setUploading(true);
      setError(null);

      const res = await fetch("/api/upload-profile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        onUpload(data.imageUrl); // Send URL to parent
        localStorage.setItem("profilePic", data.imageUrl); //  Store in localStorage
        setImage(null);
        fileInputRef.current.value = "";
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative w-32 h-32 group">
      {/* Profile Image */}
      <Image
        src={
          image
            ? URL.createObjectURL(image)
            : currentPhoto || "/profile.png"
        }
        alt="Profile"
        width={128}
        height={128}
        className="rounded-full object-cover border border-gray-600 w-32 h-32"
      />

      {/*  Overlay Icon */}
      <div
        onClick={handleIconClick}
        className="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-full p-2 cursor-pointer group-hover:scale-110 transition"
        title="Change Profile Photo"
      >
        <Image
          src="/updatePhoto.png" // Replace with icon of your choice
          alt="Edit"
          width={20}
          height={20}
        />
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImage(file);
            handleUpload(); //  Immediately upload after choosing
          }
        }}
      />

      {/*  Upload State & Errors */}
      {uploading && <p className="text-sm text-gray-300 mt-1">Uploading...</p>}
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}
