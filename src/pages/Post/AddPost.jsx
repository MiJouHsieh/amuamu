import { HiPlusCircle } from "react-icons/hi";
import { useState } from "react";
import { IngredientCollection } from "src/components/IngredientCollection";

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
    if (ingredientInput.length === 0) {
      return;
    }
    // 新增輸入的資料 物件
    setIngredients((prevIngredients) => {
      return [
        ...prevIngredients,
        {
          id: Math.random() * 100,
          title: ingredientInput,
          isDone: false,
        },
      ];
    });
    // 輸入框清空
    if (e.key === "Enter") {
      setIngredientInput("");
    }
    setIngredientInput(""); // clean input
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (ingredientInput.length === 0) return;

    // 新增輸入的 ingredient 物件
    setIngredients((prevIngredients) => {
      return [
        ...prevIngredients,
        {
          id: Math.random() * 100,
          title: ingredientInput,
          isDone: false,
        },
      ];
    });
    setIngredientInput(""); // clean input
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
    <section className="flex w-full justify-center rounded-tl-[150px] rounded-tr-[150px] bg-blue800 bg-[url('/src/assets/images/img-noise.png')] md:text-xl 1440:max-w-[1110px]">
      <div className="mx-auto flex flex-col items-center justify-center py-12">
        <h1 className="mb-10 font-youngSerif text-4xl text-orange md:text-5xl">
          create a recipe
        </h1>
        {/* form */}
        <form className="block w-full space-y-3 md:space-y-5">
          {/* title */}
          <div className="flex items-center justify-between p-4 outline">
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
          <div className="flex flex-col items-start justify-between gap-y-4 p-4 outline">
            <label className="form-label text-orange">
              Recipe image
            </label>
            <input
              type="file"
              className="rounded-md bg-[#1E1E3F] text-[#FFD28F]/70 outline-none"
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
          <div className="mx-auto flex flex-col gap-y-4 p-4 outline">
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
          <div className="flex w-full flex-col items-start gap-y-2 p-4 outline">
            <label className="form-label w-full text-orange">
              Ingredients
            </label>
            <div className="flex w-full items-center justify-between gap-x-4">
              <input
                className="inputField darkInputField flex-1"
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
          <div className="flex w-full flex-col items-start justify-between gap-y-2 p-4 outline">
            <label className="form-label text-orange">Note</label>
            <input
              className="inputField darkInputField w-full flex-1"
              value={note}
              placeholder="🗒️note"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
