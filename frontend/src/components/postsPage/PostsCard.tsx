import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface PostsCardProps {
  createdBy: string;
  title: string;
  summary: string;
  imageUrl: string;
  createdAt: Date;
  _id: string;
}

const PostsCard: React.FC<PostsCardProps> = ({
  createdBy,
  title,
  summary,
  imageUrl,
  createdAt,
  _id,
}) => {
  const navigate = useNavigate();
  const formattedDateTime = format(createdAt, "MMMM dd, yyyy hh:mm a");
  const routeToPage = () => {
    navigate(`/posts/${_id}`);
  };
  return (
    <div className="bg-white w-full md:max-w-3xl  mx-auto rounded-lg overflow-hidden shadow-lg">
      <div className="md:flex">
        <div className="md:w-1/2 md:relative">
          <img
            src={imageUrl}
            alt="Post"
            className="w-full h-auto md:h-full object-contain"
          />
        </div>
        <div className="md:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
              {title}
            </h2>
            <div className="flex items-center space-x-4 mb-2">
              <p className="text-gray-600 text-sm">{createdBy}</p>
              <p className="text-gray-600 text-sm">{formattedDateTime}</p>
            </div>
            <p className="text-gray-700">{summary}</p>
          </div>
          <div className="mt-4 text-right">
            <button
              className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
              onClick={routeToPage}>
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
