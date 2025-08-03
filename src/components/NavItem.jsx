import { Link } from "react-router-dom";

export function NavItem({
  id,
  label,
  onClick,
  pathname,
  to = `/${id}`,
}) {
  const isActive =
    id === "" ? pathname === "/" : pathname.startsWith(`/${id}`);
  return (
    <li>
      <Link
        key={id}
        to={to}
        className="cursor-pointer"
        onClick={onClick}
      >
        <span
          className={`inline-block items-center border-b-[3px] text-2xl ${
            isActive
              ? "border-yellow400 text-yellow400"
              : "border-transparent text-white300 hover:border-b-[3px] hover:border-yellow"
          }`}
          >
          {label}
        </span>
      </Link>
    </li>
  );
}
