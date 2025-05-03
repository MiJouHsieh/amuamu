export function IconButton({ icon: IconCircle, onClick, color }) {
  return (
    <button type="button" onClick={onClick} className="activeBtn">
      <IconCircle className={`activeIcon text-${color}`} />
    </button>
  );
}
