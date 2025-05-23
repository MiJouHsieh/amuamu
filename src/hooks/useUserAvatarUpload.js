import { useState } from "react";
import { supabase } from "src/supabaseClient";

export function useUserAvatarUpload() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      const file = event.target?.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`; // 建立檔案路徑

      if (file) {
        setImage([file]);
        console.log("user avatar: ", file);
        const imagePreview = URL.createObjectURL(file);
        setImagePreview(imagePreview);
      }

      // 上傳圖片到 Supabase
      let { data, error: uploadError } = await supabase.storage
        .from("user-avatar")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      await getURL(filePath);
      console.log("Upload successful! user avatar URL:", data.path);
    } catch (error) {
      alert(`Failed to upload user avatar ${error.message}`);
    }
  };

  const getURL = async (url) => {
    try {
      // 從 Supabase 取得公開 URL
      const { publicURL, error } = await supabase.storage.from("user-avatar").getPublicUrl(url);

      if (error) {
        throw error;
      }
      // 將圖片 URL 存入 state
      setImage([publicURL]);
    } catch (error) {
      alert(`獲取圖片 URL 失敗：${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return {
    image,
    imagePreview,
    uploading,
    uploadImage,setImage,setImagePreview
  };
}