import { RECIPE_LIST } from "src/constants.js";
import { RECIPE_TYPES } from "src/constants.js";
import { useState } from "react";
import { useAuth } from "src/context/AuthContext";

export function HomePage() {
  
  const { user } = useAuth();
  const displayName = user?.user_metadata?.name;

  const [selectedTag, setSelectedTag] = useState("All products");
  const [searchKeyword, setSearchKeyword] = useState("");

  const filteredRecipes = RECIPE_LIST.filter((item) => {
    const matchesTag =
      selectedTag === "All products" ||
      item.tags.includes(selectedTag.toLowerCase());

    const matchesSearch =
      item.title
        .toLowerCase()
        .includes(searchKeyword.toLowerCase()) ||
      item.ingredients.some((ing) =>
        ing.title
          ?.toLowerCase()
          .includes(searchKeyword.toLowerCase()),
      );

    return matchesTag && matchesSearch;
  });

  return (
    <main className="archBackground flex h-full min-h-screen w-full justify-center">
      <div className="flex w-full flex-col items-center gap-y-6 px-6 py-12 500:max-w-[28rem] md:max-w-[700px] 990:max-w-[1400px]">
        <h1 className="mb-6 w-full text-center font-youngSerif text-6xl text-orange">
          Amuamu
        </h1>
        <h3 className="mb-4 mt-2 w-full text-center text-lg font-medium text-white300">
          Welcome back, {displayName} 👩‍🍳
        </h3>
        {/* search */}
        <div className="relative w-full md:max-w-[700px]">
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Search by Materials"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <span className="absolute right-4 top-3 cursor-pointer text-xl">
            🔍
          </span>
        </div>
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

        <hr className="w-full border border-yellow200/70" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
