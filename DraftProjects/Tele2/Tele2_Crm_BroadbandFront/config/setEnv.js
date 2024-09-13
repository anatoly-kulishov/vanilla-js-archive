const setServiceLocation = (env) => {
  if (env !== '-dev') {
    process.env.REACT_APP_BROADBAND_ORDER_SESSION_SERVICE_LOCATION = '/service/broadbandordersession'
    process.env.REACT_APP_BROADBAND_CONNECTION_ORDER_SERVICE_LOCATION = '/service/broadbandconnectionorderservice'

  } else {
    process.env.REACT_APP_BROADBAND_ORDER_SESSION_SERVICE_LOCATION = ':12020'
    process.env.REACT_APP_BROADBAND_CONNECTION_ORDER_SERVICE_LOCATION=':11680'
  }
}

module.exports = () => {
  // Error with no parameters
  if (process.argv.length === 2) {
    console.error("Expected at least one argument!");
    process.exit(1);
  } else {
    setServiceLocation(process.argv[2])
    switch (process.argv[2]) {
      // Build Preprod version
      case "-pp":
        let host
        if (process.argv[3] === "b") {
          host = `https://t2ru-crmccfe-pp:9443`
        } else {
          host = 'https://t2ru-crmccfe-pp'
        }
        console.log("Build with preprod configurations");
        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_BE = 't2ru-crmcchp-pp';
        process.env.REACT_APP_HOST = host;
        process.env.REACT_APP_SEARCH = host;
        break;
      case "-dev": // Бывшая dev сборка
        let hostUrl
        if (process.argv[4]) {
          const hostPort = process.argv[4]
          hostUrl = `http://t2ru-crmcc-dev01:${hostPort}`
        } else {
          console.error("`host_port` parameter expected!")
        }
        console.log("Build with dev configurations");
        console.log(`and address search ${hostUrl}`)

        let be ='t2ru-crmccbe-t1'

        const usePpBe = process.argv[5] === 'true'
        if (usePpBe) {
          be = 't2ru-crmcchp-pp'
          setServiceLocation('-pp')
        }

        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_BE = be;
        process.env.REACT_APP_HOST = hostUrl;
        process.env.REACT_APP_SEARCH = hostUrl;
        break;
      case "-tst":
        console.log("Build with test configurations");
        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_BE = 't2ru-crm-k8s-ms-tst';
        process.env.REACT_APP_HOST = 'http://t2ru-crmcc-dev02:12400';
        process.env.REACT_APP_SEARCH = 'http://t2ru-crmcc-dev02:12400';
        break;
      case "-t1": // Бывшая t1 сборка
        console.log("Build with test configurations");
        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_BE = 't2ru-crmccbe-t1.corp.tele2.ru';
        process.env.REACT_APP_HOST = 'http://t2ru-crmcc-dev02:1488';
        process.env.REACT_APP_SEARCH = 'http://t2ru-crmcc-dev02:1488';
        break;
      case "-prod": {
        let host = ""
        let backend = ""
        const feParam = process.argv[3]
        const beParam = process.argv[4]
        if (feParam === undefined) {
          console.error("Silverster (s) or Tweety (t) second parameters expected!");
          process.exit(1);
        }
        switch (feParam) {
          case 't':
            host = 'https://tweety.crmcc.corp.tele2.ru';
            backend = 'crmhp-02'
            if (beParam !== undefined && beParam === 'w') {
              backend = 't2ru-crmccbe-11'
            }
            break;
          case 's':
            host = 'https://silvester.crmcc.corp.tele2.ru';
            backend = 'crmhp'
            if (beParam !== undefined && beParam === 'w') {
              backend = 'crmns-02'
            }
            break;
        }
        console.log(`Build with prod configurations; host: ${host}`);
        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_BE = backend;
        process.env.REACT_APP_HOST = host;
        process.env.REACT_APP_SEARCH = host;

        process.env.REACT_APP_BROADBAND_DADATA_INTEGRATION_SERVICE_LOCATION = '/service/dadataintegration'
        process.env.REACT_APP_BROADBAND_ADDRESS_INFO_SERVICE_LOCATION = '/service/addressinfoservice'
        process.env.REACT_APP_BROADBAND_PERSONAL_DOCUMENT_SERVICE_LOCATION = '/service/personaldocumentservice'
        process.env.REACT_APP_BROADBAND_ORDER_SESSION_SERVICE_LOCATION = '/service/broadbandordersession'
        process.env.REACT_APP_BROADBAND_CONNECTION_ORDER_SERVICE_LOCATION = '/service/broadbandconnectionorderservice'
        process.env.REACT_APP_BROADBAND_CONNECTION_ORDER_EDIT_SERVICE_LOCATION = '/service/broadbandconnectionordereditservice'
        process.env.REACT_APP_BROADBAND_CONNECTION_EQUIPMENT_SERVICE_LOCATION = '/service/broadbandconnectionequipment'
        process.env.REACT_APP_BROADBAND_TIMESLOT_SERVICE_LOCATION = '/service/timeslotservice'
        process.env.REACT_APP_BROADBAND_MSISDN_RESERVATION_SERVICE_LOCATION= '/service/msisdnreservationservice'
        break;
      }
      case "-onebuild": // сборка для работы с волтом
        process.env.REACT_APP_HTTP = 'ENV_REACT_APP_HTTP'
        process.env.REACT_APP_BE = 'ENV_REACT_APP_BE';
        process.env.REACT_APP_HOST = 'ENV_REACT_APP_HOST';
        process.env.REACT_APP_SEARCH = 'ENV_REACT_APP_SEARCH';

        process.env.REACT_APP_BROADBAND_DADATA_INTEGRATION_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_DADATA_INTEGRATION_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_ADDRESS_INFO_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_ADDRESS_INFO_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_PERSONAL_DOCUMENT_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_PERSONAL_DOCUMENT_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_ORDER_SESSION_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_ORDER_SESSION_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_CONNECTION_ORDER_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_CONNECTION_ORDER_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_CONNECTION_ORDER_EDIT_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_CONNECTION_ORDER_EDIT_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_CONNECTION_EQUIPMENT_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_CONNECTION_EQUIPMENT_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_TIMESLOT_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_TIMESLOT_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_MSISDN_RESERVATION_SERVICE_LOCATION= 'ENV_REACT_APP_BROADBAND_MSISDN_RESERVATION_SERVICE_LOCATION'
        break;
      default:
        console.error("Unexpected argument!");
        process.exit(1);
    }
  }
}