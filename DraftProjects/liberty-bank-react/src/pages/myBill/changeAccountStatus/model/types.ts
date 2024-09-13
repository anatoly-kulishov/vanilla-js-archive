export interface IСhangeStatusArgs {
  id: string;
  status: string;
}

export interface IError {
  code: number;
  message: string;
  timeStamp: string;
}
export interface IResponseStatus {
  status?: string;
}
