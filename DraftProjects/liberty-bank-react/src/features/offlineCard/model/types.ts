import { Control, FieldErrors, FieldValues } from 'react-hook-form';

export type ControlType = {
  control: Control<FieldValues>;
  errors?: FieldErrors<FieldValues>;
};

export type FormValues = {
  insuranceProductId: number;
  name: string;
  surname: string;
  patronym: string;
  mobilePhone: string;
  date: string;
  time: string;
  city: string;
  street: string;
  building: string;
  apartment: number;
  floor: number;
  entrance: number;
  officeNumber: string;
  type: 'HOME' | 'BANK';
};
