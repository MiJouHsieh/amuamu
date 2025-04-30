import { Checkbox } from "src/components/Checkbox";
import { StepsCards } from "src/components/StepsCards";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "src/supabaseClient";

export function RecipePage() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const { data, error, status } = await supabase
          .from("recipe")
          .select("*")
          .eq("id", id)
          .single();

        if (error && status !== 406) {
          console.log("error", error);
          throw error;
        }
        setData(data);
        console.log("RecipePage data", data);
      } catch (error) {
        console.error("An error occurred while loading the post.", error);
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  if (loading) {
    return <div className="mt-48 p-3 text-3xl text-orange">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="mt-48 flex rounded-lg border-2 border-orange px-4 py-2 text-3xl text-orange">
        Recipe not found.💔
      </div>
    );
  }

  return (
    <section className="border-box h-full w-full rounded-tl-[150px] rounded-tr-[150px] bg-blue800 bg-[url('/src/assets/images/img-noise.png')] p-4 md:p-10 990:mx-0 990:p-8 1440:max-w-[1110px]">
      <div className="flex w-full flex-col items-center 990:flex-row 990:flex-wrap 990:items-end 990:justify-between">
        {/* image */}
        <div className="flex w-full flex-1 flex-col items-center justify-center space-y-4 575:mt-4 990:w-[40%]">
          <div className="mt-10">
            <img
              className="h-[300px] w-[300px] rounded-full object-cover object-center 500:rounded-full md:h-[400px] md:w-[400px] 1440:h-[480px] 1440:w-[480px]"
              src={data && data.image}
              alt={data && data.recipe_name}
            />
          </div>
          <h1 className="font-youngSerif text-[30px] font-semibold uppercase leading-[40px] tracking-[3px] text-orange opacity-90">
            {data ? data.recipe_name : ""}
          </h1>
          <div className="flex w-full max-w-[400px] items-center justify-between font-poppins text-lg text-beige">
            <p className="flex flex-col items-center justify-between">
              <span className="text-yellow400">Preparation</span>
              <span>{data ? data.preparation.preparationTime : "Preparation Time ?"}</span>
            </p>

            <p className="flex flex-col items-center justify-between">
              <span className="text-yellow400">Cook time</span>
              <span>{data ? data.preparation.cookTime : "Cook Time ?"}</span>
            </p>

            <p className="flex flex-col items-center justify-between">
              <span className="text-yellow400">Servings</span>
              <span>{data ? data.preparation.servings : "Servings ?"}</span>
            </p>
          </div>
        </div>
        {/* Tags */}
        <div className="w-full space-y-4 py-6 990:flex 990:items-center 990:justify-center 990:space-x-4 990:space-y-0">
          <h4 className="font-chocolateClassicalSans text-2xl font-semibold text-yellow400">
            Tags
          </h4>
          <div className="h-full space-x-2 text-beige">
            {data?.tags?.map((tag) => {
              return (
                <span className="inline-block rounded-full border border-yellow px-4 py-2 text-xl">
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        {/* ingredients  */}
        <div className="w-full space-y-4 py-6">
          <h4 className="text-start font-chocolateClassicalSans text-2xl font-semibold text-yellow400">
            Ingredients
          </h4>
          <div className="space-y-4 rounded-xl border border-yellow p-6 text-beige md:flex md:flex-wrap md:space-y-0">
            {data?.ingredients?.map((item) => {
              return <Checkbox className="md:p-2" items={item.title} key={item.id} />;
            })}
          </div>
        </div>
        {/* instructions */}
        {data?.instructions && <StepsCards instructions={data.instructions} />}
        {/* Note */}
        <div className="mt-6 w-full space-y-3 rounded-xl border border-yellow p-6 md:max-w-none">
          <h4 className="text-start font-chocolateClassicalSans text-2xl font-semibold leading-[32px] tracking-[0px] text-yellow400">
            Note
          </h4>
          <p className="pl-2 text-beige">{data ? data.note : ""}</p>
        </div>
      </div>
    </section>
  );
}
