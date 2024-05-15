import { motion } from "framer-motion";
import Navbar from "./../navbar/Navbar";
import { useState } from "react";
import { useAuth } from "../context/Store";

const CreatePosts = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitForm = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(title, summary, content);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("content", content);
      formData.append("userId", user?.id);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log("error in sending info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center min-h-screen  p-4">
        <h1 className="text-4xl font-bold mt-8 mb-6 text-gray-800">
          Create Your Post
        </h1>
        <form
          className="w-full max-w-2xl bg-white shadow-2xl p-8 rounded-xl"
          onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Enter summary"
            onChange={(e) => setSummary(e.target.value)}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
          />
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose a picture
            </label>
            <div className="relative border border-gray-300 rounded-lg overflow-hidden">
              <input
                type="file"
                name="image"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-between p-3 bg-white">
                <span className="text-gray-500">
                  {imageFile ? imageFile.name : "No file chosen"}
                </span>
                <button
                  type="button"
                  className="text-indigo-600  hover:text-indigo-700 focus:outline-none focus:underline">
                  Browse
                </button>
              </div>
            </div>
          </div>

          <textarea
            onChange={(e) => setContent(e.target.value)}
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
            rows={6}
            placeholder="Elaborate"></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full md:w-auto hover:bg-indigo-600 transition duration-300">
            {isLoading ? <p>Creating...</p> : <p>Create Post</p>}
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export default CreatePosts;
