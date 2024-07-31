import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const history = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // This will be the base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newImage = {
      title: title,
      image: image,
    };

    axios
      .post("http://localhost:5000/api/images", newImage)
      .then((res) => history("/"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h1>Upload New Image</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={handleImageUpload} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPage;
