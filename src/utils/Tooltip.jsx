export function Tooltip({ className, children }) {
  return (
    <div
      className={`${className} transform rounded px-2 py-1 opacity-0 transition-all duration-300 group-hover:opacity-100`}
    >
      {children}
    </div>
  );
}
