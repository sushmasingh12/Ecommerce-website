import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectSigninLoading, signinThunk } from "../store/authSlice";

export const useSigninForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectSigninLoading);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    await dispatch(
      signinThunk({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      })
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    toggleShowPassword,
    isLoading,
  };
};