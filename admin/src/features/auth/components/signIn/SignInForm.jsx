import FormField from "../../../../shared/components/FormField";
const SignInForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  showPassword,
  toggleShowPassword,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        autoComplete="current-password"
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

      <div className="flex items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-on-surface-variant">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border border-outline-variant accent-primary"
            {...register("rememberMe")}
          />
          <span>Remember me</span>
        </label>

        <a
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignInForm;
