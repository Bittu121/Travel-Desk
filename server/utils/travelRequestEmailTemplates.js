export const travelRequestSubmissionTemplate = (
  travelRequestData,
  loginUrl,
) => {
  return {
    from: `Travel Desk <${process.env.EMAIL_USER}>`,
    to: travelRequestData.email,
    subject: `Travel Request Submission Confirmation for ${travelRequestData.travelRequestId}`,
    html: `
      <p>Dear ${travelRequestData.name},</p>
      <p>Your Travel Request has been successfully submitted on the Travel Desk Portal.</p>
      <p><strong>Details of your request are as follows:</strong></p>
      <ul>
        <li>Travel Id: ${travelRequestData.travelRequestId}</li>
        <li>Employee Code: ${travelRequestData.empCode}</li>
        <li>Employee Name: ${travelRequestData.name}</li>
        <li>Designation: ${travelRequestData.designation}</li>
        <li>Travel Date: ${travelRequestData.travelDate}</li>
        <li>Return Date: ${travelRequestData.returnDate}</li>
        <li>Status: Successfully Submitted</li>
        <li>Next Step: Approval pending with your Reporting Manager.</li>
      </ul>
      <p>You will be notified once your manager takes action on the request.</p>
      <p>Login : <a href="${loginUrl}" target="_blank">${loginUrl}</a></p>
      <p>For any queries, please contact the Travel Desk Team.</p>
      <br />
      <p>Best regards,</p>
      <p>Travel Team</p>
    `,
  };
};

export const travelRequestManagerApprovalTemplate = (
  travelRequestData,
  loginUrl,
) => {
  return {
    from: `VSERV Travel Desk <${process.env.EMAIL_USER}>`,
    to: travelRequestData.reportingManager,
    subject: `Travel Request Submission – Approval Required for ${travelRequestData.travelRequestId}`,
    html: `
      <p>Dear Sir/Madam,</p>
      <p>The Travel Request with the following details has been submitted by ${travelRequestData.name}:</p>
      <ul>
        <li>Travel Id: ${travelRequestData.travelRequestId}</li>
        <li>Employee Code: ${travelRequestData.empCode}</li>
        <li>Employee Name: ${travelRequestData.name}</li>
        <li>Designation: ${travelRequestData.designation}</li>
        <li>Travel Date: ${travelRequestData.travelDate}</li>
        <li>Return Date: ${travelRequestData.returnDate}</li>
      </ul>
      <p>Kindly review and approve the request to proceed with the further process.</p>
      <p>Login : <a href="${loginUrl}" target="_blank">${loginUrl}</a></p>
      <br />
      <p>Best regards,</p>
      <p>Travel Desk Team</p>
      <p>Vserv Infosystems Private Limited</p>
    `,
  };
};
