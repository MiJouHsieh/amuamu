import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput } from "src/components/FormInput";
import { PasswordInput } from "src/components/PasswordInput";
import { useAuth } from "src/context/useAuth";

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
      onSubmit={async (
        values,
        { setSubmitting, resetForm, setStatus },
      ) => {
        console.log("Form submitted!", values);
        const { email, password } = values;

        const { error } = await signIn({ email, password });

        if (error) {
          setStatus("註冊失敗，請確認 Email 是否已被使用");
          setSubmitting(false);
          return;
        }

        resetForm();
        setSubmitting(false);
        setIsSubmittingDone(true);
      }}
    >
      {({ isSubmitting }) => (
        <main className="archBackground flex h-full w-full justify-center">
          <div className="my-40 flex w-full flex-col gap-y-6 p-6 500:max-w-[28rem]">
            <h1 className="mb-6 w-full text-center font-youngSerif text-6xl text-orange">
              Sign In
            </h1>
            <Form className="flex w-full flex-col gap-y-5">
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
              <button
                type="submit"
                className="loginSingupBtn"
                disabled={isSubmitting || isSubmittingDone}
                aria-label="Submit log-in form"
              >
                {isSubmitting || isSubmittingDone
                  ? "Submitting..."
                  : "Continue your recipe collection 😋"}
              </button>
              <Link
                className="text-beige300 underline"
                to="/signup"
              >
                Sign up
              </Link>
            </Form>
          </div>
        </main>
      )}
    </Formik>
  );
}
