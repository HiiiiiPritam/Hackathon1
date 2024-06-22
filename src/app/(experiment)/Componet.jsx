"use client";
import React, { useEffect, useState } from 'react';

function UploadImage({ email }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [users, setUsers] = useState([]);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      console.log("Selected image:", event.target.files[0]);
    }
  };

  const handleDelete = async (publicId) => {
    try {
      setUploading(true);

      const response = await fetch("/api/delete-image/" + publicId.replace("nextjs-image-gallery/", ""), {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.status === 200) {
        setSuccess("Image deleted successfully");
        fetchImages();
      } else {
        setError(data.message || "Failed to delete image");
      }
    } catch (error) {
      setError(error.message || "Failed to delete image");
    } finally {
      setUploading(false);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/getImages');
      const data = await response.json();
      if (data && data.images) {
        setUsers(data.images);
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
      const response = await fetch(`/api/upload-image/${email}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response data:", data);

      if (data.success) {
        setSuccess("Image uploaded successfully");
        fetchImages();
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
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Upload Profile Image</h1>
      <form onSubmit={onSubmitHandler}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={uploading}>
          Upload
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <div>
        {users.map((image) => (
          <div key={image._id}>
            <img src={image.image_url} alt="Uploaded" />
            <button onClick={() => handleDelete(image.public_id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadImage;
