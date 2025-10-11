export function Tooltip({ className, children, isVisible }) {
  return (
    <div
      className={`${className} transform rounded-lg transition-all delay-75 duration-500 ease-in-out  ${isVisible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"} `}
    >
      {children}
    </div>
  );
}