export enum MimeTypes {
  PNG = 'image/png',
  JPG = 'image/jpeg',
  PDF = 'application/pdf',
  TIFF = 'image/tiff'
}

export const acceptableUploadFormats = Object.values(MimeTypes).join();
