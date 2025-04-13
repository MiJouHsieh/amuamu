import { RECIPE_LIST } from "src/constants.js";
import { RECIPE_TYPES } from "src/constants.js";
import { useState } from "react";

export function HomePage() {
  const [selectedTag, setSelectedTag] = useState("All products")

  const filteredRecipes =
    selectedTag === "All products"
      ? RECIPE_LIST
      : RECIPE_LIST.filter((item) =>
          item.tags.includes(selectedTag.toLowerCase()),
        );

  return (
    <main className="archBackground flex h-full min-h-screen w-full justify-center">
      <div className="flex w-full flex-col gap-y-6 px-6 py-12 500:max-w-[28rem] md:max-w-[700px] 990:max-w-[1400px]">
        <h1 className="mb-6 w-full text-center font-youngSerif text-6xl text-orange">
          Amuamu
        </h1>
        {/* tags */}
        <section className="flex flex-col gap-y-4 text-2xl text-yellow400 990:px-12">
          <h3>All Recipes</h3>

          <div className="flex flex-wrap gap-3 text-beige">
            {RECIPE_TYPES.map((tag) => (
              <button
                key={tag}
                className={`tagBtn ${selectedTag === tag ? "selectedBtn" : ""}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        <hr className="border border-yellow200/70" />

        <div className="flex w-full flex-wrap justify-center gap-6">
          {/* cards */}
          {filteredRecipes.map((item) => (
            <div
              className="flex w-[350px] flex-col items-center gap-3 rounded-2xl bg-white300 py-4 text-white outline md:w-[300px] 990:w-[350px]"
              key={item.id}
            >
              <div className="h-[250px] w-[300px] overflow-hidden rounded-3xl border-[3px] border-orange600 hover:border-orange md:h-[280px] md:w-[280px]">
                <img
                  className="homePageFoodCardImg"
                  src={item.src}
                  alt="food image"
                />
              </div>
              <h3 className="text-center text-2xl font-semibold text-blue800">
                {item.title}
              </h3>
              <p className="space-x-2 text-sm text-orange900">
                <span className="inline-flex w-auto items-center gap-x-2 rounded-full bg-beige px-3 py-1">
                  ⏱️ {item.preparation}
                </span>
                <span className="inline-flex w-auto items-center gap-x-2 rounded-full bg-beige px-3 py-1">
                  🍳 {item.cookTime}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
