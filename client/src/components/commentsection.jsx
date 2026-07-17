import { useEffect, useState } from "react";
import {
  getComments,
  addComment,
} from "../services/comment.service";

function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const response = await getComments(taskId);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      await addComment(taskId, comment);

      setComment("");

      loadComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-4">
        Comments
      </h2>

      <div className="flex gap-3 mb-5">

        <input
          type="text"
          value={comment}
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={handleAddComment}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Add
        </button>

      </div>

      {comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet.
        </p>
      ) : (
        comments.map((item) => (
          <div
            key={item._id}
            className="border-b py-4"
          >
            <h4 className="font-semibold">
              {item.user?.name}
            </h4>

            <p className="text-gray-600">
              {item.comment}
            </p>

            <small className="text-gray-400">
              {new Date(item.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}

    </div>
  );
}

export default CommentSection;