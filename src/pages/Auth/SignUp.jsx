import IconLogo from "src/assets/icons/amuamu-logo.svg?react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormInput } from "src/components/FormInput";
import { PasswordInput } from "src/components/PasswordInput";
import { useAuth } from "src/context/AuthContext";

export function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { signUp } = useAuth();

  return (
    <>
      {isSubmitted ? (
        <main className="archBackground flex h-[85vh] w-full flex-col items-center justify-center gap-y-6 overflow-hidden">
          <div>
            <IconLogo className="h-40 w-40" />
          </div>
          <div className="flex flex-col items-center gap-y-10 text-beige">
            <h2 className="text-xl font-semibold">🎉 Sign-up Successful!</h2>
            <p className="text-base text-beige">Welcome! You can now start saving recipes.</p>
            <Link
              to="/"
              className="hover:bg-orange-500 cardHoverShadow cardHoverShadow:hover rounded-full bg-orange px-6 py-2 font-medium text-white"
            >
              Go to Homepage 🍳
            </Link>
          </div>
        </main>
      ) : (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Name is required")
              .min(3, "Must be at least 3 characters")
              .max(10, "Must be 10 characters or less"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Please enter a valid email address"),
            password: Yup.string()
              .min(8, "Must be 8 characters or more")
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords do not match")
              .required("Please confirm your password"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
            console.log("Form submitted!", values);
            const { name, email, password } = values;

            const { error } = await signUp({
              name,
              email,
              password,
            });

            if (error) {
              setStatus("註冊失敗，請確認 Email 是否已被使用");
              setSubmitting(false);
              return;
            }

            //  註冊成功
            setIsSubmitted(true);
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, status }) => (
            <main
              role="status"
              className="archBackground flex h-full min-h-screen w-full flex-col items-center justify-center gap-y-6 py-8"
            >
              <div>
                <IconLogo className="h-40 w-40" />
              </div>
              <div className="flex w-full flex-col gap-y-6 p-6 500:max-w-[28rem]">
                <h1 className="mb-6 w-full text-center font-youngSerif text-6xl text-orange">
                  New User
                </h1>
                <Form className="flex w-full flex-col gap-y-5">
                  <FormInput
                    id="inputName"
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                  />
                  <FormInput
                    id="inputEmail"
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                  <PasswordInput
                    id="inputPassword"
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                  <PasswordInput
                    id="inputConfirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Re-enter Password"
                    required
                  />
                  {status && <div className="text-red-400">{status}</div>}
                  <button
                    type="submit"
                    className="submitBtn"
                    disabled={isSubmitting}
                    aria-label="Submit sign-up form"
                  >
                    {isSubmitting ? "Submitting..." : "Start your recipe collection 📖"}
                  </button>
                  <Link className="text-beige300 underline" to="/login">
                    Log In
                  </Link>
                </Form>
              </div>
            </main>
          )}
        </Formik>
      )}
    </>
  );
}
