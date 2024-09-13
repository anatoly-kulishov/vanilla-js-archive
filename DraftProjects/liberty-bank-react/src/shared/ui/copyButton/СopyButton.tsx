import { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { COPIED_TEXT } from './constants';
import style from './СopyButton.module.scss';
import { Button, Icon, Text } from '..';

type Props = {
  value: string;
  testId?: string;
};

export const CopyButton: FC<Props> = ({ value, testId }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const showCopied = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <>
      <CopyToClipboard text={value}>
        <Button theme='icon' onClick={showCopied} data-testid={testId}>
          <Icon icon={'copy-card'} widthAndHeight={'16'} fill={'none'} />
        </Button>
      </CopyToClipboard>
      {isCopied && (
        <Text tag='span' className={style.copyIcon}>
          {COPIED_TEXT}
        </Text>
      )}
    </>
  );
};
