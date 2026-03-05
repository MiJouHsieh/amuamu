import { GoSearch } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import IconLogo from "src/assets/icons/amuamu-logo.svg?react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "src/context/AuthContext";
import { supabase } from "src/supabaseClient";
import { HomePageCard } from "src/components/homePage/HomePageCard";
import { Link } from "react-router-dom";
import Fuse from "fuse.js";

const ALL_TAG = "All Recipes";

export function HomePage() {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.name;

  const [selectedTag, setSelectedTag] = useState(ALL_TAG);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const getRecipe = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const { data, error, status } = await supabase.from("recipe").select("*");

      if (error && status !== 406) {
        console.log("error", error);
        throw error;
      }

      setData(data ?? []);
    } catch (error) {
      console.log(error);
      const message = error instanceof Error ? error.message : "Failed to fetch recipes";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  // Collect all tags and remove duplicates
  const uniqueTags = useMemo(() => {
    const allTags = (data ?? [])
      .flatMap((item) => item.tags ?? [])
      .map((tag) => tag.trim())
      .filter(Boolean);

    const tagMap = new Map();

    for (const tag of allTags) {
      const normalizedTag = tag.toLowerCase();
      if (!tagMap.has(normalizedTag)) {
        tagMap.set(normalizedTag, tag);
      }
    }
    return Array.from(tagMap.values()).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const fuse = useMemo(() => {
    return new Fuse(data ?? [], {
      keys: ["title", "tags", "ingredients.title"],
      threshold: 0.3,
    });
  }, [data]);

  const searchResults = useMemo(() => {
    const keyword = searchKeyword.trim();
    if (!keyword) return data ?? [];
    return fuse.search(keyword).map((result) => result.item);
  }, [searchKeyword, data, fuse]);

  const filteredRecipes = useMemo(() => {
    const selectedTagLower = selectedTag.toLowerCase();
    return searchResults.filter((item) => {
      const tags = item.tags ?? [];
      return selectedTag === ALL_TAG || tags.some((tag) => tag?.toLowerCase() === selectedTagLower);
    });
  }, [searchResults, selectedTag]);

  return (
    <main className="flex flex-col items-center justify-center w-full h-full min-h-screen py-8 archBackground">
      <div>
        <IconLogo className="w-40 h-40" />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center gap-y-6 px-6 py-12 500:max-w-[28rem] md:max-w-[700px] 990:max-w-[1400px]">
        {displayName && (
          <h3 className="w-full text-lg font-medium text-center text-white300">
            Welcome back, {displayName} 👩‍🍳
          </h3>
        )}
        {/* search */}
        <div className="relative w-full md:max-w-[700px]">
          <input
            value={searchKeyword}
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Search recipes, tags, or ingredients..."
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <span className="absolute text-xl -translate-y-1/2 left-4 top-1/2">
            <GoSearch className="text-white" />
          </span>
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword("")}
              className="absolute text-xl -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              <RxCross2 className="text-white hover:text-orange active:text-orange" />
            </button>
          )}
        </div>
        {/* tags */}
        <section className="flex flex-col text-2xl gap-y-4 text-yellow400 990:px-12">
          <h3>All Recipes</h3>

          <div className="flex flex-wrap gap-3 text-beige">
            <button
              className={`tagBtn ${selectedTag === ALL_TAG ? "selectedBtn" : ""}`}
              onClick={() => setSelectedTag(ALL_TAG)}
            >
              All Recipes
            </button>
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

        {isLoading && (
          <div className="flex justify-center w-full py-4">
            <p className="text-center text-beige">Loading...</p>
          </div>
        )}

        {!isLoading && errorMsg && (
          <div className="flex flex-col w-full gap-2 align-center y-4">
            <p className="text-center text-yellow400">{errorMsg}</p>
            <button className="text-xl submitBtn" onClick={getRecipe}>
              Retry
            </button>
          </div>
        )}

        {!isLoading && !errorMsg && filteredRecipes.length === 0 && (
          <div className="flex justify-center w-full py-4">
            <p className="text-center text-beige">No recipes found.</p>
          </div>
        )}

        {!isLoading && !errorMsg && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* filter cards */}
            {filteredRecipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe-page/${recipe.id}`}>
                <HomePageCard item={recipe} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
