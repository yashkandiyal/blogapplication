import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Store";
import Like from "../../assets/like.png";
import Liked from "../../assets/liked.png";
import Comment from "../../assets/comment.png";
import Sidebar from "../sidebar/Sidebar";

interface PostsPageDetailCardProps {
  imageUrl: string;
  createdBy: string;
  createdAt: Date;
  content: string;
  title: string;
  _id: string;
  likes: string[]; // Assuming likes are represented by user IDs
  comments: string[]; // Assuming comments are represented by comment IDs
}

const PostsPageDetailCard: React.FC<PostsPageDetailCardProps> = ({
  imageUrl,
  createdBy,
  createdAt,
  content,
  title,
  likes,
  _id,
  comments,
}) => {
  const { user } = useAuth();
  const userId = user.id;
  const postId = _id;

  const [likesCount, setLikesCount] = useState<number>(likes.length);
  const [commentsCount, setCommentsCount] = useState<number>(comments.length);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const likePost = async () => {
    try {
      const response = await fetch("http://localhost:3000/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId }),
      });
      if (!response.ok) {
        throw new Error("Failed to like/unlike post");
      }
      const responseData = await response.json();
      setLikesCount(responseData.likesCount);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  useEffect(() => {
    setIsLiked(likes.includes(userId));
    setLikesCount(likes.length);
    setCommentsCount(comments.length);
  }, [likes, comments, userId]);

  const formattedDateTime = format(createdAt, "MMMM dd, yyyy hh:mm a");

  return (
    <div className="bg-white w-full max-w-4xl my-5 md:mx-auto overflow-hidden shadow-lg rounded-lg">
      <h1 className="text-3xl md:text-5xl font-bold text-center py-6 px-6 md:px-10">
        {title}
      </h1>
      <div className="relative max-w-2xl mx-auto">
        <img src={imageUrl} alt="Post" className="w-full h-auto object-cover" />
      </div>
      <div className="p-6 md:px-10">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 text-sm">By: {createdBy}</p>
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={isLiked ? Liked : Like}
              alt={isLiked ? "Liked" : "Like"}
              className="h-6 w-6"
              onClick={likePost}
            />
            <Sidebar
              postId={postId}
              userId={userId}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <p className="text-gray-600 text-sm">{likesCount}</p>
            <img
              src={Comment}
              alt="Comment"
              className="h-6 w-6"
              onClick={() => setIsOpen((prev) => !prev)}
            />
            <p className="text-gray-600 text-sm">{commentsCount}</p>
          </div>
          <p className="text-gray-600 text-sm">{formattedDateTime}</p>
        </div>
        <p className="text-gray-800 text-base md:text-lg leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>
    </div>
  );
};

export default PostsPageDetailCard;
