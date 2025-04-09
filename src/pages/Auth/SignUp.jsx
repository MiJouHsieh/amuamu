import { GoEye } from "react-icons/go";
import { RxEyeClosed } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [passwordShow, setPasswordShow] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setHasPassword(value.length > 0);
  };

  return (
    <main className="archBackground flex h-screen w-full justify-center">
      <div className="mt-40 flex w-full flex-col gap-y-6 p-6 500:max-w-[28rem]">
        <h1 className="mb-6 w-full text-center font-youngSerif text-6xl text-orange">
          New User
        </h1>
        <form className="flex w-full flex-col gap-y-5">
          <div className="flex flex-col justify-start gap-y-2">
            <label
              htmlFor="inputEmail"
              className="font-semibold text-orange"
            >
              Name
            </label>
            <input
              type="text"
              ref={emailRef}
              id="inputName"
              className="loginSingupInput loginSingupInputField"
              placeholder="Name"
              required
              name="name"
            />
          </div>

          <div className="flex flex-col justify-start gap-y-2">
            <label
              htmlFor="inputEmail"
              className="font-semibold text-orange"
            >
              Email Address
            </label>
            <input
              type="email"
              ref={emailRef}
              id="inputEmail"
              className="loginSingupInput loginSingupInputField"
              placeholder="Email Address"
              required
              name="email"
            />
          </div>

          <div className="relative flex flex-col gap-y-2">
            <label
              htmlFor="inputPassword"
              className="font-semibold text-orange"
            >
              Password
            </label>
            <input
              name="password"
              type={passwordShow ? "text" : "password"}
              ref={passwordRef}
              id="inputPassword"
              className="loginSingupInput loginSingupInputField tracking-wider"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
            />
            {hasPassword && (
              <span
                className="text-yellow300 absolute bottom-7 right-6 cursor-pointer"
                onClick={() => setPasswordShow(!passwordShow)}
              >
                {passwordShow ? <GoEye /> : <RxEyeClosed />}
              </span>
            )}
          </div>
          <button type="submit" className="loginSingupBtn">
            Start your recipe collection 📖
          </button>
          <Link className="text-beige300 underline" to="/login">
            Log In
          </Link>
        </form>
      </div>
    </main>
  );
}
