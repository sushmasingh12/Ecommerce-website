import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  resendOtp,
  signinUser,
  signupUser,
  verifyEmailOtp,
} from "../services/authService";


export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (payload, thunkAPI) => {
    try {
      return await signupUser(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Signup failed. Please try again."
      );
    }
  }
);

export const verifyEmailThunk = createAsyncThunk(
  "auth/verifyEmail",
  async (payload, thunkAPI) => {
    try {
      return await verifyEmailOtp(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "OTP verification failed."
      );
    }
  }
);

export const resendOtpThunk = createAsyncThunk(
  "auth/resendOtp",
  async (email, thunkAPI) => {
    try {
      return await resendOtp(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Failed to resend OTP."
      );
    }
  }
);

export const signinThunk = createAsyncThunk(
  "auth/signin",
  async (payload, thunkAPI) => {
    try {
      return await signinUser(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || "Signin failed. Please try again."
      );
    }
  }
);

const initialState = {
  user: null,

  signup: {
    isLoading: false,
    isSuccess: false,
    error: null,
  },

  signin: {
    isLoading: false,
    isSuccess: false,
    error: null,
  },

  verification: {
    pendingEmail: "",
    verifyLoading: false,
    verifySuccess: false,
    verifyError: null,
    resendLoading: false,
    resendSuccessMessage: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignupState: (state) => {
      state.signup.isLoading = false;
      state.signup.isSuccess = false;
      state.signup.error = null;
    },
    resetSigninState: (state) => {
      state.signin.isLoading = false;
      state.signin.isSuccess = false;
      state.signin.error = null;
    },
    resetVerificationState: (state) => {
      state.verification.verifyLoading = false;
      state.verification.verifySuccess = false;
      state.verification.verifyError = null;
      state.verification.resendLoading = false;
      state.verification.resendSuccessMessage = "";
    },
    clearPendingVerificationEmail: (state) => {
      state.verification.pendingEmail = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signupThunk.pending, (state) => {
        state.signup.isLoading = true;
        state.signup.isSuccess = false;
        state.signup.error = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.signup.isLoading = false;
        state.signup.isSuccess = true;
        state.signup.error = null;
        state.user = action.payload?.user || null;
        state.verification.pendingEmail = action.payload?.email || "";
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.signup.isLoading = false;
        state.signup.isSuccess = false;
        state.signup.error = action.payload || "Signup failed";
      })

      // verify email
      .addCase(verifyEmailThunk.pending, (state) => {
        state.verification.verifyLoading = true;
        state.verification.verifySuccess = false;
        state.verification.verifyError = null;
      })
      .addCase(verifyEmailThunk.fulfilled, (state) => {
        state.verification.verifyLoading = false;
        state.verification.verifySuccess = true;
        state.verification.verifyError = null;
      })
      .addCase(verifyEmailThunk.rejected, (state, action) => {
        state.verification.verifyLoading = false;
        state.verification.verifySuccess = false;
        state.verification.verifyError =
          action.payload || "Verification failed";
      })

      // resend otp
      .addCase(resendOtpThunk.pending, (state) => {
        state.verification.resendLoading = true;
        state.verification.resendSuccessMessage = "";
      })
      .addCase(resendOtpThunk.fulfilled, (state, action) => {
        state.verification.resendLoading = false;
        state.verification.resendSuccessMessage =
          action.payload?.message || "OTP resent successfully.";
      })
      .addCase(resendOtpThunk.rejected, (state, action) => {
        state.verification.resendLoading = false;
        state.verification.verifyError = action.payload || "Failed to resend OTP";
      })

      // signin
      .addCase(signinThunk.pending, (state) => {
        state.signin.isLoading = true;
        state.signin.isSuccess = false;
        state.signin.error = null;
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.signin.isLoading = false;
        state.signin.isSuccess = true;
        state.signin.error = null;
        state.user = action.payload?.user || null;
      })
      .addCase(signinThunk.rejected, (state, action) => {
        state.signin.isLoading = false;
        state.signin.isSuccess = false;
        state.signin.error = action.payload || "Signin failed";
      });
  },
});

export const {
  resetSignupState,
  resetSigninState,
  resetVerificationState,
  clearPendingVerificationEmail,
} = authSlice.actions;

export const selectSignupLoading = (state) => state.auth.signup.isLoading;
export const selectSignupSuccess = (state) => state.auth.signup.isSuccess;
export const selectSignupError = (state) => state.auth.signup.error;

export const selectSigninLoading = (state) => state.auth.signin.isLoading;
export const selectSigninSuccess = (state) => state.auth.signin.isSuccess;
export const selectSigninError = (state) => state.auth.signin.error;

export const selectPendingVerificationEmail = (state) =>
  state.auth.verification.pendingEmail;
export const selectVerifyLoading = (state) =>
  state.auth.verification.verifyLoading;
export const selectVerifySuccess = (state) =>
  state.auth.verification.verifySuccess;
export const selectVerifyError = (state) =>
  state.auth.verification.verifyError;
export const selectResendLoading = (state) =>
  state.auth.verification.resendLoading;
export const selectResendSuccessMessage = (state) =>
  state.auth.verification.resendSuccessMessage;

export default authSlice.reducer;