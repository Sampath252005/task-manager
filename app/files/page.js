"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function UserFiles() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);
    uploadFiles(selected);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await fetch(`/api/get-files?userId=${userId}`);
        if (!res.ok) {
          console.error("Failed to fetch files:", res.status);
          return;
        }

        const text = await res.text();
        if (!text) {
          console.error("Empty response body");
          return;
        }

        const data = JSON.parse(text);
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error.message);
      }
    };

    fetchFiles();
  }, []);

  const uploadFiles = async (selectedFiles) => {
    setUploading(true);
    const uploaded = [];

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", localStorage.getItem("userId"));

      const res = await fetch("/api/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      uploaded.push({
        _id: data.fileId,
        name: file.name,
        type: file.type,
        date: new Date().toLocaleDateString(),
        url: data.url,
        public_id: data.public_id,
      });
    }

    setFiles((prev) => [...prev, ...uploaded]);
    setUploading(false);
  };

  const deleteFile = async (fileId, public_id) => {
    const res = await fetch("/api/delete-file", {
      method: "POST",
      body: JSON.stringify({ fileId, public_id }),
    });

    if (res.ok) {
      setFiles((prev) => prev.filter((file) => file._id !== fileId));
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-gray-900 text-white rounded-xl border border-gray-700 md:mt-15 mt-20  h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">📁 My Files</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={triggerFileInput}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Upload File
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </div>

      {uploading && (
        <p className="text-sm text-yellow-300 mb-3">Uploading files...</p>
      )}

      <div className="space-y-4">
        {files.length === 0 && (
          <p className="text-gray-400 text-sm">No files uploaded yet.</p>
        )}

        {files.map((file, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-gray-800 p-4 rounded-lg space-y-2"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-start sm:items-center gap-4">
                <span className="text-2xl">
                  {file.type.includes("image") ? "🖼️" : "📄"}
                </span>
                <div>
                  <p className="font-medium text-sm sm:text-base">{file.name}</p>
                  <p className="text-xs text-gray-400">{file.date}</p>
                </div>
              </div>

              <div className="flex gap-4 mt-2 sm:mt-0 sm:ml-auto">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-sm"
                >
                  Open
                </a>
                <button
                  className="text-red-500 hover:underline text-sm"
                  onClick={() => deleteFile(file._id, file.public_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
