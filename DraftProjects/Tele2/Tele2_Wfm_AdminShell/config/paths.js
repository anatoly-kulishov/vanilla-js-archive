const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  // eslint-disable-next-line import/no-dynamic-require
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL,
);

const buildPath = process.env.BUILD_PATH || 'build';

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extensions = moduleFileExtensions.find((extension) => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

  if (extensions) {
    return resolveFn(`${filePath}.${extensions}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  dotenvLocal: resolveApp('.env.local'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp('public'),
  appEntry: resolveApp('src/index.ts'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  publicUrlOrPath,
  // paths
  assets: resolveApp('src/assets/'),
  components: resolveApp('src/components/'),
  constants: resolveApp('src/constants/'),
  containers: resolveApp('src/containers/'),
  context: resolveApp('src/context/'),
  enums: resolveApp('src/enums/'),
  hocs: resolveApp('src/hocs/'),
  hooks: resolveApp('src/hooks/'),
  reducers: resolveApp('src/reducers/'),
  sagas: resolveApp('src/sagas/'),
  pages: resolveApp('src/pages/'),
  selectors: resolveApp('src/selectors/'),
  utils: resolveApp('src/utils/'),
  types: resolveApp('src/types/'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
