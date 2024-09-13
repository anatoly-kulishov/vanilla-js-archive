import s from './EmptyTemplateOption.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
  text?: string;
}

export const EmptyTemplateOption = ({ className, text }: Props) => {
  return <div className={classNames(s.emptyTemplateOption, className)}>{text}</div>;
};
