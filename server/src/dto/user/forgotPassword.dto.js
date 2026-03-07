export const forgotPasswordDTO = (data) => {
  return {
    email: data.email?.toLowerCase().trim(),
  };
};
