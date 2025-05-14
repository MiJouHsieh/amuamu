export function RecipeFormButtons({ isEditMode, uploading, disabled, onSubmit, onCancelEdit }) {
  return (
    <>
      {isEditMode ? (
        <>
          <button
            type="submit"
            className="submitBtn"
            disabled={disabled}
            aria-label="Submit recipe form"
            onClick={onSubmit}
          >
            📘 Update recipe
          </button>
          <button
            type="button"
            className="submitBtn"
            disabled={disabled}
            aria-label="Cancel Edit recipe form"
            onClick={onCancelEdit}
          >
            Cancel Edit
          </button>
        </>
      ) : (
        <button
          type="submit"
          className="submitBtn"
          disabled={disabled}
          aria-label="Submit recipe form"
          onClick={onSubmit}
        >
          {uploading ? "uploading..." : "📖 Add recipe"}
        </button>
      )}
    </>
  );
}
