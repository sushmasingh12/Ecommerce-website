
import React from 'react'

const VerifyEmailForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  verifyError,
  verifyLoading,
  otp,
  handleOtpChange,
  handleOtpKeyDown,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
      <div className="flex justify-between gap-2 md:gap-3">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            inputMode="numeric"
            className="w-12 h-16 md:w-14 md:h-20 text-center text-2xl font-bold rounded-xl border-none bg-surface-container-lowest shadow-sm ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200"
            {...register(`digit${index + 1}`, {
              required: "OTP is required",
              pattern: {
                value: /^\d$/,
                message: "Only numbers are allowed",
              },
              onChange: (e) => handleOtpChange(e, index),
            })}
            onKeyDown={handleOtpKeyDown}
          />
        ))}
      </div>

      {(verifyError || (Object.keys(errors).length > 0 && otp.length < 6)) && (
        <div className="flex items-center gap-2 text-error text-xs font-medium px-1">
          <span className="material-symbols-outlined text-sm">error</span>
          <span>{verifyError || "Please enter the complete 6-digit code"}</span>
        </div>
      )}

      <button
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-br from-primary to-primary text-white font-bold text-base shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        type="submit"
        disabled={verifyLoading}
      >
        {verifyLoading ? "Verifying..." : "Verify"}
        <span className="material-symbols-outlined text-lg">arrow_forward</span>
      </button>
    </form>
  );
}

export default VerifyEmailForm;


