export const userResponseDTO = (user) => {
  return {
    id: user._id,
    fullName: user.fullName,
    empCode: user.empCode,
    designation: user.designation,
    department: user.department,
    email: user.email,
    role: user.role,
  };
};
