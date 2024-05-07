import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Store";
import Like from "../../assets/like.png";
import Liked from "../../assets/liked.png";
interface PostsPageDetailCardProps {
  imageUrl: string;
  createdBy: string;
  createdAt: Date;
  content: string;
  title: string;
  _id: string;
  likes: [];
}

const PostsPageDetailCard: React.FC<PostsPageDetailCardProps> = ({
  imageUrl,
  createdBy,
  createdAt,
  content,
  title,
  likes,
  _id,
}) => {
  const [likesCount, setLikesCount] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const postId = _id;
  const { user } = useAuth();
  const userId = user.id;

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
      
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

useEffect(() => {
  setLikesCount(likes.length);
  setIsLiked(likes.includes(userId));
}, [likes, userId]);


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
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={likePost}>
            {isLiked ? (
              <img src={Like} alt="Liked" className="h-5 w-5" />
            ) : (
              <img src={Liked} alt="Liked" className="h-5 w-5" />
            )}

            <p className="text-gray-600 text-sm">{likesCount}</p>
          </div>

          <p className="text-gray-600 text-sm">{formattedDateTime}</p>
        </div>
        <p className="text-gray-800 text-base md:text-lg leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};

export default PostsPageDetailCard;
