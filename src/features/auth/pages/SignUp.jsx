import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import FormField from '../../../shared/components/Form/FormField';
import Input from '../../../shared/components/Form/Input';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { register: registerAuth, isLoading, error, resetError } = useAuth();
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerAuth(data);
      navigate('/account');
    } catch (err) {
      // Error handled by slice
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8">
      <Helmet>
        <title>Create Account | Bazario</title>
        <meta name="description" content="Join Bazario today for a bespoke shopping experience. Exclusive access to premium collections." />
      </Helmet>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-10">
          <span className="text-secondary font-bold text-4xl" style={{ fontFamily: 'Sora, sans-serif' }}>
            baz<span className="text-primary">ario</span>
          </span>
        </div>
        <h2 className="text-3xl font-serif text-center text-gray-900 tracking-tight">
          Join the Atelier
        </h2>
        <p className="mt-2 text-center text-xs uppercase tracking-widest text-gray-400 font-label">
          Create an account for a bespoke experience
        </p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="space-y-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-red-500 text-sm">error</span>
                <p className="text-xs text-red-700 font-medium">{error}</p>
                <button onClick={resetError} type="button" className="ml-auto">
                  <span className="material-symbols-outlined text-gray-400 text-xs">close</span>
                </button>
              </div>
            )}

            <FormField label="Full Name" error={errors.name}>
              <Input
                type="text"
                placeholder="John Doe"
                {...register("name", { required: "Full name is required" })}
              />
            </FormField>

            <FormField label="Email address" error={errors.email}>
              <Input
                type="email"
                placeholder="name@example.com"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="Password" error={errors.password}>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" }
                  })}
                />
              </FormField>

              <FormField label="Confirm" error={errors.confirmPassword}>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword", { 
                    required: "Required",
                    validate: value => value === password || "Mismatch"
                  })}
                />
              </FormField>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms", { required: "Required" })}
                  className="h-3.5 w-3.5 text-black focus:ring-black border-gray-300 rounded"
                />
              </div>
              <div className="ml-2">
                <label htmlFor="terms" className="block text-[10px] uppercase tracking-widest text-gray-500 font-label font-bold leading-tight">
                  I agree to the{' '}
                  <a href="#" className="text-black hover:underline">
                    Terms and Conditions
                  </a>
                </label>
                {errors.terms && <p className="mt-1 text-[9px] text-red-600 uppercase tracking-widest font-bold">{errors.terms.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-4 border border-transparent text-[10px] uppercase tracking-[0.2em] font-label font-bold text-white bg-black hover:bg-primary focus:outline-none disabled:opacity-50 transition-all duration-300"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-label">
              <span className="px-4 bg-white text-gray-400">Already a member?</span>
            </div>
          </div>

          <Link
            to="/signin"
            className="w-full flex justify-center py-4 px-4 border border-gray-200 text-[10px] uppercase tracking-[0.2em] font-label font-bold text-black hover:bg-gray-50 transition-all duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
