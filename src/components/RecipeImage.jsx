export function RecipeImage({ src, alt, className = "", ...props }) {
  const fallbackSrc = "/images/recipe-fallback-image.png";

  const handleError = (e) => {
    if (e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
      e.currentTarget.classList.add("ring-1", "ring-yellow400/40");
    }
  };
  const isUsingFallback = !src || src === "";
  const combinedClassName = [className, isUsingFallback ? "ring-1 ring-yellow400/40" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      src={src || fallbackSrc}
      alt={alt || "Recipe Image"}
      loading="lazy"
      decoding="async"
      onError={handleError}
      className={combinedClassName}
      {...props}
    />
  );
}
