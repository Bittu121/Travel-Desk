export const loginUserDTO = (data) => {
  return {
    email: data.email?.toLowerCase().trim(),
    password: data.password,
  };
};
