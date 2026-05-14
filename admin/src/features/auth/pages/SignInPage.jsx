import { Navigate, useNavigate } from "react-router-dom";
import BrandingPanel from "../components/signUp/BrandingPanel";
import SignInForm from "../components/signIn/SignInForm";
import SocialSignUp from "../components/signUp/SocialSignUp";
import SuccessBanner from "../components/signUp/SuccessBanner";
import OrDivider from "../../../shared/components/OrDivider";
import PageFooter from "../../../shared/components/PageFooter";
import { useSigninForm } from "../hooks/useSigninForm";
import { selectSigninSuccess } from "../store/authSlice";
import { useSelector } from "react-redux";

export default function SignInPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    toggleShowPassword,
    isLoading,
  } = useSigninForm();

  const isSuccess = useSelector(selectSigninSuccess);

  if (isSuccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary-container/20 blur-[100px]" />
      </div>

      <main className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-2xl bg-surface-container-lowest">
        <BrandingPanel />

        <div className="p-8 md:p-16 flex flex-col justify-center bg-surface-container-lowest">
          <div className="max-w-md mx-auto w-full">
            <SuccessBanner
              visible={isSuccess}
              message="Signed in successfully."
            />

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-on-surface tracking-tight">
                Welcome Back
              </h1>
              <p className="text-on-surface-variant mt-2 text-sm">
                Sign in to access your admin dashboard.
              </p>
            </div>

            <SocialSignUp />
            <OrDivider />

            <SignInForm
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
              isLoading={isLoading}
            />

            {/* Signup removed as per requirements */}
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}