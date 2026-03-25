import { HiMinusCircle } from "react-icons/hi";
import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

export function IngredientItem({ ingredient, onSave, onDelete }) {
  
  const [value, setValue] = useState(ingredient.title ?? "")
    
  useEffect(() => {
    setValue(ingredient.title ?? "");
  }, [ingredient.title]);
  
  const handleBlur = () => {
    const trimmed = value.trim()
    if(trimmed.lenth ===0) return
    if (trimmed === ingredient.title) return
    
    onSave?.({
      id: ingredient.id,
      title:trimmed
    })
  }
  
  const handleKeyDown = (event) => {
    
    if (event.key === "Escape") {
      event.preventDefault()
      handleBlur()
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-x-4">
      <TextareaAutosize
        className="box-border flex-1 resize-none whitespace-pre-wrap break-words border-b border-[#FFD28F]/70 bg-transparent p-2 leading-tight md:p-4 md:leading-9"
        style={{ boxSizing: "border-box" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        defaultValue={ingredient.title}
        minRows={1}
        maxRows={6}
      />
      <button type="button" onClick={() => onDelete?.(ingredient.id)} className="activeBtn">
        <HiMinusCircle className="activeIcon text-blue300" />
      </button>
    </div>
  );
}
