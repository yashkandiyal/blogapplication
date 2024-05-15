import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useAuth } from "../context/Store";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
const Navbar = () => {
  const { user } = useAuth();
  const navigiate = useNavigate();
  const logoutUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        navigiate("/");
      }
    } catch (error) {
      console.log("error in logging out user!", error);
    }
  };
  return (
    <nav
      className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white font-semibold text-2xl">
            <Link
              to="/posts"
              className="hover:text-gray-300 transition duration-300">
              PixelPens Blog
            </Link>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/createposts"
            className="text-white text-xl px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300">
            Create Post
          </Link>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer">
                <Avatar
                  color="default"
                  isBordered
                  as="button"
                  alt="Avatar"
                  fallback={user?.username[0].toUpperCase()}
                  
                  className="transition-transform text-2xl font-semibold"
                />
              </motion.div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="bg-white rounded-lg shadow-lg">
              <DropdownItem key="profile" className="h-14 gap-2 text-gray-800">
                <p className="font-semibold">Signed in as {user?.username}</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                className="text-red-600"
                onClick={logoutUser}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
