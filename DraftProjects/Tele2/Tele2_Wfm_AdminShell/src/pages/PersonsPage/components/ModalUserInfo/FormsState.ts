import ResponseAuth from 'types/response/auth';

declare namespace FormsState {
  export type FormState = ResponseAuth.UserInfo & {
    roles: string;
  };

  export type PasswordFormState = {
    password: string;
    repeatPassword: string;
  };

  export type UserClaimState = {
    type: string;
    value: string;
  };
}

export default FormsState;
