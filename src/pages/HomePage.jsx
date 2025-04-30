import IconLogo from "src/assets/icons/amuamu-logo.svg?react";
import { useState, useEffect } from "react";
import { useAuth } from "src/context/AuthContext";
import { supabase } from "src/supabaseClient";
import { HomePageCard } from "src/components/HomePageCard";
import { Link } from "react-router-dom";

export function HomePage() {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.name;

  const [selectedTag, setSelectedTag] = useState("All products");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [data, setData] = useState();
  useEffect(() => {
    const getRecipe = async () => {
      try {
        let { data, error, status } = await supabase.from("recipe").select("*");

        if (error && status !== 406) {
          console.log("error", error);
          throw error;
        }
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getRecipe();
  }, []);

  // Collect all tags and remove duplicates
  const uniqueTags = Array.from(
    new Set(data.flatMap((item) => (item.tags ?? []).filter((tag) => tag.trim() !== ""))),
  );

  const filteredRecipes = (data ?? []).filter((item) => {
    const title = item.title ?? "";
    const tags = item.tags ?? [];
    const ingredients = item.ingredients ?? [];

    const matchesTag =
      selectedTag === "All products" ||
      tags.map((tag) => tag.toLowerCase()).includes(selectedTag.toLowerCase());

    const searchKeywordLower = searchKeyword.toLowerCase();
    const matchesSearch =
      title.toLowerCase().includes(searchKeywordLower) ||
      ingredients.some((ing) => (ing.title ?? "").toLowerCase().includes(searchKeywordLower));

    return matchesTag && matchesSearch;
  });

  return (
    <main className="archBackground flex h-full min-h-screen w-full flex-col items-center justify-center py-8">
      <div>
        <IconLogo className="h-40 w-40" />
      </div>
      <div className="flex w-full flex-col items-center gap-y-6 px-6 py-12 500:max-w-[28rem] md:max-w-[700px] 990:max-w-[1400px]">
        {displayName && (
          <h3 className="w-full text-center text-lg font-medium text-white300">
            Welcome back, {displayName} 👩‍🍳
          </h3>
        )}
        {/* search */}
        <div className="relative w-full md:max-w-[700px]">
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Search by Materials"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <span className="absolute right-4 top-3 cursor-pointer text-xl">🔍</span>
        </div>
        {/* tags */}
        <section className="flex flex-col gap-y-4 text-2xl text-yellow400 990:px-12">
          <h3>All Recipes</h3>

          <div className="flex flex-wrap gap-3 text-beige">
            {uniqueTags?.map((tag) => (
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

        {filteredRecipes.length === 0 && (
          <div className="flex w-full justify-center py-4">
            <p className="text-center text-beige">No recipes found.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* filter cards */}
          {filteredRecipes.map((recipe) => (
            <Link to={`/recipe-page/${recipe.id}`}>
              <HomePageCard key={recipe.id} item={recipe} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
