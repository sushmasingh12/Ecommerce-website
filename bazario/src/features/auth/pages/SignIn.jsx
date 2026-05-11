import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import FormField from '../../../shared/components/Form/FormField';
import Input from '../../../shared/components/Form/Input';
import { Helmet } from 'react-helmet-async';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isLoading, error, resetError } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/account');
    } catch (err) {
      // Error handled by slice
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8">
      <Helmet>
        <title>Sign In | Bazario</title>
        <meta name="description" content="Sign in to your Bazario account to manage your orders and wishlist." />
      </Helmet>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-10">
          <span className="text-secondary font-bold text-4xl" style={{ fontFamily: 'Sora, sans-serif' }}>
            baz<span className="text-primary">ario</span>
          </span>
        </div>
        <h2 className="text-3xl font-serif text-center text-gray-900 tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-xs uppercase tracking-widest text-gray-400 font-label">
          Sign in to access your curation
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

            <FormField label="Email address" error={errors.email}>
              <Input
                type="email"
                autoComplete="email"
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

            <FormField label="Password" error={errors.password}>
              <Input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
            </FormField>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-3.5 w-3.5 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-[10px] uppercase tracking-widest text-gray-500 font-label font-bold">
                  Remember me
                </label>
              </div>

              <div className="text-[10px] uppercase tracking-widest font-label font-bold">
                <Link to="#" className="text-gray-400 hover:text-black transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-4 px-4 border border-transparent text-[10px] uppercase tracking-[0.2em] font-label font-bold text-white bg-black hover:bg-primary focus:outline-none disabled:opacity-50 transition-all duration-300"
              >
                {isLoading ? 'Processing...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-label">
              <span className="px-4 bg-white text-gray-400">New to Bazario?</span>
            </div>
          </div>

          <Link
            to="/signup"
            className="w-full flex justify-center py-4 px-4 border border-gray-200 text-[10px] uppercase tracking-[0.2em] font-label font-bold text-black hover:bg-gray-50 transition-all duration-300"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
