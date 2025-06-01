import { useNavigate } from "react-router-dom";
import { IngredientCheckbox } from "src/components/step-by-step/IngredientCheckbox";

export function IngredientCheck({ recipe, onNext }) {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col justify-center space-y-4 py-6">
      <h4 className="w-full text-start font-chocolateClassicalSans text-2xl font-semibold text-yellow400">
        Ingredients
      </h4>

      <div className="flex w-full flex-col space-y-4 rounded-xl border border-yellow bg-blue-200/10 p-6 text-beige">
        {recipe?.ingredients?.map((item) => {
          return ( 
            <IngredientCheckbox
              className="text-start md:p-2"
              itemTitle={item.title}
              key={item.id}
              id={item.id}
            />
          );
        })}
      </div>
      <div className="flex justify-between pt-10">
        <button
          className="stepByStepBackBtn"
          onClick={() => navigate(`/recipe-page/${recipe?.id}`)}
        >
          Back to Recipe
        </button>
        <button className="stepByStepNextBtn" onClick={() => onNext()}>
          Next
        </button>
      </div>
    </div>
  );
}