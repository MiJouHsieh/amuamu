import { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

export function TagsInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setInputValue("");
  };

  const handleDeleteTag = (e, index) => {
    e?.preventDefault?.();
    const newTags = tags.filter((_, idx) => idx !== index);
    setTags(newTags);
  };

  const handleEditTag = (index, newValue) => {
    const newTags = tags.map((tag, idx) => (idx === index ? newValue : tag));
    setTags(newTags);
  };

  return (
    <div className="flex flex-col w-full p-4 mx-auto addPostShadow gap-y-2">
      <div className="flex flex-col items-start w-full gap-y-2">
        <label className="w-full form-label text-orange">Recipe Tags</label>
        <div className="flex items-center justify-between w-full gap-x-4">
          <input
            type="text"
            placeholder="🏷️ e.g. cake"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            className="flex-1 overflow-auto resize-none darkInputField inputField"
          />
          {inputValue.length > 0 && (
            <button type="button" onClick={handleAddTag} className="activeBtn">
              <HiPlusCircle className="activeIcon text-orange" />
            </button>
          )}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 addPostShadow">
          {tags.map((tag, index) => (
            <div key={index} className="tag-container">
              <input
                value={tag}
                style={{ width: `${Math.max(tag.length, 1)}ch` }}
                onChange={(e) => handleEditTag(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && tag.length === 0) {
                    e.preventDefault();
                    handleDeleteTag(e, index);
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="inputTag min-w-[100px]"
              />
              <button onClick={(e) => handleDeleteTag(e, index)} className="mr-2">
                <RxCross2 className="text-white hover:text-orange active:text-orange" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
