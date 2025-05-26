import { useState } from "react";
import { supabase } from "src/supabaseClient";

export function useUserAvatarUpload() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [localFileName, setLocalFileName] = useState(null);

  const uploadImage = async (event) => {
    try {
      setUploading(true);

      const file = event.target.files[0];

      if (!file) {
        console.log("No image selected, skipping upload.");
        return;
      }
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`; // 建立檔案路徑

    if (file) {
        setImage([file]);
        setLocalFileName(file.name)
        const imagePreview = URL.createObjectURL(file);
        setImagePreview(imagePreview);
      }

      // 上傳圖片到 Supabase
      let { error: uploadError } = await supabase.storage
        .from("user-avatar")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      await getURL(filePath);
    } catch (error) {
      alert(`Failed to upload user avatar：${error.message}`);
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
        console.error(`Failed to get image URL. ${error.message}`);
      } finally {
        setUploading(false);
      }
    };

  return {
    image,
    imagePreview,
    uploading,
    uploadImage, 
    setImage, 
    setImagePreview,
    localFileName,
    setLocalFileName,
  };
}