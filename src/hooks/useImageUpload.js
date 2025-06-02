import { useState } from "react";
import { supabase } from "src/supabaseClient";

export function useImageUpload() {
  const [images, setImages] = useState([]); // 多圖 URL
  const [imagePreview, setImagePreview] = useState([]); // 多圖預覽
  const [uploading, setUploading] = useState(false);

  const uploadImages = async (files) => {
    setUploading(true);
    const newPreviews = [];
    const newImageURLs = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        // 本地預覽網址
        newPreviews.push(URL.createObjectURL(file));

        // 上傳圖片
        const { error: uploadError } = await supabase.storage
          .from("recipe-image")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        // 取得公開 URL
        const { publicURL, error: urlError } = supabase.storage
          .from("recipe-image")
          .getPublicUrl(filePath);

        if (urlError) {
          throw urlError;
        }
        newImageURLs.push(publicURL);
      }

      setImagePreview((prev) => Array.isArray(prev) ? [...prev, ...newPreviews] : [...newPreviews]);
      setImages((prev) => Array.isArray(prev) ? [...prev, ...newImageURLs] : [...newImageURLs]);

    } catch (error) {
      alert(`❌ Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return {
    images,
    imagePreview,
    uploading,
    uploadImages,
    setImages,
    setImagePreview,
  };
}
