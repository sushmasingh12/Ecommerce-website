import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearPendingVerificationEmail,
  resendOtpThunk,
  resetVerificationState,
  selectPendingVerificationEmail,
  selectResendLoading,
  selectResendSuccessMessage,
  selectVerifyError,
  selectVerifyLoading,
  selectVerifySuccess,
  verifyEmailThunk, } from "../store/authSlice";


export const useVerifyEmailForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector(selectPendingVerificationEmail);
  const verifyLoading = useSelector(selectVerifyLoading);
  const verifySuccess = useSelector(selectVerifySuccess);
  const verifyError = useSelector(selectVerifyError);
  const resendLoading = useSelector(selectResendLoading);
  const resendSuccessMessage = useSelector(selectResendSuccessMessage);

  const [countdown, setCountdown] = useState(59);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    },
    mode: "onChange",
  });

  const values = watch();

  const otp = useMemo(
    () =>
      [
        values.digit1,
        values.digit2,
        values.digit3,
        values.digit4,
        values.digit5,
        values.digit6,
      ].join(""),
    [values]
  );

  useEffect(() => {
    if (!email) {
      navigate("/signin", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (verifySuccess) {
      const timer = setTimeout(() => {
        dispatch(clearPendingVerificationEmail());
        navigate("/signin", { replace: true });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [verifySuccess, navigate, dispatch]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    return () => {
      dispatch(resetVerificationState());
    };
  }, [dispatch]);

  const handleOtpChange = (event, index) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 1);
    const fieldName = `digit${index + 1}`;
    setValue(fieldName, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    if (value && event.target.nextElementSibling) {
      event.target.nextElementSibling.focus();
    }
  };

  const handleOtpKeyDown = (event) => {
    if (
      event.key === "Backspace" &&
      !event.target.value &&
      event.target.previousElementSibling
    ) {
      event.target.previousElementSibling.focus();
    }
  };

  const onSubmit = async () => {
    if (otp.length !== 6) return;

    await dispatch(
      verifyEmailThunk({
        email,
        otp,
      })
    );
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || !email) return;
    await dispatch(resendOtpThunk(email));
    setCountdown(59);
  };

  const formattedCountdown = `0:${String(countdown).padStart(2, "0")}`;

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
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
  };
};