import { HiMinusCircle } from "react-icons/hi";
import { useState, useEffect } from "react";

import TextareaAutosize from "react-textarea-autosize";

export function InstructionItem({ instruction, onSave, onDelete }) {
  const [value, setValue] = useState(instruction.title ?? "");
  
  useEffect(() => {
    setValue(instruction.title ?? "");
  }, [instruction.title]);
  
  const handleBlur = () => {
    const trimmed = value.trim()
    if (trimmed.lenth === 0) return
    if (trimmed === instruction.title) return;
    
    onSave?.({
      id: instruction.id,
      title: trimmed,
    });
  }
    
  const handleKeyDown = (event) => {
    
    if (event.key === "Escape") {
      event.preventDefault();
      handleBlur();
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
        defaultValue={instruction.title}
        minRows={1}
        maxRows={6}
      />
      <button type="button" onClick={() => onDelete?.(instruction.id)} className="activeBtn">
        <HiMinusCircle className="activeIcon text-blue300" />
      </button>
    </div>
  );
}
