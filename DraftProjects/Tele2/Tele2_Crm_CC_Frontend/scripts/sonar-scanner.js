// скрипт нужен если нужно локально запустить проверку кода
// для этого необходимо локально установленный SonarScanner - https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/

const scanner = require('sonarqube-scanner').customScanner;
scanner(
  {
    serverUrl: 'http://sq.corp.tele2.ru',
    token: '765ff6430ba87a3bd4353ed7c703a7e615791c28',
    options: {
      'sonar.projectName': 'CRM CC Frontend',
      'sonar.projectKey': 'CRM_CC_Frontend',
      'sonar.sources': 'src',
      'sonar.language': 'js',
      'sonar.tests': 'cypress/integration',
      'sonar.test.inclusions': '**/*.spec.js',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.testExecutionReportPaths': 'reporter/historyNavigation.spec.js.xml, reporter/historyFilters.spec.js.xml',
      // 'sonar.testExecutionReportPaths': 'reporter',
      // 'sonar.testExecutionReportPath.inclusions': '*.spec.js.xml',
      // 'sonar.branch.name': 'feature/sonar_scanner'
    },
  },
  () => {},
);