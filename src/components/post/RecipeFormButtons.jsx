export function RecipeFormButtons({ isEditMode, uploading, onSubmit, onCancelEdit }) {
  return (
    <>
      {isEditMode ? (
        <>
          <button
            type="submit"
            className="submitBtn"
            aria-label="Submit recipe form"
            onClick={onSubmit}
          >
            📘 Update recipe
          </button>
          <button
            type="button"
            className="submitBtn"
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
          aria-label="Submit recipe form"
          onClick={onSubmit}
        >
          {uploading ? "uploading..." : "📖 Add recipe"}
        </button>
      )}
    </>
  );
}
