"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { setProfilePic } from "../store/userSlice";

export default function UploadForm({ userId, onUpload, currentPhoto }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // Trigger hidden input on edit icon click
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  // Upload runs when image is selected
  useEffect(() => {
    if (image) {
      handleUpload();
    }
  }, [image]);

  // Upload photo to Cloudinary via API
  const handleUpload = async () => {
    if (!image || !userId) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("userId", userId);

    try {
      setUploading(true);
      setError(null);
      console.log("Uploading..."); // ✅ This will now appear

      const res = await fetch("/api/upload-profile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Upload response:", data);

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      if (res.ok) {
        onUpload(data.imageUrl); // Send URL to parent
        dispatch(setProfilePic(data.imageUrl)); // Store in localStorage
        setImage(null);
        fileInputRef.current.value = "";
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="relative w-32 h-32 group"
  >
    {/* Profile Image */}
    <motion.div whileHover={{ scale: 1.03 }} className="w-full h-full">
      <Image
        src={
          image
            ? URL.createObjectURL(image)
            : currentPhoto || "/profile.png"
        }
        alt="Profile"
        width={128}
        height={128}
        priority
        className="rounded-full object-cover border border-gray-600 w-32 h-32"
      />
    </motion.div>

    {/* Overlay Icon */}
    <motion.div
      onClick={handleIconClick}
      whileHover={{ scale: 1.2 }}
      className="absolute bottom-0 right-0 bg-black bg-opacity-60 rounded-full p-2 cursor-pointer transition"
      title="Change Profile Photo"
    >
      <Image
        src="/updatePhoto.png"
        alt="Edit"
        width={20}
        height={20}
      />
    </motion.div>

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
        }
      }}
    />

    {/* Uploading Text & Error */}
    <div className="absolute top-full mt-1 w-full text-center">
      <AnimatePresence>
        {uploading && (
          <motion.p
            key="uploading"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-gray-300"
          >
            Uploading...
          </motion.p>
        )}

        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

}
