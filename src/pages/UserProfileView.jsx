import { BiInfoCircle } from "react-icons/bi";
import { useAuth } from "src/context/AuthContext";
import { supabase } from "src/supabaseClient";

import { useUserAvatarUpload } from "src/hooks/useUserAvatarUpload";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeImage } from "src/components/RecipeImage";
import { UserFormButtons } from "src/components/user/UserFormButtons";

export function UserProfileView() {
  const { user } = useAuth();
  console.log("Auth user", user);

  const [userProfileData, setUserProfileData] = useState(null);
  const { image, imagePreview, setImage, setImagePreview } = useUserAvatarUpload();
  const navigate = useNavigate();
  console.log("userProfileData state", userProfileData);

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
      console.log("✅ data", data);

      if (error) {
        console.error("Failed to load recipe", error);
        return;
      }
      setUserProfileData(data);
      console.log("userProfileData fetch state", userProfileData);

      setImage(data.image || []);
      setImagePreview(data.image?.[0]);

      if (!data) {
        // ✅ 自動建立一筆 user_profiles 資料
        const { error: insertError } = await supabase.from("user_profiles").insert([
          {
            user_id: user.id,
            user_email: user.email,
            user_name: user.name || "Anonymous",
            user_avatar: null,
          },
        ]);
        if (insertError) {
          console.error("自動建立 user_profiles 失敗", insertError);
          return;
        } else {
          console.log("✅ 成功建立 user_profiles");
        }
      }
    };
    fetchUserProfile();
  }, [user, navigate, setImage, setImagePreview, userProfileData]);

  return (
    <section className="archBackground flex min-h-screen w-full justify-center py-0 md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
      <div className="relative flex min-h-screen w-full max-w-[500px] flex-col items-center justify-start gap-y-10 px-6 py-12 md:max-w-[600px] 990:max-w-[800px]">
        <h1 className="mt-10 font-youngSerif text-4xl text-orange md:text-5xl 990:text-6xl">
          User Profile
        </h1>
        {/* form */}
        <form className="w-full space-y-8 rounded-xl border border-yellow p-6">
          {/* User Name */}
          <div className="addPostShadow flex flex-col gap-y-4 p-4 text-xl md:p-6">
            <div className="flex flex-col items-start justify-between gap-y-6">
              <label className="form-label text-orange">User Name</label>
              <p className="w-full border-b border-beige300 pb-2 text-center text-xl leading-3 text-beige">
                {userProfileData?.user_name || "Not set"} mmm
              </p>
            </div>
            {userProfileData?.user_name === "Anonymous" && (
              <p className="-mt-2 flex items-center gap-3 break-all text-xs text-beige300">
                <BiInfoCircle className="text-xl" />
                <span>
                  Your name is currently set to "Anonymous". <br />
                  You can personalize it!
                </span>
              </p>
            )}
          </div>

          <div className="addPostShadow flex flex-col gap-y-4 p-4 text-xl md:p-6">
            <div className="flex flex-col items-start justify-between gap-y-6">
              <label className="form-label text-orange">User Email</label>
              <p className="w-full border-b border-beige300 pb-2 text-center text-xl leading-3 text-beige">
                {userProfileData?.user_email || "Not set"}
              </p>
            </div>
          </div>

          {/* image */}
          <div className="addPostShadow flex flex-col gap-y-4 p-4 text-xl md:p-6">
            <label className="form-label text-orange">User image</label>
            <div className="flex w-full flex-col items-center justify-center">
              <RecipeImage
                className="h-[150px] w-[150px] rounded-full object-cover object-center md:h-[200px] md:w-[200px] 1440:h-[250px] 1440:w-[250px]"
                src={imagePreview}
                alt={user.name}
                aria-label="User profile image"
              />
              {!userProfileData?.user_avatar && (
                <p className="mt-2 flex items-center gap-3 break-all text-xs text-beige300">
                  <BiInfoCircle className="text-xl" />
                  <span>You haven’t uploaded a profile image yet.</span>
                </p>
              )}
            </div>

            {userProfileData?.user_avatar?.length > 0 && (
              <p className="mt-1 break-all text-xs text-beige300">
                📁 {typeof image[0] === "string" ? image[0].split("/").pop() : image[0]?.name}
              </p>
            )}
          </div>
          <div className="bottom-3 right-3 flex justify-center pt-10">
            <UserFormButtons />
          </div>
        </form>
      </div>
    </section>
  );
}
