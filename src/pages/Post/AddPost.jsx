import { HiPlusCircle } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

import { useState, useEffect } from "react";
import { IngredientCollection } from "src/components/post/IngredientCollection";
import { InstructionsCollection } from "src/components/post/InstructionsCollection";
import { TagsInput } from "src/components/post/TagsInput";
import { RecipeFormButtons } from "src/components/post/RecipeFormButtons";
import { FormLabel } from "src/components/post/FormLabel";

import TextareaAutosize from "react-textarea-autosize";
import { useListItemActions } from "src/hooks/useListItemActions";
import { useConfetti } from "src/hooks/useConfetti";
import { useImageUpload } from "src/hooks/useImageUpload";
import { supabase } from "src/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";
import { useDropzone } from "react-dropzone";
import toast, { Toaster } from "react-hot-toast";

export function AddPost() {
  const [title, setTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");

  const [preparation, setPreparation] = useState({
    preparationTime: "",
    cookTime: "",
    servings: "",
  });
  const [originalPreparation, setOriginalPreparation] = useState({
    preparationTime: "",
    cookTime: "",
    servings: "",
  });

  const [tags, setTags] = useState([]);
  const [originalTags, setOriginalTags] = useState([]);

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [originalIngredients, setOriginalIngredients] = useState([]);

  const [instructionsInput, setInstructionsInput] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [originalInstructions, setOriginalInstructions] = useState([]);

  const [note, setNote] = useState("");
  const [originalNote, setOriginalNote] = useState("");

  const { images, imagePreview, uploading, uploadImages, setImages, setImagePreview } =
    useImageUpload();

  const [originalImage, setOriginalImage] = useState([]);
  const { handleAddItem, handleKeyDown, handleSave, handleDelete, handleChangeMode } =
    useListItemActions();
  const { triggerConfetti } = useConfetti();

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
        console.error("Failed to load recipe", error);
        return;
      }
      if (data.draft_data && Object.keys(data.draft_data).length > 0 && data.draft_data.title) {
        const draft = data.draft_data;
        setTitle(draft.title);
        setImages(Array.isArray(draft.image) ? draft.image : [draft.image]);

        if (Array.isArray(draft.image)) {
          setImagePreview(draft.image);
        } else if (typeof draft.image === "string") {
          setImagePreview([draft.image]);
        } else {
          setImagePreview([]);
        }

        setTags(draft.tags);
        setPreparation(draft.preparation);
        setIngredients(draft.ingredients);
        setInstructions(draft.instructions);
        setNote(draft.note);
      } else {
        setTitle(data.recipe_name);
        setOriginalTitle(data.recipe_name);
        setImages(Array.isArray(data.image) ? data.image : [data.image]);
        setOriginalImage(Array.isArray(data.image) ? data.image : [data.image]);
        setImagePreview(Array.isArray(data.image) ? data.image : [data.image]);
        setTags(data.tags);
        setOriginalTags(data.tags);
        setPreparation(data.preparation);
        setOriginalPreparation(data.preparation);
        setIngredients(data.ingredients);
        setOriginalIngredients(data.ingredients);
        setInstructions(data.instructions);
        setOriginalInstructions(data.instructions);
        setNote(data.note);
        setOriginalNote(data.note);
      }
    };

    fetchRecipe();
  }, [user, navigate, id, setImages, setImagePreview]);

  useEffect(() => {
    if (!isEditMode) return;
    if (!user?.id || !id) return;

    const isChanged =
      title !== originalTitle ||
      note !== originalNote ||
      JSON.stringify(tags) !== JSON.stringify(originalTags) ||
      JSON.stringify(preparation) !== JSON.stringify(originalPreparation) ||
      JSON.stringify(images) !== JSON.stringify(originalImage) ||
      JSON.stringify(ingredients) !== JSON.stringify(originalIngredients) ||
      JSON.stringify(instructions) !== JSON.stringify(originalInstructions);

    if (!isChanged) {
      console.log("🛑 No changes, skip autosave");
      return;
    }
    const timer = setTimeout(async () => {
      const safeImages = images.filter(Boolean);
      const draftPayload = {
        title,
        tags,
        ingredients,
        instructions,
        note,
        preparation,
        image: safeImages,
      };

      const { error } = await supabase
        .from("recipe")
        .update({ draft_data: draftPayload })
        .eq("id", id);

      if (error) {
        console.error("⚠️ Failed to autosave draft", error);
      } else {
        console.log("💾 Draft saved to Supabase");
      }
    }, 1000);
    return () => clearTimeout(timer); // cleanup：輸入過程中清除舊的 timer
  }, [
    title,
    tags,
    note,
    preparation,
    images,
    ingredients,
    instructions,
    originalTitle,
    originalTags,
    originalNote,
    originalPreparation,
    originalImage,
    originalIngredients,
    originalInstructions,
    user?.id,
    id,
    isEditMode,
  ]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    uploadImages(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: true,
  });

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

  const handleSaveIngredient = ({ id, title }) => {
    handleSave({
      id,
      title,
      items: ingredients,
      setItems: setIngredients,
    });
  };
  const handleSaveInstructions = ({ id, title }) => {
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

  const handleChangeModeIngredient = ({ id, isEdit }) => {
    handleChangeMode({
      id,
      isEdit,
      items: ingredients,
      setItems: setIngredients,
    });
  };
  const handleChangeModeInstructions = ({ id, isEdit }) => {
    handleChangeMode({
      id,
      isEdit,
      items: instructions,
      setItems: setInstructions,
    });
  };

  const addRecipe = async ({ title, images, preparation, ingredients, instructions, note }) => {
    const updates = {
      user_id: user.id,
      id: uuidv4(),
      recipe_name: title,
      image: images,
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
      await triggerConfetti();
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
    images,
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
        image: images,
        preparation,
        tags,
        ingredients,
        instructions,
        note,
        draft_data: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploading) {
      alert("⏳ Upload in progress, please wait...");
      return;
    }
    if (!title.trim()) {
      alert("⚠️ Don't forget to name your recipe!");
      return;
    }
    if (ingredients.length === 0) {
      alert("⚠️ You'll need at least one ingredient to get started.");
      return;
    }
    if (instructions.length === 0) {
      alert("⚠️ Please add at least one cooking step.");
      return;
    }

    // 在這裡過濾掉 invalid/null 的圖片，移除 null, undefined, 空字串
    const safeImages = images.filter(Boolean);

    const payload = {
      title,
      images: safeImages,
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

  const handleCancelEdit = async () => {
    setTitle(originalTitle);
    setImages(originalImage);
    setPreparation(originalPreparation);
    setTags(originalTags);
    setIngredients(originalIngredients);
    setInstructions(originalInstructions);
    setNote(originalNote);

    // 清空 Supabase 的 draft_data 欄位
    if (isEditMode) {
      const { error } = await supabase.from("recipe").update({ draft_data: null }).eq("id", id);
      if (error) console.error("❌ Failed to clear draft_data", error);
    }

    alert("Draft cleared. You're now viewing the original version.");
    navigate(`/recipe-page/${id}`);
  };

  const handleDeleteRecipe = async () => {
    const confirmDelete = confirm("⚠️ Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("recipe").delete().eq("id", id);
    if (error) {
      alert("❌ Failed to delete recipe: " + error.message);
      return;
    }

    alert("✅ Recipe deleted successfully.");
    navigate("/");
  };

  const handleRemoveImage = (indexToRemove) => {
    setImagePreview((prev) => prev.filter((_, index) => index !== indexToRemove));
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    toast.success("Deleted image!", {
      style: {
        border: "1px solid #62381F",
        padding: "16px",
        color: "#62381F",
        background: "#DFCFB4",
      },
      iconTheme: {
        primary: "#62381F",
        secondary: "#F9F8F3",
      },
    });
  };

  return (
    user && (
      <section className="archBackground flex w-full justify-center md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
        <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center px-6 py-12 md:max-w-[600px] 990:max-w-[800px]">
          <h1 className="mb-10 text-3xl font-youngSerif text-orange 500:text-4xl md:text-5xl 990:text-6xl">
            {isEditMode ? "Edit Recipe" : "Create a Recipe"}
          </h1>
          {isEditMode && (
            <div className="w-full p-4 space-y-6 border rounded-xl border-yellow/50 text-beige text-beige/70 500:w-auto">
              <p>• Changes are autosaved as a draft.</p>
              <p>• Draft changes stay in edit mode until you update the recipe.</p>
              <p>• Cancel edit restores the original recipe.</p>
            </div>
          )}
          {/* form */}
          <form className="block w-full space-y-3 md:space-y-5 990:space-y-6">
            {/* title */}
            <div className="p-4 transition-all duration-200 addPostShadow inputFieldContainer">
              <FormLabel required>Recipe Name</FormLabel>
              <input
                className="w-full inputField darkInputField bg-beige 500:w-auto"
                value={title}
                placeholder="🧁 e.g. Chocolate Cake"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 多圖支援 */}
            <div className="p-4 transition-all duration-200 addPostShadow inputFieldContainer">
              <FormLabel>Recipe Images</FormLabel>
              <div
                {...getRootProps()}
                className="inputField darkInputField flex w-full cursor-pointer items-center 500:w-auto 500:min-w-[220px] 500:max-w-[327px] md:min-w-[286px] 990:min-w-[327px]"
              >
                <input {...getInputProps()} className="sr-only" />
                <p className="text-[#FFD28F]/50">🖼️ Upload images</p>
              </div>
            </div>

            {Array.isArray(imagePreview) && imagePreview.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
                {imagePreview.map((src, index) => (
                  <div key={index} className="relative h-[150px] w-[150px]">
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index}`}
                      className="h-[150px] w-[150px] rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute p-1 text-base text-white rounded-full right-1 top-1 bg-blue800/70 hover:text-orange active:text-orange"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* 檔案名稱 */}
            {images.length > 0 && (
              <ul className="mt-2 text-sm">
                {images.map((url, index) => (
                  <li key={index} className="mt-1 text-xs break-all text-beige300">
                    📁 {url ? url.split("/").pop() : "Invalid image"}
                  </li>
                ))}
              </ul>
            )}
            <Toaster />

            {/* recipe info */}
            <div className="flex flex-col w-full p-4 mx-auto overflow-hidden addPostShadow gap-y-4">
              <div className="w-full inputFieldContainer">
                <FormLabel>Preparation Time</FormLabel>
                <input
                  className="w-full inputField darkInputField 500:w-auto"
                  value={preparation.preparationTime}
                  placeholder="⏰ e.g. 30 mins"
                  name="preparationTime"
                  onChange={handleChangePreparation}
                />
              </div>
              <div className="w-full inputFieldContainer 500:w-auto">
                <FormLabel>Cook Time</FormLabel>
                <input
                  className="w-full inputField darkInputField 500:w-auto"
                  placeholder="🧑‍🍳 e.g. 45 mins"
                  value={preparation.cookTime}
                  onChange={handleChangePreparation}
                  name="cookTime"
                />
              </div>
              <div className="w-full inputFieldContainer">
                <FormLabel>Servings</FormLabel>
                <input
                  className="w-full inputField darkInputField 500:w-auto"
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
            <div className="flex flex-col items-start w-full p-4 addPostShadow gap-y-2">
              <FormLabel required className="w-full">
                Ingredients
              </FormLabel>

              <div className="flex items-center justify-between w-full gap-x-4">
                <TextareaAutosize
                  rows={5}
                  spellCheck={false}
                  className="flex-1 overflow-auto resize-none inputField darkInputField"
                  value={ingredientInput}
                  placeholder="🥚 e.g. 2 eggs"
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyDown={handleKeyDownIngredient}
                  type="text"
                />

                {ingredientInput.length > 0 && (
                  <button type="button" onClick={handleAddIngredient} className="activeBtn">
                    <HiPlusCircle className="activeIcon text-orange" />
                  </button>
                )}
              </div>
              {ingredients.length > 0 && (
                <IngredientCollection
                  ingredients={ingredients}
                  onSave={handleSaveIngredient}
                  onDelete={handleDeleteIngredient}
                  onChangeMode={handleChangeModeIngredient}
                />
              )}
            </div>
            {/* Instructions  */}
            <div className="flex flex-col items-start w-full p-4 addPostShadow gap-y-2">
              <FormLabel required className="w-full">
                Instructions
              </FormLabel>
              <div className="flex items-center justify-between w-full gap-x-4">
                <TextareaAutosize
                  rows={5}
                  spellCheck={false}
                  className="flex-1 overflow-auto resize-none inputField darkInputField"
                  value={instructionsInput}
                  placeholder="🥣 e.g. Crack the eggs into a bowl and whisk well"
                  onChange={(e) => setInstructionsInput(e.target.value)}
                  onKeyDown={handleKeyDownInstructions}
                  type="text"
                />

                {instructionsInput.length > 0 && (
                  <button type="button" onClick={handleAddInstructions} className="activeBtn">
                    <HiPlusCircle className="activeIcon text-orange" />
                  </button>
                )}
              </div>
              {instructions.length > 0 && (
                <InstructionsCollection
                  instructions={instructions}
                  onSave={handleSaveInstructions}
                  onDelete={handleDeleteInstructions}
                  onChangeMode={handleChangeModeInstructions}
                />
              )}
            </div>
            {/* note */}
            <div className="flex flex-col items-start w-full p-4 addPostShadow gap-y-2">
              <FormLabel>Note</FormLabel>

              <TextareaAutosize
                className="w-full inputField darkInputField"
                value={note}
                placeholder="📝 Any tips or notes?"
                onChange={(e) => setNote(e.target.value)}
                spellCheck={false}
              />
            </div>
            {/* button */}
            <RecipeFormButtons
              isEditMode={isEditMode}
              uploading={uploading}
              onSubmit={handleSubmit}
              onCancelEdit={handleCancelEdit}
              onDelete={handleDeleteRecipe}
            />
          </form>
        </div>
      </section>
    )
  );
}
