module.exports = (mode) => {
  let APP_BE = 't2ru-crmccbe-t1';
  let APP_SE = 't2ru-crmse-tst';

  if (mode) {
    switch (mode) {
      case 'pp': {
        APP_SE = 't2ru-crmse-tst';
        APP_BE = 't2ru-crmcchp-pp';
        break;
      }
      case 'prod': {
        APP_BE = 'crmhp';
        APP_SE = 'crmnsse';
        break;
      }
      default: {
        APP_BE = 't2ru-crmccbe-t1';
        APP_SE = 't2ru-crmse-tst';
      }
    }
  }
  return { APP_BE, APP_SE };
};
