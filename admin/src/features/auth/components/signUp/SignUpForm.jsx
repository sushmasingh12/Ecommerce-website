import React from 'react'
import FormField from "../../../../shared/components/FormField";
const SignUpForm = ({
   register,
  errors,
  handleSubmit,
  onSubmit,
  showPassword,
  toggleShowPassword,
  isLoading,
  passwordStrength,
  strengthMeta,
  watch,
}) => {
  const passwordValue = watch?.("password") || "";
  const shouldShowPasswordStrength = passwordValue.trim().length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <FormField
        label="Full Name"
        name="fullName"
        type="text"
        placeholder="Alex Sterling"
        autoComplete="name"
        register={register}
        rules={{
          required: "Full name is required.",
          minLength: {
            value: 2,
            message: "Full name must be at least 2 characters.",
          },
        }}
        error={errors.fullName}
      />

      <FormField
        label="Email Address"
        name="email"
        type="email"
        placeholder="alex@company.com"
        autoComplete="email"
        register={register}
        rules={{
          required: "Email is required.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address.",
          },
        }}
        error={errors.email}
      />

      <FormField
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="+91 9876543210"
        autoComplete="tel"
        register={register}
        rules={{
          required: "Phone number is required.",
          pattern: {
            value: /^[0-9+\-\s()]{8,15}$/,
            message: "Enter a valid phone number.",
          },
        }}
        error={errors.phone}
      />

      <FormField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        autoComplete="new-password"
        register={register}
        rules={{
          required: "Password is required.",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters.",
          },
        }}
        error={errors.password}
        rightElement={
          <button
            type="button"
            onClick={toggleShowPassword}
            className="text-xs font-medium text-primary hover:underline"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        }
      />

      {shouldShowPasswordStrength && (
        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
            <div
              className={`h-full rounded-full transition-all duration-300 ${strengthMeta.barClass}`}
              style={{ width: strengthMeta.width }}
            />
          </div>
          <p className={`text-xs font-medium ${strengthMeta.textClass}`}>
            Password strength: {strengthMeta.label} ({passwordStrength}/5)
          </p>
        </div>
      )}

      <FormField
        label="Confirm Password"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        placeholder="Confirm your password"
        autoComplete="new-password"
        register={register}
        rules={{
          required: "Please confirm your password.",
        }}
        error={errors.confirmPassword}
      />

      <div className="space-y-1">
        <label className="flex items-start gap-3 text-sm text-on-surface-variant">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border accent-primary"
            {...register("terms", {
              required: "You must accept the terms and conditions.",
            })}
          />
          <span>I agree to the Terms of Service and Privacy Policy.</span>
        </label>

        {errors.terms ? (
          <p className="text-sm text-red-600">{errors.terms.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

export default SignUpForm
