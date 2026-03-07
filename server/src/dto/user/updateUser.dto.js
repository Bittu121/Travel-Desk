export const updateUserDTO = (data) => {
  return {
    fullName: data.fullName,
    designation: data.designation,
    department: data.department,
    role: data.role,
  };
};
