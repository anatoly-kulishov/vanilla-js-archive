import { FC } from 'react';
import { Provider } from 'react-redux';

function withExternalStore(Component: FC) {
  return ({ store, ...props }) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

export default withExternalStore;
