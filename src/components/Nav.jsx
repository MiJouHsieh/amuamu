import IconLogo from "src/assets/icons/logo.svg?react";
import IconHamburger from "src/assets/icons/icon-hamburger.svg?react";
import IconClose from "src/assets/icons/icon-close.svg?react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const ROUTES = [
  { id: "", label: "Home" },
  { id: "add-post", label: "Add Recipe" },
  { id: "cart", label: "Cart" },
];

export function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  const handleClick = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }
    if (showMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, [showMenu]);

  return (
    <nav className="flex h-[88px] w-full items-center justify-between bg-blue900 p-6 text-white md:h-24 md:p-0 1440:top-10 1440:max-w-[1110px]">
      <div className="1440:relative">
        <Link to="/">
          <IconLogo className="660:mx-10 h-10 w-10 md:h-12 md:w-12 1440:mx-16" />
        </Link>
      </div>
      <div className="md:hidden">
        <IconHamburger
          onClick={handleClick}
          className="cursor-pointer"
        />
      </div>
      {/* menu */}
      {showMenu && (
        <div
          ref={navRef}
          className="fixed right-0 top-0 z-20 h-full w-[67%] max-w-[736px] bg-blue900 bg-opacity-15 pl-8 backdrop-blur-xl md:hidden"
        >
          <div className="flex justify-end space-y-12 py-8 pr-6">
            <IconClose
              onClick={handleClick}
              className="h-[21px] w-6 cursor-pointer border-blue-300"
            />
          </div>
          <div>
            <ul className="flex flex-col gap-y-9">
              {ROUTES.map(({ id, label }) => {
                const isActive =
                  id === ""
                    ? location.pathname === "/"
                    : location.pathname.startsWith(`/${id}`);
                return (
                  <Link
                    key={id}
                    to={`/${id}`}
                    className="cursor-pointer"
                  >
                    <li
                      className={`inline-block items-center border-b-[3px] text-2xl ${
                        isActive
                          ? "border-yellow400 text-yellow400"
                          : "border-transparent text-white300 hover:border-b-[3px] hover:border-yellow"
                      }`}
                    >
                      {label}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <div className="hidden h-full w-full max-w-[756px] md:block">
        <ul className="flex h-full w-full items-center justify-end gap-x-12 px-10">
          {ROUTES.map(({ id, label }) => {
            const isActive =
              id === ""
                ? location.pathname === "/"
                : location.pathname.startsWith(`/${id}`);
            return (
              <Link
                key={id}
                to={`/${id}`}
                className="cursor-pointer"
              >
                <li
                  className={`inline-block items-center border-b-[3px] text-xl ${
                    isActive
                      ? "border-yellow400 text-yellow400"
                      : "border-transparent text-white300 hover:border-b-[3px] hover:border-yellow"
                  }`}
                >
                  {label}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
