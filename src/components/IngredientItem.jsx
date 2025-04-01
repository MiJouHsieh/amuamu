import { HiMinusCircle } from "react-icons/hi"; 
import { useRef } from "react";

export function IngredientItem({
  ingredient,
  onSave,
  onDelete,
  onChangeMode,
}) {

  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (
      inputRef.current.value.length > 0 &&
      event.key === "Enter"
    ) {
      onSave?.({
        id: ingredient.id,
        title: inputRef.current.value,
      });
    }
    if (event.key === "Escape") {
      onChangeMode?.({ id: ingredient.id, isEdit: false });
    }
  };

  return (
    <div
      className="flex w-full items-center justify-between gap-x-4"
    >
      <input
        ref={inputRef}
        className="flex-1 border-b border-[#FFD28F]/70 bg-transparent p-2"
        defaultValue={ingredient.title}
        onKeyDown={handleKeyDown}
      />

      <HiMinusCircle
        className="activeBtn h-8 w-8 cursor-pointer text-blue300 md:h-10 md:w-10"
        type="button"
        onClick={() => onDelete?.(ingredient.id)}
      />
    </div>
  );
}
