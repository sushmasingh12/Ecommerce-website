const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const signupUser = async (payload) => {
  await wait(1200);

  return {
    success: true,
    message: "Signup successful. Verification code sent.",
    user: {
      id: Date.now(),
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
    },
    email: payload.email,
    verificationRequired: true,
  };
};

export const verifyEmailOtp = async ({ email, otp }) => {
  await wait(1000);

  if (otp !== "482123") {
    throw new Error("Invalid code, please try again");
  }

  return {
    success: true,
    message: "Email verified successfully.",
    email,
  };
};

export const resendOtp = async (email) => {
  await wait(1000);

  return {
    success: true,
    message: `A new verification code was sent to ${email}`,
  };
};

export const signinUser = async (payload) => {
  await wait(1000);

  return {
    success: true,
    message: "Signed in successfully.",
    user: {
      id: 101,
      email: payload.email,
      role: "admin",
    },
  };
};