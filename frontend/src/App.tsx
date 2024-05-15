import { Route, Routes } from "react-router-dom";
import RegisterPage from "./components/registerPage/RegisterPage";
import LoginPage from "./components/loginPage/LoginPage";
import PostsPage from "./components/postsPage/PostsPage";
import PrivateRoutes from "./components/privateRoute/PrivateRoute";
import CreatePosts from "./components/createPosts/CreatePosts";
import PostsPageDetail from "./components/postsPageDetail/PostsPageDetail";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostsPageDetail />} />
          <Route path="/createposts" element={<CreatePosts />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
