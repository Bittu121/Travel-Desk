export const uploadTicketDTO = (files) => {
  if (!Array.isArray(files)) return [];

  return files.map((file) => ({
    originalname: file.originalname,
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size,
    path: file.path,
  }));
};
