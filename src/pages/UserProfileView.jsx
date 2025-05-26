import { BiInfoCircle } from "react-icons/bi";
import { useAuth } from "src/context/AuthContext";
import { supabase } from "src/supabaseClient";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeImage } from "src/components/RecipeImage";
import { UserFormButtons } from "src/components/user/UserFormButtons";

export function UserProfileView() {
  const { user } = useAuth();

  const [userProfileData, setUserProfileData] = useState({
    user_name: "",
    user_email: "",
    user_avatar: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

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

      if (error && error.message === "JSON object requested, multiple (or no) rows returned") {
        //找不到資料，建立新資料📌
        const { error: insertError } = await supabase.from("user_profiles").insert([
          {
            user_id: user.id,
            user_email: user.email,
            user_name: user?.user_metadata.name || "Anonymous",
            user_avatar: null,
          },
        ]);
        if (insertError) {
          console.error("Failed to auto-create user_profiles.", insertError);
          return;
        } else {
          console.log("✅ Successfully created user_profiles.");
          // 建立後，再次 fetch
          const { data: newData } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();
          setUserProfileData(newData);
        }
      } else if (error) {
        console.error("❌ Failed to fetch user_profiles.", error);
      } else {
        // 有資料，直接 set
        setUserProfileData(data);
      }
    };
    fetchUserProfile();
  }, [user, navigate, setImagePreview, userProfileData]);

  useEffect(() => {
    if (!userProfileData?.user_avatar) return;
    const result = supabase.storage.from("user-avatar").getPublicUrl(userProfileData.user_avatar);

    if (result?.data?.publicURL) {
      setImagePreview(`${result.data.publicURL}?t=${Date.now()}`);
    } else {
      console.error("❌ Failed to get public URL", result.error);
    }
  }, [userProfileData]);

  return (
    <section className="archBackground flex min-h-screen w-full justify-center py-0 md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
      <div className="relative flex min-h-screen w-full max-w-[500px] flex-col items-center justify-start gap-y-10 px-6 py-12 md:max-w-[600px] 990:max-w-[800px]">
        <h1 className="mt-10 font-youngSerif text-4xl text-orange md:text-5xl 990:text-6xl">
          User Profile
        </h1>
        {/* form */}
        <form className="w-full space-y-8 rounded-xl border border-yellow p-6">
          {/* User Name */}
          <div className="addPostShadow userViewFormItem">
            <div className="flex flex-col items-start justify-between gap-y-6">
              <label className="form-label text-orange">User Name</label>
              <p className="w-full border-b border-beige300 pb-2 text-center text-xl leading-3 text-beige">
                {userProfileData?.user_name || user?.user_metadata.name || "Anonymous"}
              </p>
            </div>
            {userProfileData?.user_name === "Anonymous" && (
              <p className="-mt-4 flex items-center gap-3 break-all text-xs text-beige300">
                <BiInfoCircle className="text-xl" />
                <span>
                  Your name is currently set to "Anonymous". <br />
                  You can personalize it!
                </span>
              </p>
            )}
          </div>

          <div className="addPostShadow userViewFormItem">
            <label className="form-label text-orange">User Email</label>
            <p className="w-full border-b border-beige300 pb-2 text-center text-xl leading-3 text-beige">
              {userProfileData?.user_email || user?.email}
            </p>
          </div>

          {/* image */}
          <div className="addPostShadow userViewFormItem">
            <label className="form-label text-orange">User image</label>
            <div className="flex w-full flex-col items-center justify-center">
              <RecipeImage
                className="h-[150px] w-[150px] rounded-full object-cover object-center md:h-[200px] md:w-[200px] 1440:h-[250px] 1440:w-[250px]"
                src={userProfileData?.user_avatar || imagePreview}
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
          </div>
          <div className="bottom-3 right-3 flex justify-center pt-10">
            <UserFormButtons />
          </div>
        </form>
      </div>
    </section>
  );
}
