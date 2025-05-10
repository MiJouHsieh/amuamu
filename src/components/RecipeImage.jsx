export function RecipeImage({ src, alt, className = "", ...props }) {
  const fallbackSrc = "/images/recipe-fallback-image.png";

  const handleError = (e) => {
    if (e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
  };

  return (
    <img
      src={src || fallbackSrc}
      alt={alt || "Recipe Image"}
      loading="lazy"
      decoding="async"
      onError={handleError}
      className={className}
      {...props}
    />
  );
}
