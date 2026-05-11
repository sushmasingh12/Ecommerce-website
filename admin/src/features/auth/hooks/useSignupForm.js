import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  selectSignupLoading,
  selectSignupSuccess,
  signupThunk,
} from "../store/authSlice";

const getPasswordStrength = (password = "") => {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
};

const getStrengthMeta = (score) => {
  if (score <= 2) {
    return {
      label: "Weak",
      width: "33%",
      barClass: "bg-red-500",
      textClass: "text-red-600",
    };
  }

  if (score <= 4) {
    return {
      label: "Medium",
      width: "66%",
      barClass: "bg-amber-500",
      textClass: "text-amber-600",
    };
  }

  return {
    label: "Strong",
    width: "100%",
    barClass: "bg-emerald-500",
    textClass: "text-emerald-600",
  };
};

export const useSignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectSignupLoading);
  const isSuccess = useSelector(selectSignupSuccess);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onChange",
  });

  const passwordValue = watch("password");
  const passwordStrength = useMemo(
    () => getPasswordStrength(passwordValue),
    [passwordValue],
  );
  const strengthMeta = useMemo(
    () => getStrengthMeta(passwordStrength),
    [passwordStrength],
  );

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    const resultAction = await dispatch(signupThunk(payload));

    if (signupThunk.fulfilled.match(resultAction)) {
      reset();
      navigate("/verify_Email");
    }
  };

  return {
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
  };
};
