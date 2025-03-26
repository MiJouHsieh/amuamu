import IconLogo from "src/assets/icons/logo.svg?react";
// import IconHamburger from "src/assets/icons/icon-hamburger.svg?react";
// import IconClose from "src/assets/icons/icon-close.svg?react";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="660:p-0 1440:top-10 bg-teal700 flex h-[88px] w-full max-w-[1440px] items-center justify-between p-6 text-white md:h-24">
      <div className="1440:relative">
        <Link to="/">
          <IconLogo className="660:mx-10 1440:mx-16 h-10 w-10 md:h-12 md:w-12" />
        </Link>
      </div>
    </nav>
  );
}
