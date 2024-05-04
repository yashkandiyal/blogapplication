import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import PostsPageDetailCard from "./PostsPageDetailCard";
import Loader from "../loader/Loader";

const PostsPageDetail = () => {
  const { id } = useParams();

  const fetchPostById = async () => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log("error fetching this post:", error);
      return null;
    }
  };

  // Queries
  const {
    data: postData,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["fetchpostbyid"],
    queryFn: fetchPostById,
  });

  if (isError) {
    return <span>Error fetching post data</span>;
  }

  return (
    <div>
      <Navbar />
      <div>
        {isLoading && <Loader />}
        {isSuccess && postData && <PostsPageDetailCard {...postData} />}
      </div>
    </div>
  );
};

export default PostsPageDetail;
