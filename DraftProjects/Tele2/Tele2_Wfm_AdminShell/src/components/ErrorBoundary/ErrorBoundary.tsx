import { Component, ErrorInfo, ReactNode } from 'react';
import { Typography, Alert } from 'antd';

const { Title, Paragraph } = Typography;

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBundaryState = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBundaryState> {
  // eslint-disable-next-line react/state-in-constructor
  state: ErrorBundaryState = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { children } = this.props;
    const { errorInfo, error } = this.state;

    if (errorInfo) {
      return (
        <Alert
          type="error"
          message={(
            <Title level={2}>Что-то пошло не так</Title>
          )}
          description={(
            <>
              <Paragraph strong>
                Отправьте скришот ошибки и подробности ниже администратору
                и попробуйте обновить страницу.
              </Paragraph>
              <Paragraph>{error && error.toString()}</Paragraph>
              <Paragraph>{errorInfo.componentStack}</Paragraph>
            </>
          )}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
