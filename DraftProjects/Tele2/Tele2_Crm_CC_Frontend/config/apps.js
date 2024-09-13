module.exports = (env) => {
  function getHost (env) {
    switch (env) {
      case 'test': return 'localhost';
      case 'preproduction': return 't2ru-crmccfe-pp';
      case 'production': return 'crmcc'
    }
  };

  const host = getHost(env)

  return {
    remoteApps: {
      app: "app",
    },
    remoteScripts: [
      {
        module: "app",
        entry: `http://${host}:3001/remoteApp.js`,
        global: "App",
      },
    ],
  };
}
