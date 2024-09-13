export interface ITypes {
  policyName: string;
  header: string;
  content: JSX.Element;
}

export type IFormProps = Omit<ITypes, 'header'>;

export interface IBlocks {
  text: string;
  element: JSX.Element;
}
