import React, { useEffect, useState } from 'react';
import { fetchComments, addComment } from '../services/ApiServices';

const Comments = ({ filmId }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const commentsPerPage = 5; 

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetchComments(filmId);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    getComments();
  }, [filmId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return;

    const commentData = { text: commentText, filmId };
    try {
      const response = await addComment(commentData);
      setComments((prevComments) => [response.data, ...prevComments]); 
      setCommentText(''); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit} className="d-flex flex-column gap-3 p-4 border rounded shadow-sm" style={{maxWidth:" 500px"}}>
        <textarea
            className="form-control"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            required
            rows="4"
            style={{resize: "none"}}
        ></textarea>

        <button type="submit" className="btn btn-primary align-self-end">
            Add Comment
        </button>
        </form>


      <ul className="comments-list">
        {currentComments.map((comment) => (
          <div className="card-body d-flex align-items-center" key={comment.id}>
            <div className="d-flex">
              <div className="d-flex flex-column align-items-center">
                <img 
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" 
                  alt="avatar" 
                  width="40" 
                  height="40" 
                  style={{ borderRadius: '30px' }} 
                />
                <p className="small mb-0 ms-2" style={{ color: 'white' }}>
                  {comment.Client.name}
                </p>
              </div>
            </div>
            <div 
              style={{
                background: 'grey',
                padding: '0px 20px',
                borderRadius: '50px',
                margin: '20px'
              }}
            >
              <p style={{ color: 'white', fontFamily: 'arial' }}>
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </ul>

      {comments.length > commentsPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              style={{
                padding: '10px',
                margin: '0 5px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: currentPage === index + 1 ? 'red' : 'lightgray',
                color: currentPage === index + 1 ? 'white' : 'black',
                cursor: 'pointer'
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
