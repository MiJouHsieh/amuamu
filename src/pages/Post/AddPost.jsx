import { HiPlusCircle } from "react-icons/hi";
import { useState, useEffect } from "react";
import { IngredientCollection } from "src/components/IngredientCollection";
import { InstructionsCollection } from "src/components/InstructionsCollection";
import TextareaAutosize from "react-textarea-autosize";
import { useListItemActions } from "src/hooks/useListItemActions";

import { supabase } from "src/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";

export function TagsInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInputValue("");
  };

  const handleDeleteTag = (e, index) => {
    e?.preventDefault?.();
    const newTags = tags.filter((_, idx) => idx !== index);
    setTags(newTags);
  };

  const handleEditTag = (index, newValue) => {
    const newTags = tags.map((tag, idx) => (idx === index ? newValue : tag));
    setTags(newTags);
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-y-2 p-4">
      <div className="hover:addPostShadow flex w-full flex-col items-start gap-y-2">
        <label className="form-label w-full text-orange">Recipe Tags</label>
        <div className="flex w-full items-center justify-between gap-x-4">
          <input
            type="text"
            placeholder="🏷️ e.g. cake"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            className="darkInputField inputField flex-1 resize-none overflow-auto"
          />
          {inputValue.length > 0 && (
            <HiPlusCircle
              className="h-8 w-8 cursor-pointer text-orange md:h-10 md:w-10"
              type="button"
              onClick={handleAddTag}
            />
          )}
        </div>
      </div>

      <div className="hover:addPostShadow flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div key={index} className="tag-container">
            <input
              value={tag}
              style={{ width: `${Math.max(tag.length, 1)}ch` }}
              onChange={(e) => handleEditTag(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && tag.length === 0) {
                  e.preventDefault();
                  handleDeleteTag(e, index);
                } else if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className="tag min-w-[100px]"
            />
            <button onClick={(e) => handleDeleteTag(e, index)} className="mr-2 text-blue300">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AddPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [preparation, setPreparation] = useState({
    preparationTime: "",
    cookTime: "",
    servings: "",
  });
  const [tags, setTags] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [instructionsInput, setInstructionsInput] = useState("");
  const [instructions, setInstructions] = useState([]);

  const [note, setNote] = useState("");
  const [uploading, setUploading] = useState(false);

  const { handleAddItem, handleKeyDown, handleSave, handleDelete, handleChangeMode } =
    useListItemActions();

  const { user } = useAuth();
  const { id } = useParams(); // edit mode with id
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) {
      alert("✨ Please log in first. ✨");
      navigate("/login");
      return;
    }

    //fetchRecipe for edit mode
    const fetchRecipe = async () => {
      if (!id) return;

      const { data, error } = await supabase.from("recipe").select("*").eq("id", id).single();

      if (error) {
        console.error("載入食譜錯誤", error);
      } else {
        setTitle(data.recipe_name);
        setImage(data.image || []);
        setImagePreview(data.image?.[0]);
        setTags(data.tags);
        setPreparation(data.preparation);
        setIngredients(data.ingredients);
        setInstructions(data.instructions);
        setNote(data.note);
      }
    };

    fetchRecipe();
  }, [user, navigate, id]);

  // 避免 user 為 null 的一瞬間就跑出錯誤
  if (!user) return null;

  const handleChangePreparation = (e) => {
    const { name, value } = e.target;
    setPreparation((prevPreparation) => ({
      ...prevPreparation,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    handleAddItem(ingredientInput, setIngredientInput, setIngredients);
  };
  const handleAddInstructions = () => {
    handleAddItem(instructionsInput, setInstructionsInput, setInstructions);
  };

  const handleKeyDownIngredient = (e) => {
    handleKeyDown(e, ingredientInput, setIngredientInput, setIngredients);
  };
  const handleKeyDownInstructions = (e) => {
    handleKeyDown(e, instructionsInput, setInstructionsInput, setInstructions);
  };

  const handleSaveIngredient = (id, title) => {
    handleSave({
      id,
      title,
      items: ingredients,
      setItems: setIngredients,
    });
  };
  const handleSaveInstructions = (id, title) => {
    handleSave({
      id,
      title,
      items: instructions,
      setItems: setInstructions,
    });
  };

  const handleDeleteIngredient = (id) => {
    handleDelete(id, setIngredients);
  };
  const handleDeleteInstructions = (id) => {
    handleDelete(id, setInstructions);
  };

  const handleChangeModeIngredient = (id, title) => {
    handleChangeMode({
      id,
      title,
      items: ingredients,
      setItems: setIngredients,
    });
  };
  const handleChangeModeInstructions = (id, title) => {
    handleChangeMode({
      id,
      title,
      items: instructions,
      setItems: setInstructions,
    });
  };

  const addRecipe = async ({ title, image, preparation, ingredients, instructions, note }) => {
    const updates = {
      user_id: user.id,
      id: uuidv4(),
      recipe_name: title,
      image: image,
      tags: tags,
      preparation: preparation,
      ingredients: ingredients,
      instructions: instructions,
      note: note,
    };

    try {
      console.log("🧪 目前登入者 id：", user?.id);
      console.log("🧪 傳送到 supabase 的資料：", updates);

      const { error } = await supabase.from("recipe").insert([updates]);
      if (error) {
        throw error;
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("⚠️ Oops, there was a problem.", error.message);
      console.error(error);
    }
  };

  const updateRecipe = async ({
    title,
    image,
    preparation,
    tags,
    ingredients,
    instructions,
    note,
  }) => {
    try {
      const updates = {
        user_id: user.id,
        recipe_name: title,
        image,
        preparation,
        tags,
        ingredients,
        instructions,
        note,
      };

      const { error } = await supabase.from("recipe").update(updates).eq("id", id);
      if (error) {
        throw error;
      } else {
        navigate(`/recipe-page/${id}`);
      }
    } catch (error) {
      alert("⚠️ Failed to update: " + error.message);
    }
  };

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
        setImage(file);
        console.log("選擇的圖片", file);
        const imagePreview = URL.createObjectURL(file);
        setImagePreview(imagePreview);
      }

      // 上傳圖片到 Supabase
      let { data, error: uploadError } = await supabase.storage
        .from("recipe-image")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      getURL(filePath);
      console.log("Upload successful! Image URL:", data.path);
    } catch (error) {
      alert(`Failed to upload image：${error.message}`);
    }
  };

  const getURL = async (url) => {
    try {
      // 從 Supabase 取得公開 URL
      const { publicURL, error } = await supabase.storage.from("recipe-image").getPublicUrl(url);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      image,
      preparation,
      tags,
      ingredients,
      instructions,
      note,
    };
    if (isEditMode) {
      await updateRecipe(payload);
    } else {
      await addRecipe(payload);
    }
  };

  return (
    user && (
      <section className="flex w-full justify-center rounded-tl-[150px] rounded-tr-[150px] bg-blue800 bg-[url('/src/assets/images/img-noise.png')] md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
        <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center px-6 py-12 md:max-w-[600px] 990:max-w-[800px]">
          <h1 className="mb-10 font-youngSerif text-4xl text-orange md:text-5xl 990:text-6xl">
            Create a Recipe
          </h1>
          {/* form */}
          <form className="block w-full space-y-3 md:space-y-5 990:space-y-6">
            {/* title */}
            <div className="hover:addPostShadow flex items-center justify-between p-4 transition-all duration-200 md:p-6">
              <label className="form-label text-orange">Recipe Name</label>

              <input
                className="inputField darkInputField bg-beige"
                value={title}
                placeholder="🧁 e.g. Chocolate Cake"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* image */}
            <div className="hover:addPostShadow flex w-full flex-col items-start justify-between gap-y-4 p-4">
              <label className="form-label text-orange">Recipe image</label>
              <input
                type="file"
                className="w-full cursor-pointer rounded-md bg-[#1E1E3F] p-2 text-[#FFD28F]/70 outline-none"
                accept="image/*"
                onChange={uploadImage}
              />
              <p className="-mt-1 text-xs text-white300">
                {isEditMode
                  ? "Wanna update a tasty food image? 🍽️"
                  : "Please choose a photo of a dish"}
              </p>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview image"
                  className="mx-auto h-[300px] w-[300px] rounded-md object-cover object-center md:h-[400px] md:w-[400px] 1440:h-[480px] 1440:w-[480px]"
                />
              )}
              {image?.length > 0 && (
                <p className="mt-1 break-all text-xs text-beige300">
                  📁 {typeof image[0] === "string" ? image[0].split("/").pop() : image[0]?.name}
                </p>
              )}
            </div>
            {/* recipe info */}
            <div className="hover:addPostShadow mx-auto flex flex-col gap-y-4 p-4">
              <div className="flex items-center justify-between">
                <label className="form-label text-orange">Preparation Time</label>
                <input
                  className="inputField darkInputField"
                  value={preparation.preparationTime}
                  placeholder="⏰ e.g. 30 mins"
                  name="preparationTime"
                  onChange={handleChangePreparation}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="form-label text-orange">Cook time</label>
                <input
                  className="inputField darkInputField bg-[#3A3A6A]"
                  placeholder="🧑‍🍳 e.g. 45 mins"
                  value={preparation.cookTime}
                  onChange={handleChangePreparation}
                  name="cookTime"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="form-label text-orange">Servings</label>
                <input
                  className="inputField darkInputField"
                  placeholder=" 🍽 e.g. 2 people "
                  value={preparation.servings}
                  onChange={handleChangePreparation}
                  name="servings"
                />
              </div>
            </div>
            {/* Multiple Tags  */}
            <TagsInput tags={tags} setTags={setTags} />

            {/* Ingredients */}
            <div className="hover:addPostShadow flex w-full flex-col items-start gap-y-2 p-4">
              <label className="form-label w-full text-orange">Ingredients</label>
              <div className="flex w-full items-center justify-between gap-x-4">
                <TextareaAutosize
                  rows={5}
                  spellCheck={false}
                  className="inputField darkInputField flex-1 resize-none overflow-auto"
                  value={ingredientInput}
                  placeholder="🥚 e.g. 2 eggs"
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyDown={handleKeyDownIngredient}
                  type="text"
                />

                {ingredientInput.length > 0 && (
                  <HiPlusCircle
                    className="activeBtn text-orange"
                    type="button"
                    onClick={handleAddIngredient}
                  />
                )}
              </div>
              <IngredientCollection
                ingredients={ingredients}
                onSave={handleSaveIngredient}
                onDelete={handleDeleteIngredient}
                onChangeMode={handleChangeModeIngredient}
              />
            </div>
            {/* Instructions  */}
            <div className="hover:addPostShadow flex w-full flex-col items-start gap-y-2 p-4">
              <label className="form-label w-full text-orange">Instructions</label>
              <div className="flex w-full items-center justify-between gap-x-4">
                <TextareaAutosize
                  rows={5}
                  spellCheck={false}
                  className="inputField darkInputField flex-1 resize-none overflow-auto"
                  value={instructionsInput}
                  placeholder="🥣 e.g. Crack the eggs into a bowl and whisk well"
                  onChange={(e) => setInstructionsInput(e.target.value)}
                  onKeyDown={handleKeyDownInstructions}
                  type="text"
                />

                {instructionsInput.length > 0 && (
                  <HiPlusCircle
                    className="activeBtn text-orange"
                    type="button"
                    onClick={handleAddInstructions}
                  />
                )}
              </div>
              <InstructionsCollection
                instructions={instructions}
                onSave={handleSaveInstructions}
                onDelete={handleDeleteInstructions}
                onChangeMode={handleChangeModeInstructions}
              />
            </div>
            {/* note */}
            <div className="hover:addPostShadow flex w-full flex-col items-start justify-between gap-y-2 p-4">
              <label className="form-label text-orange">Note</label>
              <TextareaAutosize
                className="inputField darkInputField w-full"
                value={note}
                placeholder="📝 Any tips or notes?"
                onChange={(e) => setNote(e.target.value)}
                spellCheck={false}
              />
            </div>
            {/* button */}
            <button
              type="submit"
              className="submitBtn"
              disabled={
                uploading || !title.trim() || ingredients.length === 0 || instructions.length === 0
              }
              aria-label="Submit recipe form"
              onClick={handleSubmit}
            >
              {uploading ? "uploading..." : isEditMode ? "📘 Update recipe" : "📖 Add recipe"}
            </button>
          </form>
        </div>
      </section>
    )
  );
}
