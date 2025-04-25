import { HiMinusCircle } from "react-icons/hi";
import { useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export function InstructionItem({ instruction, onSave, onDelete, onChangeMode }) {
  const inputRef = useRef(null);

  const handleKeyDown = (event) => {
    if (inputRef.current.value.length > 0 && event.key === "Enter") {
      onSave?.({
        id: instruction.id,
        title: inputRef.current.value,
      });
    }
    if (event.key === "Escape") {
      onChangeMode?.({ id: instruction.id, isEdit: false });
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-x-4">
      <TextareaAutosize
        className="box-border flex-1 resize-none whitespace-pre-wrap break-words border-b border-[#FFD28F]/70 bg-transparent p-2 leading-tight md:p-4 md:leading-9"
        style={{ boxSizing: "border-box" }}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        defaultValue={instruction.title}
        minRows={1}
        maxRows={6}
      />
      <HiMinusCircle
        className="activeBtn h-8 w-8 cursor-pointer text-blue300 md:h-10 md:w-10"
        type="button"
        onClick={() => onDelete?.(instruction.id)}
      />
    </div>
  );
}
