import PageFooter from "../../../shared/components/PageFooter";
import VerifyEmailForm from "../components/verification/VerifyEmailForm";
import VerifySuccessBanner from "../components/verification/VerifySuccessBanner";
import { useVerifyEmailForm } from "../hooks/useVerifyEmailForm";


export default function VerifyEmailPage() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    email,
    otp,
    verifyLoading,
    verifySuccess,
    verifyError,
    resendLoading,
    resendSuccessMessage,
    countdown,
    formattedCountdown,
    handleOtpChange,
    handleOtpKeyDown,
    handleResendOtp,
  } = useVerifyEmailForm();

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col items-center justify-center">
     

      <main className="w-full max-w-md px-6 py-12 flex flex-col items-center">
        <div className="mb-10 p-4 rounded-xl bg-secondary-container text-primary flex items-center justify-center">
          <span
            className="material-symbols-outlined text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_shipping
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">
            Verify Your Email
          </h1>
          <p className="text-on-surface-variant text-sm">
            We&apos;ve sent a 6-digit verification code to{" "}
            <span className="font-semibold text-on-surface">
              {email || "your email"}
            </span>
          </p>
        </div>

        <VerifySuccessBanner visible={verifySuccess} />

        {resendSuccessMessage ? (
          <div className="w-full mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
            {resendSuccessMessage}
          </div>
        ) : null}

        <VerifyEmailForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          verifyError={verifyError}
          verifyLoading={verifyLoading}
          otp={otp}
          handleOtpChange={handleOtpChange}
          handleOtpKeyDown={handleOtpKeyDown}
        />

        <div className="mt-10 text-center">
          <p className="text-sm text-on-surface-variant mb-2">
            Didn&apos;t receive the code?
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              className={`text-primary font-semibold text-sm hover:underline ${
                countdown > 0 || resendLoading
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              type="button"
              onClick={handleResendOtp}
              disabled={countdown > 0 || resendLoading}
            >
              {resendLoading ? "Resending..." : "Resend OTP"}
            </button>

            <span className="text-on-surface-variant/40">•</span>

            <span className="text-on-secondary-container font-mono text-sm font-medium bg-surface-container-high px-2 py-1 rounded">
              {countdown > 0 ? `Resend in ${formattedCountdown}` : "Resend now"}
            </span>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            className="text-xs uppercase tracking-widest text-on-secondary-container hover:text-primary transition-colors"
            href="#"
          >
            Contact Support
          </a>
        </div>
      </main>

      <PageFooter />

      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-container/20 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
}