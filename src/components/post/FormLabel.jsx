export function FormLabel({ className="", children, required }) {
  return (
    <label className={`form-label text-orange ${className}`}>
      {children}
      {required && <span className="text-red ml-1">*</span>}
    </label>
  );
}
