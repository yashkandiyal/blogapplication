import { format } from "date-fns";
import React from "react";

interface PostsPageDetailCardProps {
  imageUrl: string;
  createdBy: string;
  createdAt: Date;
  content: string;
  title: string;
}

const PostsPageDetailCard: React.FC<PostsPageDetailCardProps> = ({
  imageUrl,
  createdBy,
  createdAt,
  content,
  title,
}) => {
  const formattedDateTime = format(createdAt, "MMMM dd, yyyy hh:mm a");
  return (
    <div className="bg-white w-full max-w-4xl my-5 md:mx-auto  overflow-hidden">
      <h1 className="text-3xl md:text-5xl font-bold text-center py-6 px-6 md:px-10">
        {title}
      </h1>
      <div className="rounded-lg shadow-lg flex flex-col items-center">
        <div className="relative max-w-2xl">
          <img
            src={imageUrl}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:px-10">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 text-sm">By: {createdBy}</p>
            <p className="text-gray-600 text-sm">{formattedDateTime}</p>
          </div>
          <p className="text-gray-800 text-base md:text-lg leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostsPageDetailCard;
