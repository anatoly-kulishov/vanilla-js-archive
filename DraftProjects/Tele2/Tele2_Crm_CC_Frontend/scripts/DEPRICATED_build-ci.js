'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Error with no parameters
if (process.argv.length === 2) {
  console.error("Expected at least one argument!");
  process.exit(1);
} else {
  switch (process.argv[2]) {
    // Build Alpha version
    case "-a":
      console.log("Build with alpha configurations");
      process.env.GENERATE_SOURCEMAP = 'false';
      process.env.REACT_APP_WS = 'wss://'
      process.env.REACT_APP_HTTP = 'https://'
      process.env.REACT_APP_SE = 'crmnsse';
      process.env.REACT_APP_BE = 'crmns-02';
      process.env.REACT_APP_NLP = 'crmhp';
      process.env.REACT_APP_SEARCH = 'https://t2ru-crmcclb-02';
      process.env.REACT_APP_KMS = 'https://kms.tele2.ru';
      process.env.REACT_APP_KMS_SEARCH = 'https://kms.tele2.ru/kms/lh';
      process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://kms.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW';
      process.env.REACT_APP_ADMIN = 'http://t2ru-crmcclb-02:8081';
      process.env.REACT_APP_TRBL = 'http://crmtrbl/Subscriber/Subscriber';
      process.env.REACT_APP_SMART_GIS_MAP='https://smartgis.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx';
      process.env.REACT_APP_SMART_GIS='https://torus-osm.corp.tele2.ru';
      process.env.REACT_APP_SMART_GIS_BACKUP='https://smartgis-osm.corp.tele2.ru'
      process.env.REACT_APP_SMART_GIS_REDIRECT_MAP='http://smartgis-test.corp.tele2.ru/map-smartgis/'
      process.env.REACT_APP_SUZ='https://retail-map.teko.io';
      break;
    // Build Preprod version
    case "-pp":
      let search
      if (process.argv[3] === "b") {
        search = `https://t2ru-crmccfe-pp:9443`
      } else {
        search = 'https://t2ru-crmccfe-pp'
      }
      console.log("Build with preprod configurations");
      process.env.REACT_APP_WS = 'wss://'
      process.env.REACT_APP_HTTP = 'https://'
      process.env.REACT_APP_SE = 't2ru-crmse-tst';
      process.env.REACT_APP_BE = 't2ru-crmcchp-pp';
      process.env.REACT_APP_NLP = 't2ru-crmbepp-02';
      process.env.REACT_APP_SEARCH = search;
      process.env.REACT_APP_KMS = 'https://t2ru-kmststap-01.corp.tele2.ru';
      process.env.REACT_APP_KMS_SEARCH = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/lh';
      process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW';
      process.env.REACT_APP_ADMIN = 'https://t2ru-crmccfe-pp:8443';
      process.env.REACT_APP_TRBL = 'http://10.77.251.165:8082/Subscriber/Subscriber';
      process.env.REACT_APP_SMART_GIS_MAP='https://smartgis-test.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx';
      process.env.REACT_APP_SMART_GIS='https://torus-osm.corp.tele2.ru';
      process.env.REACT_APP_SMART_GIS_BACKUP='https://smartgis-osm.corp.tele2.ru'
      process.env.REACT_APP_SMART_GIS_REDIRECT_MAP='http://smartgis.corp.tele2.ru/map-smartgis'
      process.env.REACT_APP_SUZ='https://retail-map.teko.io';
      break;
    // Build Dev version
    case "-dev":
      let dev
      if (process.argv[3]) {
        const dev_node = (20000 + +process.argv[3]).toString()
        dev = `http://t2ru-crmcc-dev01:${dev_node}`
      } else {
        dev = 'https://t2ru-crmccfe-pp'
      }
      console.log("Build with dev configurations");
      console.log(`and address search ${dev}`)
      process.env.REACT_APP_WS = 'wss://'
      process.env.REACT_APP_HTTP = 'https://'
      process.env.REACT_APP_SE = 't2ru-crmse-tst';
      process.env.REACT_APP_BE = 't2ru-crmccbe-t1';
      process.env.REACT_APP_NLP = 't2ru-crmcc-dev01';
      process.env.REACT_APP_SEARCH = dev;
      process.env.REACT_APP_KMS = 'https://t2ru-kmststap-01.corp.tele2.ru';
      process.env.REACT_APP_KMS_SEARCH = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/lh';
      process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW';
      process.env.REACT_APP_ADMIN = 'https://t2ru-crmccfe-pp:8443';
      process.env.REACT_APP_TRBL = 'http://10.77.251.165:8082/Subscriber/Subscriber';
      process.env.REACT_APP_SMART_GIS_MAP='https://smartgis-test.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx';
      process.env.REACT_APP_SMART_GIS='https://torus-osm.corp.tele2.ru';
      process.env.REACT_APP_SMART_GIS_BACKUP='https://smartgis-osm.corp.tele2.ru'
      process.env.REACT_APP_SMART_GIS_REDIRECT_MAP='http://smartgis-test.corp.tele2.ru/map-smartgis/'
      process.env.REACT_APP_SUZ='https://retail-map.teko.io';
      break;
    // Build Test version
    case "-tst":
      console.log("Build with test configurations");
      process.env.REACT_APP_WS = 'wss://'
      process.env.REACT_APP_HTTP = 'https://'
      process.env.REACT_APP_SE = 't2ru-crmse-tst';
      process.env.REACT_APP_BE = 't2ru-crm-k8s-ms-tst';
      process.env.REACT_APP_NLP = 't2ru-crmbepp-02';
      process.env.REACT_APP_SEARCH = 'http://t2ru-crmcc-dev02:12400';
      process.env.REACT_APP_KMS = 'https://t2ru-kmststap-01.corp.tele2.ru';
      process.env.REACT_APP_KMS_SEARCH = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/lh';
      process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW';
      process.env.REACT_APP_ADMIN = 'https://t2ru-crmccfe-pp:8443';
      process.env.REACT_APP_TRBL = 'http://10.77.251.165:8082/Subscriber/Subscriber';
      process.env.REACT_APP_SMART_GIS_MAP='https://smartgis-test.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx';
      process.env.REACT_APP_SMART_GIS='https://torus-osm.corp.tele2.ru';
      process.env.REACT_APP_SMART_GIS_BACKUP='https://smartgis-osm.corp.tele2.ru'
      process.env.REACT_APP_SMART_GIS_REDIRECT_MAP='http://smartgis-test.corp.tele2.ru/map-smartgis/'
      process.env.REACT_APP_SUZ='https://retail-map.teko.io';
      break;
    // Build t1 version
    case "-t1":
      console.log("Build with test configurations");
      process.env.REACT_APP_WS = 'wss://'
      process.env.REACT_APP_HTTP = 'https://'
      process.env.REACT_APP_SE = 't2ru-crmse-tst';
      process.env.REACT_APP_BE = 't2ru-crmccbe-t1';
      process.env.REACT_APP_NLP = 't2ru-crmbepp-02';
      process.env.REACT_APP_SEARCH = 'http://t2ru-crmcc-dev02:1488';
      process.env.REACT_APP_KMS = 'https://t2ru-kmststap-01.corp.tele2.ru';
      process.env.REACT_APP_KMS_SEARCH = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/lh';
      process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW';
      process.env.REACT_APP_ADMIN = 'https://t2ru-crmccfe-pp:8443'
      process.env.REACT_APP_TRBL = 'http://10.77.251.165:8082/Subscriber/Subscriber';
      process.env.REACT_APP_SMART_GIS_MAP='https://smartgis-test.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx';
      process.env.REACT_APP_SMART_GIS='https://torus-osm.corp.tele2.ru';
      process.env.REACT_APP_SMART_GIS_BACKUP='https://smartgis-osm.corp.tele2.ru'
      process.env.REACT_APP_SMART_GIS_REDIRECT_MAP='http://smartgis-test.corp.tele2.ru/map-smartgis/'
      process.env.REACT_APP_SUZ='https://retail-map.teko.io';
      break;
    // Build Prod node version
    case "-p":
      const param_node = process.argv[3]
      if (param_node === undefined || !Number.isInteger(+param_node)) {
        console.error("Unexpected node parameter!");
        process.exit(1);
      }
      const fe_node = (8080 + +param_node).toString()
      const be_node = (0 + +param_node).toString().padStart(2, '0')

      console.log(`Build with prod configurations node: ${be_node}`);
      process.env.GENERATE_SOURCEMAP = 'false';
      process.env.REACT_APP_WS = 'wss://'
      process.env.REACT_APP_HTTP = 'https://'
      process.env.REACT_APP_SE = 'crmnsse';
      process.env.REACT_APP_BE = `t2ru-crmccnx-${be_node}`;
      process.env.REACT_APP_NLP = 'https://crmhp';
      process.env.REACT_APP_SEARCH = `http://t2ru-crmcc-dev02:${fe_node}`;
      process.env.REACT_APP_KMS = 'https://kms.tele2.ru';
      process.env.REACT_APP_KMS_SEARCH = 'https://kms.tele2.ru/kms/lh';
      process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://kms.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW';
      process.env.REACT_APP_ADMIN = 'https://admin.crmcc.corp.tele2.ru';
      process.env.REACT_APP_TRBL = 'http://crmtrbl/Subscriber/Subscriber';
      process.env.REACT_APP_SMART_GIS_MAP='https://smartgis.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx'
      process.env.REACT_APP_SMART_GIS='https://torus-osm.corp.tele2.ru';
      process.env.REACT_APP_SMART_GIS_BACKUP='https://smartgis-osm.corp.tele2.ru'
      process.env.REACT_APP_SMART_GIS_REDIRECT_MAP='http://smartgis.corp.tele2.ru/map-smartgis'
      process.env.REACT_APP_SUZ='https://retail-map.teko.io';
      break;
    case "-prod": {
      let search = ""
      let backend = ""
      const feParam = process.argv[3]
      const beParam = process.argv[4]
      if (feParam === undefined) {
        console.error("Silverster (s) or Tweety (t) second parameters expected!");
        process.exit(1);
      }
      switch (feParam) {
        case 't':
          search = 'https://tweety.crmcc.corp.tele2.ru';
          backend = 'crmhp-02'
          if (beParam !== undefined && beParam === 'w') {
            backend = 't2ru-crmccbe-11'
          }
          break;
        case 's':
          search = 'https://silvester.crmcc.corp.tele2.ru';
          backend = 'crmhp'
          if (beParam !== undefined && beParam === 'w') {
            backend = 'crmns-02'
          }
          break;
      }
      console.log(`Build with prod configurations; search: ${search}`);
      process.env.GENERATE_SOURCEMAP = 'false';
      process.env.REACT_APP_WS = 'wss://'
      process.env.REACT_APP_HTTP = 'https://'
      process.env.REACT_APP_SE = 'crmnsse';
      process.env.REACT_APP_BE = backend;
      process.env.REACT_APP_NLP = 'crmhp';
      process.env.REACT_APP_SEARCH = search;
      process.env.REACT_APP_KMS = 'https://kms.tele2.ru';
      process.env.REACT_APP_KMS_SEARCH = 'https://kms.tele2.ru/kms/lh';
      process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://kms.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW';
      process.env.REACT_APP_ADMIN = 'https://admin.crmcc.corp.tele2.ru';
      process.env.REACT_APP_TRBL = 'http://crmtrbl/Subscriber/Subscriber';
      process.env.REACT_APP_SMART_GIS_MAP='https://smartgis.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx'
      process.env.REACT_APP_SMART_GIS='https://torus-osm.corp.tele2.ru';
      process.env.REACT_APP_SMART_GIS_BACKUP='https://smartgis-osm.corp.tele2.ru'
      process.env.REACT_APP_SMART_GIS_REDIRECT_MAP='http://smartgis.corp.tele2.ru/map-smartgis'
      process.env.REACT_APP_SUZ='https://retail-map.teko.io';
      break;
    }
    default:
      console.error("Unexpected argument!");
      process.exit(1);
      break;
  }
}

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('react-dev-utils/chalk');
const fs = require('fs-extra');
const bfj = require('bfj');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const argv = process.argv.slice(2);
const writeStatsJson = argv.indexOf('--stats') !== -1;

