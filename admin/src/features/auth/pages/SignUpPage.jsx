
import BrandingPanel from "../components/signUp/BrandingPanel";
import SocialSignUp from "../components/signUp/SocialSignUp";
import SuccessBanner from "../components/signUp/SuccessBanner";
import OrDivider from "../../../shared/components/OrDivider";
import PageFooter from "../../../shared/components/PageFooter";
import { useSignupForm } from "../hooks/useSignupForm";
import SignUpForm from "../components/signUp/SignUpForm";
import {  useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    toggleShowPassword,
    isLoading,
    isSuccess,
    passwordStrength,
    strengthMeta,
    getValues,
  } = useSignupForm();

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary-container/20 blur-[100px]" />
      </div>

      <main className="w-full max-w-300 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-2xl bg-surface-container-lowest">
        <BrandingPanel />

        <div className="p-8 md:p-16 flex flex-col justify-center bg-surface-container-lowest">
          <div className="max-w-md mx-auto w-full">
            <SuccessBanner
              visible={isSuccess}
              message="Account created successfully."
            />

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-on-surface tracking-tight">
                Create Your Admin Account
              </h1>
              <p className="text-on-surface-variant mt-2 text-sm">
                Join the ecosystem of high-precision curators.
              </p>
            </div>

            <SocialSignUp />
            <OrDivider />

            <SignUpForm
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
              isLoading={isLoading}
              passwordStrength={passwordStrength}
              strengthMeta={strengthMeta}
              getValues={getValues}
            />

            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Already have an account?
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 ml-1"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}