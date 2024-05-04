import Navbar from "../navbar/Navbar";
import PostsCard from "./PostsCard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loader/Loader.tsx";

const PostsPage = () => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log("error fetching posts:", error);
      return [];
    }
  };
  const {
    data: fetchedPosts,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({ queryKey: ["posts"], queryFn: fetchData });
  if (isError) {
    <div>Error in fetching posts</div>;
  }
  return (
    <div>
      <Navbar />
      {isLoading && <Loader />}
      <div className="flex flex-col items-center justify-center md:mx-96 mx-5 my-6 gap-8">
        {isSuccess &&
          fetchedPosts.map((post: any, index: number) => {
            return (
              <div key={index}>
                <PostsCard {...post} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PostsPage;
