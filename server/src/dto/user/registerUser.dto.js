export const registerUserDTO = (data) => {
  return {
    fullName: data.fullName?.trim(),
    empCode: data.empCode?.trim(),
    designation: data.designation?.trim(),
    department: data.department?.trim(),
    email: data.email?.toLowerCase().trim(),
    password: data.password,
    role: data.role || "user",
  };
};
