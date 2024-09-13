interface IStep {
  key: string;
  title: string;
  width?: '100%' | '80%' | '60%'
  // TODO Типизировать
  render: any;
}

export type Steps = Array<IStep>;

export class Step implements IStep {
  key = ''
  title = ''
  width = '100%' as const
  render = undefined

  constructor({ key, title, width, render }) {
    this.key = key
    this.title = title
    this.width = width || '100%'
    this.render = render
  }
}