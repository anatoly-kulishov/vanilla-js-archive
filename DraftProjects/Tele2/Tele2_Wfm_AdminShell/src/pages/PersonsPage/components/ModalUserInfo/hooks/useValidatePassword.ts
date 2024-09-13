import { useMemo } from 'react';

export type Status = 'ok' | 'fail';

export type Rule = {
  title: string;
  validate: (password: string) => Status;
};

export type RulesResult = {
  title: string;
  status: Status;
}[];

const rules: Rule[] = [
  {
    title: 'не менее 10 символов',
    validate: (password) => (
      password && password.length >= 10 ? 'ok' : 'fail'
    ),
  },
  {
    title: 'должен содержать цифры',
    validate: (password) => (
      /[0-9]/.test(password) ? 'ok' : 'fail'
    ),
  },
  {
    title: 'должен содержать заглавные буквы латинского алфавита',
    validate: (password) => (
      password && /[A-Z]/.test(password) ? 'ok' : 'fail'
    ),
  },
  {
    title: 'должен содержать строчные буквы латинского алфавита',
    validate: (password) => (
      password && /[a-z]/.test(password) ? 'ok' : 'fail'
    ),
  },
  {
    title: 'должен содержать специальные символы, например -<>/@#$%&*',
    validate: (password) => (
      password && /[^a-zA-Z0-9]/.test(password) ? 'ok' : 'fail'
    ),
  },
];

const useValidatePassword = (password: string) => {
  const {
    isValidPassword,
    rulesPasswordResult,
  } = useMemo(() => {
    let allValid = true;

    const result = rules.map((rule) => {
      const ruleResult = rule.validate(password);

      allValid = allValid && ruleResult === 'ok';

      return { title: rule.title, status: ruleResult };
    });

    return {
      rulesPasswordResult: result,
      isValidPassword: allValid,
    };
  }, [password]);

  return {
    isValidPassword,
    rulesPasswordResult,
  };
};

export default useValidatePassword;
