import { HiPlusCircle } from "react-icons/hi";
import { useState, useEffect } from "react";
import { IngredientCollection } from "src/components/post/IngredientCollection";
import { InstructionsCollection } from "src/components/post/InstructionsCollection";
import { TagsInput } from "src/components/post/TagsInput";
import { RecipeFormButtons } from "src/components/post/RecipeFormButtons";
import TextareaAutosize from "react-textarea-autosize";
import { useListItemActions } from "src/hooks/useListItemActions";
import { useConfetti } from "src/hooks/useConfetti";
import { useImageUpload } from "src/hooks/useImageUpload";
import { supabase } from "src/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";

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

  const { image, imagePreview, uploading, uploadImage, setImage, setImagePreview } =
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
        setImage(draft.image || []);
        setImagePreview(draft.image?.[0]);
        setTags(draft.tags);
        setPreparation(draft.preparation);
        setIngredients(draft.ingredients);
        setInstructions(draft.instructions);
        setNote(draft.note);
      } else {
        setTitle(data.recipe_name);
        setOriginalTitle(data.recipe_name);
        setImage(data.image || []);
        setOriginalImage(data.image || []);
        setImagePreview(data.image?.[0]);
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
  }, [user, navigate, id, setImage, setImagePreview]);

  useEffect(() => {
    if (!isEditMode) return;
    if (!user || !id) return;

    const isChanged =
      title !== originalTitle ||
      note !== originalNote ||
      JSON.stringify(tags) !== JSON.stringify(originalTags) ||
      JSON.stringify(preparation) !== JSON.stringify(originalPreparation) ||
      JSON.stringify(image) !== JSON.stringify(originalImage) ||
      JSON.stringify(ingredients) !== JSON.stringify(originalIngredients) ||
      JSON.stringify(instructions) !== JSON.stringify(originalInstructions);

    if (!isChanged) {
      console.log("🛑 No changes, skip autosave");
      return;
    }
    const timer = setTimeout(async () => {
      const draftPayload = {
        title,
        tags,
        ingredients,
        instructions,
        note,
        preparation,
        image,
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
    image,
    ingredients,
    instructions,
    originalTitle,
    originalTags,
    originalNote,
    originalPreparation,
    originalImage,
    originalIngredients,
    originalInstructions,
    user,
    id,
    isEditMode,
  ]);

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
    console.log("🧪 ingredients", ingredients);
    console.log("🧪 instructions", instructions);
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

  const handleCancelEdit = async () => {
    setTitle(originalTitle);
    setImage(originalImage);
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

  return (
    user && (
      <section className="archBackground flex w-full justify-center md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
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
                  <button type="button" onClick={handleAddIngredient} className="activeBtn">
                    <HiPlusCircle className="activeIcon text-orange" />
                  </button>
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
                  <button type="button" onClick={handleAddInstructions} className="activeBtn">
                    <HiPlusCircle className="activeIcon text-orange" />
                  </button>
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
            <RecipeFormButtons
              isEditMode={isEditMode}
              uploading={uploading}
              // disabled={isSubmitDisabled}
              onSubmit={handleSubmit}
              onCancelEdit={handleCancelEdit}
            />
          </form>
        </div>
      </section>
    )
  );
}
