import { Nav } from "src/components/Nav";
import { RecipePage } from "src/pages/RecipePage";
import { HomePage } from "src/pages/HomePage";
import { AddPost } from "/src/pages/Post/AddPost";
import { Login } from "/src/pages/Auth/Login";
import { SignUp } from "/src/pages/Auth/SignUp";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export function App() {
  return (
    <div className="relative flex min-w-[375px] flex-col items-center bg-blue900">
      <div className="w-full px-4 pb-14 md:px-8 1440:max-w-[1110px]">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe-page" element={<RecipePage />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
