export function RecipeFormButtons({
  isEditMode,
  uploading,
  disabled,
  onSubmit,
  onCancelEdit,
  onDelete,
}) {
  return (
    <div className="py-10">
      {isEditMode ? (
        <>
          <div className="flex flex-col items-start py-10 500:flex-row 500:justify-between">
            <button
              type="button"
              className="cancelBtn"
              disabled={disabled}
              aria-label="Cancel Edit recipe form"
              onClick={onCancelEdit}
            >
              Cancel Edit
            </button>
            <button
              type="submit"
              className="submitBtn"
              disabled={disabled}
              aria-label="Submit recipe form"
              onClick={onSubmit}
            >
              📘 Update recipe
            </button>
          </div>
          <div className="border-t border-[#FFD28F]/70 pt-10">
            <button
              type="button"
              className="deleteBtn"
              aria-label="Delete recipe form"
              onClick={onDelete}
            >
              🗑️ Delete Recipe
            </button>
          </div>
        </>
      ) : (
        <div className="pt-10">
          <button
            type="submit"
            className="submitBtn cursor-pointer"
            aria-label="Submit recipe form"
            onClick={onSubmit}
          >
            {uploading ? "uploading..." : "📖 Add recipe"}
          </button>
        </div>
      )}
    </div>
  );
}
