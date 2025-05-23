import { Nav } from "src/components/Nav";
import { RecipePage } from "src/pages/RecipePage";
import { HomePage } from "src/pages/HomePage";
import { AddPost } from "src/pages/Post/AddPost";
import { Login } from "src/pages/Auth/Login";
import { SignUp } from "src/pages/Auth/SignUp";
import { CartPage } from "src/pages/CartPage";
import { AuthProvider } from "src/context/AuthContext";
import { CartProvider } from "src/context/CartContext";
import { UserProfileView } from "src/pages/UserProfileView";
import { UserProfileEdit } from "src/pages/UserProfileEdit";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
  return (
    <div className="relative flex h-full min-w-[375px] flex-col items-center bg-blue900">
      <div className="flex h-full w-full flex-col items-center px-4 pb-14 pt-[88px] md:px-8 md:pt-24 1440:max-w-[1400px]">
        <AuthProvider>
          <CartProvider>
            <Router>
              <Nav />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe-page/:id" element={<RecipePage />} />
                <Route path="/add-recipe" element={<AddPost />} />
                <Route path="/edit/:id" element={<AddPost />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/user-profile-view" element={<UserProfileView />} />
                <Route path="/user-profile-edit" element={<UserProfileEdit />} />
              </Routes>
            </Router>
          </CartProvider>
        </AuthProvider>
      </div>
    </div>
  );
}
