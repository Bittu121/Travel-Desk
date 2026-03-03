export const loginCredentialsTemplate = (
  fullName,
  email,
  password,
  loginUrl,
) => {
  return {
    from: `"Travel Desk" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Login Credentials",
    html: `
      <p>Dear ${fullName},</p>
      <p>Your account has been successfully created.</p>
      <p>
        You can now login using your email: <strong>${email}</strong> 
        and password: <strong>${password}</strong>.
      </p>
      <p>
        <b>We recommend changing the password after your first login for security purposes.</b>
      </p>
      <p>
        You can now log in using the following link: 
        <a href="${loginUrl}" target="_blank">${loginUrl}</a>
      </p>
      <p>Thank you,<br/>Travel Desk Team</p>
    `,
  };
};
