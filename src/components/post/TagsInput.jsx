import { useState } from "react";
import { HiPlusCircle } from "react-icons/hi";

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
    <div className="mx-auto flex w-full flex-col gap-y-2 p-4">
      <div className="hover:addPostShadow flex w-full flex-col items-start gap-y-2">
        <label className="form-label w-full text-orange">Recipe Tags</label>
        <div className="flex w-full items-center justify-between gap-x-4">
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
            className="darkInputField inputField flex-1 resize-none overflow-auto"
          />
          {inputValue.length > 0 && (
            <button type="button" onClick={handleAddTag} className="activeBtn">
              <HiPlusCircle className="activeIcon text-orange" />
            </button>
          )}
        </div>
      </div>

      <div className="hover:addPostShadow flex flex-wrap gap-2">
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
              className="tag min-w-[100px]"
            />
            <button onClick={(e) => handleDeleteTag(e, index)} className="mr-2 text-blue300">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}