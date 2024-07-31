import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ImagePage() {
  const { id } = useParams();
  const history = useNavigate();
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/images/${id}`)
      .then((res) => {
        setImage(res.data);
        setComments(res.data.comments);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/images/${id}/comments`, { comment })
      .then((res) => setComments(res.data.comments))
      .catch((err) => console.error(err));
    setComment("");
  };

  const handleCommentDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/images/${id}/comments/${index}`)
        .then((res) => setComments(res.data.comments))
        .catch((err) => console.error(err));
    }
  };

  const handleDeleteImage = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/api/images/${id}`)
        .then(() => history("/"))
        .catch((err) => console.error(err));
    }
  };

  if (!image) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{image.title}</h1>
      <img src={image.imagePath} alt={image.title} />
      <button onClick={handleDeleteImage}>Delete Image</button>
      <div className="comments-section">
        <h2>Comments</h2>
        <ul>
          {comments.map((c, index) => (
            <li key={index}>
              {c}
              <button onClick={() => handleCommentDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ImagePage;
