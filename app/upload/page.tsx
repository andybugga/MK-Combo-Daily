"use client";

import { useState } from "react";

export default function UploadPage() {
  const [message, setMessage] = useState("");

  const uploadFile = async (file: File) => {
    setMessage("Getting upload link...");

    const presignRes = await fetch("/api/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, contentType: file.type }),
    });

    const { url, key } = await presignRes.json();

    setMessage("Uploading...");
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    setMessage("Saving...");
    await fetch("/api/upload-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, originalName: file.name }),
    });

    setMessage("Upload complete.");
  };

  return (
    <main>
      <h1>Upload a Video</h1>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
        }}
      />
      <p>{message}</p>
    </main>
  );
}