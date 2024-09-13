const path = require('path');

const pckgJson = require('../package.json');

const deps = pckgJson.dependencies;

module.exports = () => {
  return {
    name: 'websellerRemote',
    filename: 'remoteEntry.js',
    exposes: {
      './rootReducer': path.resolve(__dirname, '../src/exposes/rootReducer'),
      './rootSaga': path.resolve(__dirname, '../src/exposes/rootSaga'),
      './SalesOffice': path.resolve(__dirname, '../src/exposes/SalesOffice'),
      './DocumentIdentity': path.resolve(__dirname, '../src/exposes/DocumentIdentity'),
      './Signing': path.resolve(__dirname, '../src/exposes/Signing')
    },
    shared: {
      react: { singleton: true, requiredVersion: deps['react'] },
      'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
      'react-router': { singleton: true, requiredVersion: deps['react-router'] },
      'react-router-dom': { singleton: true, requiredVersion: deps['react-router-dom'] },
      'react-redux': { singleton: true, requiredVersion: deps['react-redux'] },
      redux: { singleton: true, requiredVersion: deps['redux'] },
      'redux-actions': { singleton: true, requiredVersion: deps['redux-actions'] },
      'redux-saga': { singleton: true, requiredVersion: deps['redux-saga'] },
      axios: { singleton: true, requiredVersion: deps['axios'] },
      antd: { singleton: true, requiredVersion: deps['antd'] },
      'styled-components': { singleton: true, requiredVersion: deps['styled-components'] },
      immer: { singleton: true, requiredVersion: deps['immer'] }
    }
  };
};
