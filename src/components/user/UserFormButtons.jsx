import { useNavigate } from "react-router-dom";

export function UserFormButtons() {
  const navigate = useNavigate();

  return (
    <button
      type="submit"
      className="submitBtn"
      aria-label="Update user profile form"
      onClick={() => navigate("/user-profile-edit")}
    >
      ✏️ Edit profile
    </button>
  );
}
