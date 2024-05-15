import { motion } from "framer-motion";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Avatar } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Sort from "../../assets/sort.png";
import Loader from "../loader/Loader";
import { useAuth } from "../context/Store";

interface Comment {
  _id: string;
  userId: string;
  username: string;
  avatar?: string;
  comment: string;
  createdAt: Date;
}

interface SidebarProps {
  postId: string;
  userId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  postId,
  userId,
  isOpen,
  setIsOpen,
}) => {
  const [comment, setComment] = useState<string>("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"newest" | "oldest">(
    "oldest"
  ); // Track selected sorting option
  const queryClient = useQueryClient();

  const toggleSidebar = (): void => {
    setIsOpen(!isOpen);
  };
  const { user } = useAuth();
  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/comments/fetch/${postId}`
      );
      const responseData: Comment[] = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const addCommentMutation = useMutation({
    mutationFn: async (newComment: string) => {
      const response = await fetch("http://localhost:3000/comments/create", {
        method: "POST",
        body: JSON.stringify({ userId, postId, comment: newComment }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addCommentMutation.mutate(comment);
    setComment("");
  };

  useEffect(() => {
    fetchComments();
  }, [isOpen]);

  const {
    data: allComments,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: fetchComments,
  });

  if (isError) {
    return <h1>error in loading comments</h1>;
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const queryKey = ["comments", postId];

  const sortCommentsToLatest = () => {
    const sortedComments = allComments?.slice().sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    queryClient.setQueryData(queryKey, sortedComments);
    setSelectedOption("newest");
    toggleOptions();
  };

  const sortCommentsToOldest = () => {
    const sortedComments = allComments?.slice().sort((a: any, b: any) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    queryClient.setQueryData(queryKey, sortedComments);
    setSelectedOption("oldest");
    toggleOptions();
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed right-0 top-0 h-full w-full md:w-[40%] bg-white z-50 shadow-lg overflow-y-auto">
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Add your comment..."
          required></textarea>
        <div className="flex justify-between items-center mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition">
            Add Comment
          </button>
          <div className="relative">
            <img
              src={Sort}
              alt="Sort options"
              className="h-8 w-8 cursor-pointer"
              onClick={toggleOptions}
            />
            {showOptions && (
              <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded-md shadow-md">
                <ul className="text-gray-700">
                  <li
                    className={`px-4 py-2 hover:bg-gray-100 ${
                      selectedOption === "newest" ? "bg-gray-100" : ""
                    }`}
                    onClick={sortCommentsToLatest}>
                    Newest
                  </li>
                  <li
                    className={`px-4 py-2 hover:bg-gray-100 ${
                      selectedOption === "oldest" ? "bg-gray-100" : ""
                    }`}
                    onClick={sortCommentsToOldest}>
                    Oldest
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </form>
      <div
        onClick={toggleSidebar}
        className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800 focus:outline-none transition cursor-pointer">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="divide-y divide-gray-200 cursor-default">
          {(isLoading || addCommentMutation.isPending) && <Loader />}

          {isSuccess && (
            <div className="divide-y-2 divide-gray-200">
              {allComments.map((comment: Comment, index: number) => (
                <div key={index} className="py-4">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={comment.avatar || ""}
                      alt={comment.username}
                      fallback={user?.username[0].toUpperCase()}
                      className="cursor-default text-2xl font-semibold"
                    />
                    <div className="flex flex-col cursor-default">
                      <p className="text-gray-500 text-sm font-medium cursor-default">
                        {comment.username}
                      </p>
                      <p className="text-gray-500 text-sm cursor-default">
                        {format(
                          new Date(comment.createdAt),
                          "MMMM dd, yyyy hh:mm a"
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 mt-2 cursor-default">
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
