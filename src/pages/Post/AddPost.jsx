import { HiPlusCircle } from "react-icons/hi";
import { useState } from "react";
import { IngredientCollection } from "src/components/IngredientCollection";
import TextareaAutosize from "react-textarea-autosize";

export function AddPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [preparation, setPreparation] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const [note, setNote] = useState("");
  const [directions, setDirections] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChangePreparation = (event) => {
    event.preventDefault();
    setPreparation([
      ...preparation,
      {
        preparationTime: "",
        cookTime: "",
        servings: "",
      },
    ]);
  };

  const handleAddTodo = (e) => {
    // 確認有無輸入資料
    if (ingredientInput.trim().length === 0) {
      return;
    }
    // 新增輸入的資料 物件
    setIngredients((prevIngredients) => {
      return [
        ...prevIngredients,
        {
          id: Math.random() * 100,
          title: ingredientInput.trim(),
          isDone: false,
        },
      ];
    });
    setIngredientInput(""); // clean input
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (ingredientInput.trim().length === 0) return;
    e.preventDefault(); // 阻止換行產生

    // 新增輸入的 ingredient 物件
    setIngredients((prevIngredients) => {
      return [
        ...prevIngredients,
        {
          id: Math.random() * 100,
          title: ingredientInput.trim(),
          isDone: false,
        },
      ];
    });
    setIngredientInput("");
  };

  const handleSave = ({ id, title }) => {
    setIngredients((prevIngredients) => {
      return prevIngredients.map((ingredient) => {
        if (ingredient.id === id) {
          return {
            ...ingredient,
            id,
            title,
            isEdit: false,
          };
        }
        return ingredient;
      });
    });
  };

  const handleDelete = (id) => {
    setIngredients((prevIngredients) => {
      return prevIngredients.filter((ingredient) => {
        return ingredient.id !== id;
      });
    });
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setIngredients((prevIngredients) => {
      return prevIngredients.map((ingredient) => {
        if (ingredient.id === id) {
          return {
            ...ingredient,
            isEdit,
          };
        }
        return { ...ingredient, isEdit: false };
      });
    });
  };

  const uploadImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      console.log("選擇的圖片", file);
      const imagePreview = URL.createObjectURL(file);
      setImagePreview(imagePreview);
    }
  };
  return (
    <section className="flex w-full justify-center rounded-tl-[150px] rounded-tr-[150px] bg-blue800 bg-[url('/src/assets/images/img-noise.png')] md:text-xl md:leading-9 990:text-2xl 1440:max-w-[1110px]">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center px-6 py-12 md:max-w-[600px] 990:max-w-[800px]">
        <h1 className="mb-10 font-youngSerif text-4xl text-orange md:text-5xl 990:text-6xl">
          Create a Recipe
        </h1>
        {/* form */}
        <form className="block w-full space-y-3 md:space-y-5 990:space-y-6">
          {/* title */}
          <div className="hover:addPostShadow flex items-center justify-between p-4 transition-all duration-200 md:p-6">
            <label className="form-label text-orange">
              Recipe Name
            </label>

            <input
              className="inputField darkInputField bg-beige"
              value={title}
              placeholder="recipe name"
              name="name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* image */}
          <div className="hover:addPostShadow flex w-full flex-col items-start justify-between gap-y-4 p-4">
            <label className="form-label text-orange">
              Recipe image
            </label>
            <input
              type="file"
              className="w-full cursor-pointer rounded-md bg-[#1E1E3F] p-2 text-[#FFD28F]/70 outline-none"
              accept="image/*"
              onChange={uploadImage}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mx-auto max-h-[300px] max-w-[300px] rounded-md object-cover md:max-h-[500px] md:max-w-[500px]"
              />
            )}
          </div>

          {/* recipe info */}
          <div className="hover:addPostShadow mx-auto flex flex-col gap-y-4 p-4">
            <div className="flex items-center justify-between">
              <label className="form-label text-orange">
                Preparation
              </label>
              <input
                className="inputField darkInputField"
                value={preparation.preparationTime}
                placeholder="🕒 preparation time"
                name="preparationTime"
                onChange={(e) =>
                  handleChangePreparation(e.target.value)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="form-label text-orange">
                Cook time
              </label>
              <input
                className="inputField darkInputField bg-[#3A3A6A]"
                placeholder="🧑‍🍳 cook time"
                value={preparation.cookTime}
                onChange={(e) =>
                  handleChangePreparation(e.target.value)
                }
                name="preparationTime"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="form-label text-orange">
                Servings
              </label>
              <input
                className="inputField darkInputField"
                placeholder="🍽 servings"
                value={preparation.servings}
                onChange={(e) =>
                  handleChangePreparation(e.target.value)
                }
                name="servings"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="hover:addPostShadow flex w-full flex-col items-start gap-y-2 p-4">
            <label className="form-label w-full text-orange">
              Ingredients
            </label>
            <div className="flex w-full items-center justify-between gap-x-4">
              <TextareaAutosize
                rows={5}
                spellCheck={false}
                className="inputField darkInputField flex-1 resize-none overflow-auto"
                value={ingredientInput}
                placeholder="🥕 add ingredient"
                onChange={(e) =>
                  setIngredientInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                type="text"
              />

              {ingredientInput.length > 0 && (
                <HiPlusCircle
                  className="h-8 w-8 cursor-pointer text-orange md:h-10 md:w-10"
                  type="button"
                  onClick={handleAddTodo}
                />
              )}
            </div>
            <IngredientCollection
              ingredients={ingredients}
              onSave={handleSave}
              onDelete={handleDelete}
              onChangeMode={handleChangeMode}
            />
          </div>

          {/* note */}
          <div className="hover:addPostShadow flex w-full flex-col items-start justify-between gap-y-2 p-4">
            <label className="form-label text-orange">Note</label>
            <TextareaAutosize
              className="inputField darkInputField w-full"
              value={note}
              placeholder="🗒️note"
              onChange={(e) => setNote(e.target.value)}
              cacheMeasurements
            />
          </div>
        </form>
      </div>
    </section>
  );
}
