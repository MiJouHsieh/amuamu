import IconLogo from "src/assets/icons/logo.svg?react";
// import IconHamburger from "src/assets/icons/icon-hamburger.svg?react";
// import IconClose from "src/assets/icons/icon-close.svg?react";
import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav className="660:p-0 bg-bg-blue900 flex h-[88px] w-full items-center justify-between p-6 text-white md:h-24 1440:top-10 1440:max-w-[1110px]">
      <div className="1440:relative">
        <Link to="/">
          <IconLogo className="660:mx-10 h-10 w-10 md:h-12 md:w-12 1440:mx-16" />
        </Link>
      </div>
    </nav>
  );
}
