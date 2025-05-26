import { useAuth } from "src/context/AuthContext";
import { supabase } from "src/supabaseClient";
import { BiInfoCircle } from "react-icons/bi";

import { useUserAvatarUpload } from "src/hooks/useUserAvatarUpload";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function UserProfileEdit() {
  const { user } = useAuth();

  const [userProfileData, setUserProfileData] = useState({
    user_name: "",
    user_email: "",
    user_avatar: "",
  });

  const { image, imagePreview, uploading, uploadImage, setImage, setImagePreview, localFileName } =
    useUserAvatarUpload();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) {
      alert("✨ Please log in first. ✨");
      navigate("/login");
      return;
    }

    const fetchUserProfile = async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (error) {
        console.error("Failed to load user data", error);
        return;
      }

      if (!data) {
        console.error("讀取 profile 失敗", error);
      }

      setUserProfileData(data); // 先儲存 userProfileData 再處理 preview

      if (data?.user_avatar) {
        const { data: urlData, error: urlError } = supabase.storage
          .from("user-avatar")
          .getPublicUrl(data.user_avatar);

        if (!urlError && urlData?.publicURL) {
          setImagePreview(`${urlData.publicURL}?t=${Date.now()}`); // 這才是真正可以用的 URL！
        }

        if (urlError) {
          console.error("❌ Failed to get image URL", urlError);
        }
        setImage(data?.user_avatar);
      }
    };
    fetchUserProfile();
  }, [user, navigate, setImage, setImagePreview]);

  if (!userProfileData) return null;

  const updateUserProfile = async () => {
    if (uploading) {
      alert("⏳ Upload in progress, please wait...");
      return;
    }

    const updates = {
      user_name: userProfileData?.user_name,
      user_avatar: typeof image[0] === "string" ? image[0] : null,
    };

    const { error } = await supabase.from("user_profiles").update(updates).eq("user_id", user.id);

    if (error) {
      alert("⚠️ Failed to update: " + error.message);
    } else {
      alert("✅ Profile updated successfully.");
      navigate(`/user-profile-view`);
    }
  };

  return (
    <section className="archBackground flex min-h-screen w-full justify-center py-0 md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
      <div className="relative flex min-h-screen w-full max-w-[500px] flex-col items-center justify-start gap-y-10 px-6 py-12 md:max-w-[600px] 990:max-w-[800px]">
        <h1 className="mt-10 font-youngSerif text-4xl text-orange md:text-5xl 990:text-6xl">
          Edit User Profile
        </h1>
        {/* form */}
        <form className="w-full space-y-8 rounded-xl border border-yellow p-6">
          {/* User Name */}
          <div className="addPostShadow userViewFormItem">
            <div className="flex flex-col items-start justify-between gap-y-6">
              <label className="form-label text-orange">User Name</label>
              <input
                className="userInputField darkInputField bg-beige"
                value={userProfileData?.user_name || ""}
                placeholder="👩‍🍳 e.g. Miss Amu Amu"
                onChange={(e) =>
                  setUserProfileData((prev) => ({
                    ...prev,
                    user_name: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="addPostShadow userViewFormItem">
            <div className="flex flex-col items-start justify-between gap-y-6">
              <label className="form-label text-orange">User Email</label>
              <input
                className="userInputField darkInputField bg-beige"
                value={userProfileData?.user_email || ""}
                readOnly
              />
            </div>
          </div>

          {/* {image} */}
          <div className="addPostShadow userViewFormItem">
            <label className="form-label text-orange">User image</label>
            <input
              type="file"
              className="h-12 w-full cursor-pointer rounded-md bg-[#1E1E3F] p-2 text-[#FFD28F]/70 outline-none"
              accept="image/*"
              onChange={uploadImage}
            />
            {!userProfileData?.user_avatar && (
              <p className="mt-2 flex items-center gap-3 break-all text-xs text-beige300">
                <BiInfoCircle className="text-xl" />
                <span>You haven’t uploaded a profile image yet.</span>
              </p>
            )}

            {imagePreview && (
              <img
                src={image}
                alt="Preview image"
                className="mx-auto h-[200px] w-[200px] rounded-full object-cover object-center md:h-[400px] md:w-[400px] 1440:h-[480px] 1440:w-[480px]"
              />
            )}

            {(localFileName || userProfileData?.user_avatar) && (
              <p className="mt-1 break-all text-xs text-beige300">
                📁 {localFileName || userProfileData?.user_avatar?.split("/").pop()}
              </p>
            )}
          </div>

          <div className="flex justify-center pt-10">
            <button
              type="submit"
              aria-label="Update user profile form"
              className="submitBtn"
              disabled={uploading}
              onClick={(e) => {
                e.preventDefault();
                updateUserProfile();
              }}
            >
              ✨ Update profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
