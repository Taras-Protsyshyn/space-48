export const filterFileImages = (
  req: Express.Request & { fileValidationError: string },
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = 'Only images jpg, jpeg, png formats  allowed';

    return callback(null, false);
  }

  callback(null, true);
};
