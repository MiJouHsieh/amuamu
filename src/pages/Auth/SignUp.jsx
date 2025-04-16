import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormInput } from "src/components/FormInput";
import { PasswordInput } from "src/components/PasswordInput";
import { useAuth } from "src/context/useAuth";

export function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { signUp } = useAuth();

  return (
    <>
      {isSubmitted ? (
        <main className="flex min-h-screen w-full items-center justify-center rounded-[50px] bg-blue800 bg-[url('/src/assets/images/img-noise.png')] p-12">
          <div className="flex flex-col items-center gap-y-10 text-beige">
            <h2 className="text-xl font-semibold">
              🎉 Sign-up Successful!
            </h2>
            <p className="text-base text-beige">
              Welcome! You can now start saving recipes.
            </p>
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
              .oneOf(
                [Yup.ref("password")],
                "Passwords do not match",
              )
              .required("Please confirm your password"),
          })}
          onSubmit={async (
            values,
            { setSubmitting, resetForm, setStatus },
          ) => {
            console.log("Form submitted!", values);
            const { email, password } = values;

            const { error } = await signUp({ email, password });

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
              className="archBackground min-h-screen w-full flex h-full justify-center"
            >
              <div className="my-40 flex w-full flex-col gap-y-6 p-6 500:max-w-[28rem]">
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
                    placeholder="Password"
                    required
                  />
                  <PasswordInput
                    id="inputConfirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    required
                  />
                  {status && (
                    <div className="text-red-400">{status}</div>
                  )}
                  <button
                    type="submit"
                    className="loginSingupBtn"
                    disabled={isSubmitting}
                    aria-label="Submit sign-up form"
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Start your recipe collection 📖"}
                  </button>
                  <Link
                    className="text-beige300 underline"
                    to="/login"
                  >
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
