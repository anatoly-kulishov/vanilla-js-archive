'use strict';

// Установка значений переменных окружения
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const chalk = require('react-dev-utils/chalk');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printBuildError = require('react-dev-utils/printBuildError');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');

const paths = require('../config/paths');

// Установка переменных окружения для сборок, пригодных для публикации
const envFactory = require('../config/setEnv');
envFactory();

require('../config/env');

// Импорт конфигурации Webpack для сборки, пригодной для публикации на сервер
// Переменные окружения должны быть уже установлены до этого импорта
const configFactory = require('../config/webpack.prod');
const config = configFactory();

// Скрипт падает с ошибкой, если нет основных файлов
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// Запуск сборок
(function () {
  console.log('Creating an optimized production build...');

  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      // Получение статистики сборки
      const stat = stats.toJson({ moduleTrace: false });

      // Для Webpack 5 необходим такая обработка сообщений, так как formatWebpackMessages пока не поддерживает
      // новый формат сообщений: https://github.com/facebook/create-react-app/issues/9880
      const messages = formatWebpackMessages({
        errors: stat.errors.map((e) => e.message),
        warnings: stat.warnings.map((e) => e.message),
      });

      if (err) {
        if (!err.message) {
          return reject(err);
        }

        let errMessage = err.message;

        // Дополнительная информация для ошибок postcss
        if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
          errMessage +=
            '\nCompileError: Begins at CSS selector ' +
            err['postcssNode'].selector;
        }
      }
      if (messages.errors.length) {
        // В консоль будет выводится только первая ошибка
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        // Для CI/CD предупреждения являются критичными и сборка является неуспешной
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          '\nTreating warnings as errors because process.env.CI = true.\n' +
          'Most CI servers set it automatically.\n'
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }

      const resolveArgs = {
        stats,
        warnings: messages.warnings,
      };

      return resolve(resolveArgs)
    });
  });
})()
  // Вывод сообщений после сборки
  .then(
    ({ _stats, warnings }) => {
      // Вывод предупреждений
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        );
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }
    },
    // Вывод ошибок
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
