import { RuleConfigSeverity, UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', ['ci', 'feat', 'fix', 'refactor', 'test']],
    'body-leading-blank': [RuleConfigSeverity.Error, 'always'],
    'footer-leading-blank': [RuleConfigSeverity.Error, 'always'],
    'header-max-length': [RuleConfigSeverity.Error, 'always', 72],
    'header-min-length': [RuleConfigSeverity.Error, 'always', 11],
    'scope-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-full-stop': [RuleConfigSeverity.Error, 'never', '.'],
    'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'type-empty': [RuleConfigSeverity.Error, 'never'],
  },
};

export default Configuration;