// Generate configuration
const config = configFactory('production');

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // First, read the current file sizes in build directory.
    // This lets us display how much they changed later.
    return measureFileSizesBeforeBuild(paths.appBuild);
  })
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild);
    // Merge with the public folder
    copyPublicFolder();
    // Start the webpack build
    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        );
        console.log(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        );
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrlOrPath;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      );
    },
    err => {
      const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
      if (tscCompileOnError) {
        console.log(
          chalk.yellow(
            'Compiled with the following type errors (you may want to check these before deploying your app):\n'
          )
        );
        printBuildError(err);
      } else {
        console.log(chalk.red('Failed to compile.\n'));
        printBuildError(err);
        process.exit(1);
      }
    }
  )
  .catch(err => {
    if (err && err.message) {
      console.log(err.message);
    }
    process.exit(1);
  });

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log('Creating an optimized production build...');

  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        let errMessage = err.message;

        // Add additional information for postcss errors
        if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
          errMessage +=
            '\nCompileError: Begins at CSS selector ' +
            err['postcssNode'].selector;
        }

        messages = formatWebpackMessages({
          errors: [errMessage],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        );
      }
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      const resolveArgs = {
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      };

      if (writeStatsJson) {
        return bfj
          .write(paths.appBuild + '/bundle-stats.json', stats.toJson())
          .then(() => resolve(resolveArgs))
          .catch(error => reject(new Error(error)));
      }

      return resolve(resolveArgs);
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}
