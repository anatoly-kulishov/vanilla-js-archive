import { FieldError } from 'react-hook-form';

export type FieldErrorArray = { [name: string]: FieldError }[];

export type UploadedFile = {
  file: File;
  isLoading: boolean;
  isSuccess?: boolean;
  isError?: boolean;
};
