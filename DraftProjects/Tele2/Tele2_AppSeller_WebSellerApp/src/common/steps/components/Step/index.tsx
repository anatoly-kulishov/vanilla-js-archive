import { FC } from 'react';

import { Title, Button } from 'uiKit';

import styledStep from './styled';

const { Container, Main, Footer } = styledStep;

type Props = {
  title?: string;
  children: JSX.Element;
  textGoForward?: string;
  textGoBack?: string;
  isLoadingGoForward?: boolean;
  isLoadingGoBack?: boolean;
  isDisabledGoForward?: boolean;
  isDisabledGoBack?: boolean;
  handleGoForward?: VoidFunction;
  handleGoBack?: VoidFunction;
  footer?: JSX.Element;
};

const Step: FC<Props> = ({
  title,
  children,
  textGoForward = 'Далее',
  textGoBack = 'Назад',
  isLoadingGoForward,
  isLoadingGoBack,
  isDisabledGoForward,
  isDisabledGoBack,
  handleGoForward,
  handleGoBack,
  footer
}) => {
  const renderFooter = () => {
    if (footer) {
      return footer;
    }

    const hasGorForward = Boolean(handleGoForward);
    const hasGoBack = Boolean(handleGoBack);

    if (hasGorForward || hasGoBack) {
      return (
        <Footer hasGoForward={hasGorForward} hasGoBack={hasGoBack}>
          {hasGoBack && (
            <Button loading={isLoadingGoBack} disabled={isDisabledGoBack} onClick={handleGoBack}>
              {textGoBack}
            </Button>
          )}
          {hasGorForward && (
            <Button
              type="primary"
              loading={isLoadingGoForward}
              disabled={isDisabledGoForward}
              onClick={handleGoForward}>
              {textGoForward}
            </Button>
          )}
        </Footer>
      );
    }

    return null;
  };

  return (
    <Container>
      {title && (
        <Title bold fontSize={18}>
          {title}
        </Title>
      )}
      <Main>{children}</Main>
      {renderFooter()}
    </Container>
  );
};

export default Step;
