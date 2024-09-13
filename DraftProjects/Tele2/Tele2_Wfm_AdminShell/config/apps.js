module.exports = (env) => {
  function getHost() {
    switch (env) {
      case 'test': return 'localhost';
      case 'preproduction': return 't2ru-crmccfe-pp';
      case 'production': return 'crmcc';
      default: return 'localhost';
    }
  }

  const host = getHost();

  return {
    remoteApps: {
      app: 'app',
    },
    remoteScripts: [
      {
        module: 'app',
        entry: `http://${host}:3011/remoteApp.js`,
        global: 'App',
      },
    ],
  };
};
