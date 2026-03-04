import IconLogo from "src/assets/icons/amuamu-logo.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput } from "src/components/FormInput";
import { PasswordInput } from "src/components/PasswordInput";
import { useAuth } from "src/context/AuthContext";

export function Login() {
  const [isSubmittingDone, setIsSubmittingDone] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  useEffect(() => {
    if (isSubmittingDone) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isSubmittingDone, navigate]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Please enter a valid email address"),
        password: Yup.string()
          .min(8, "Must be 8 characters or more")
          .required("Password is required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
        console.log("Form submitted!", values);
        const { email, password } = values;

        const { error } = await signIn({ email, password });

        if (error) {
          setStatus("Oops! That doesn't look right. Please check your email and password.");
          setSubmitting(false);
          return;
        }

        resetForm();
        setSubmitting(false);
        setIsSubmittingDone(true);
      }}
    >
      {({ isSubmitting, status }) => (
        <main className="flex flex-col items-center justify-center w-full h-full py-8 archBackground gap-y-6">
          <div>
            <IconLogo className="w-40 h-40" />
          </div>
          <div className="relative flex w-full flex-col items-center gap-y-6 p-6 500:max-w-[28rem]">
            <h1 className="w-full mb-6 text-6xl text-center font-youngSerif text-orange">
              Sign In
            </h1>
            <Form className="flex flex-col w-full gap-y-5">
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
              {status && (
                <div className="px-4 py-3 text-base font-semibold leading-snug text-center border-4 rounded-md border-red bg-beige text-red">
                  <p>⚠️ Oops! That doesn't look right. ⚠️</p>
                  <p>Please check your email and password.</p>
                </div>
              )}
              <button
                type="submit"
                className="submitBtn"
                disabled={isSubmitting || isSubmittingDone}
                aria-label="Submit log-in form"
              >
                {isSubmitting || isSubmittingDone
                  ? "Submitting..."
                  : "Continue your recipe collection 😋"}
              </button>
              <Link className="underline text-beige300" to="/signup">
                Sign up
              </Link>
            </Form>
          </div>
        </main>
      )}
    </Formik>
  );
}
