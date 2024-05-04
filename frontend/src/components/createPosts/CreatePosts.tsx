import { motion } from "framer-motion";
import Navbar from "./../navbar/Navbar";
import { useState } from "react";
import Cookies from "js-cookie";

const CreatePosts = () => {
  const username = Cookies.get("username");
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the file object
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const submitForm = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    console.log(title, summary, content);

    try {
      const formData = new FormData(); // Create FormData object
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("content", content);
      formData.append("username", username);
      if (imageFile) {
        formData.append("image", imageFile); // Append the file object to FormData
      }

      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        body: formData, // Use FormData instead of JSON.stringify
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log("error in sending info:", error);
    } finally {
      setIsLoading(false); // Set loading state back to false after form submission
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-8 mb-4">Create your posts here</h1>
        <form
          className="w-full max-w-xl bg-white shadow-md p-6 rounded-lg"
          onSubmit={submitForm}>
          <input
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Enter summary"
            onChange={(e) => setSummary(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Choose a picture
            </label>
            <input
              type="file"
              name="image"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              placeholder="choose an image"
            />
          </div>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            rows={6}
            placeholder="Elaborate"></textarea>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto">
            {isLoading ? (
              <>
                <p>Creating...</p>
              </>
            ) : (
              <p>Create a post</p>
            )}
          </motion.button>
        </form>
      </motion.div>
    </>
  );
};

export default CreatePosts;
