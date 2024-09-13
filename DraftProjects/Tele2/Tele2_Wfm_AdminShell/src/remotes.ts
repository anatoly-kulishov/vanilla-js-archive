export default () => {
  const isProduction = process.env.NODE_ENV === 'production';
  // @ts-ignore
  window.tele2_wfm_uilibraryappUrl = isProduction ? 'https://ENV_APP_URL_FRONT/App/ENV_APP_ROUTE_TO_SERVICE_LIB' : 'http://localhost:3001';
};
