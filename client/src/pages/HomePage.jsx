import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [images, setImages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const correctPassword = "1234"; // Set your desired password here

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:5000/api/images")
        .then((res) => setImages(res.data))
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
      setPassword(""); // Clear the input field
    }
  };

  return (
    <div className="container">
      {!isAuthenticated ? (
        <div>
          <h1>Enter Password to Access Image Gallery</h1>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Image Gallery</h1>
          <Link to="/upload">Upload New Image</Link>
          <div className="image-grid">
            {images.map((image) => (
              <div key={image._id} className="image-item">
                <Link to={`/image/${image._id}`}>
                  <img src={image.imagePath} alt={image.title} />
                  <p>{image.title}</p>
                </Link>
                <button onClick={() => handleDelete(image._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
