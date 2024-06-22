"use client";
import React, { useEffect, useState } from "react";

function UploadImage({ email}) {

  
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      // Create a preview URL for the selected image
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
      setSuccess("Please confirm the changes by uploading")
      console.log(file);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/getUserByEmail?email=${email}`);
      const data = await response.json();
      if (data && data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/updateImage/${email}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setSuccess("Image uploaded successfully");
        fetchUser();
        setPreview(null); // Clear the preview after successful upload
      } else {
        setError(data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("An error occurred while uploading the image", error);
      setError("An error occurred while uploading the image");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Profile of {user?.name}</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : user?.image ? (
            <img
              src={user.image}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ fontSize: "50px" }}>
              <lord-icon
                src="https://cdn.lordicon.com/hrjifpbq.json"
                trigger="hover"
                style={{ width: "200px", height: "200px" }}
              ></lord-icon>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={onSubmitHandler}>
        <input style={{ display: "none" }} type="file" id="fileInput" onChange={handleFileChange} />
        <br />
        {uploading?<button style={{ display: "block", background: "grey",color:"black" }} type="submit" disabled={uploading}>
          Uploading....
           </button>:<button style={{ display: "block", background: "aqua" }} type="submit" disabled={uploading}>
          Upload
        </button>}
        
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default UploadImage;
