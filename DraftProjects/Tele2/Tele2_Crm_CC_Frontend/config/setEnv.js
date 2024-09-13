console.log(`port arg: ${process.argv[3]} ${typeof process.argv[3]}`)

const setServiceLocation = isDev => {
  if (isDev) {
    process.env.REACT_APP_WEBIM_SERVICE_LOCATION = ':11990'
    process.env.REACT_APP_REMAINS_SERVICE_LOCATION = ':11830'
    process.env.REACT_APP_TARIFF_CONSTRUCTOR_SERVICE_LOCATION = ':11820'
    process.env.REACT_APP_CHARGE_SERVICE_LOCATION = ':11810'
    process.env.REACT_APP_SHOP_ORDER_SERVICE_LOCATION = ':11950'
    process.env.REACT_APP_SUBS_COMPENSATION_CALCULATOR_SERVICE_LOCATION = ':12060'
    process.env.REACT_APP_BILLING_NOTIFICATION_SERVICE_LOCATION = ':12030'
    process.env.REACT_APP_CLICK_SERVICE_LOCATION = ':12340'
  } else {
    process.env.REACT_APP_WEBIM_SERVICE_LOCATION = '/service/webimsession'
    process.env.REACT_APP_REMAINS_SERVICE_LOCATION = '/service/Remains'
    process.env.REACT_APP_TARIFF_CONSTRUCTOR_SERVICE_LOCATION = '/service/TariffConstructorService'
    process.env.REACT_APP_CHARGE_SERVICE_LOCATION = '/service/charge'
    process.env.REACT_APP_SHOP_ORDER_SERVICE_LOCATION = '/service/shoporderservice'
    process.env.REACT_APP_SUBS_COMPENSATION_CALCULATOR_SERVICE_LOCATION = '/service/subsCompensationCalculator'
    process.env.REACT_APP_BILLING_NOTIFICATION_SERVICE_LOCATION = '/service/billingnotificationadmin'
    process.env.REACT_APP_CLICK_SERVICE_LOCATION = '/service/personsclickservice'
  }
}

module.exports = () => {
  // Error with no parameters
  if (process.argv.length === 2) {
    console.error('Expected at least one argument!')
    process.exit(1)
  } else {
    const isDev = process.argv[2] === '-dev'
    setServiceLocation(isDev)
    switch (process.argv[2]) {
      // Build Preprod version
      case '-pp':
        let search
        if (process.argv[3] === 'b') {
          search = `https://t2ru-crmccfe-pp:9443`
        } else {
          search = 'https://t2ru-crmccfe-pp'
        }
        console.log('Build with preprod configurations')
        process.env.REACT_APP_WS = 'wss://'
        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_SE = 't2ru-crmse-tst'
        process.env.REACT_APP_BE = 't2ru-crmcchp-pp'
        process.env.REACT_APP_NLP = 't2ru-crmbepp-02'
        process.env.REACT_APP_SEARCH = search
        process.env.REACT_APP_BROADBAND_FE = search + '/front/broadbandfront'
        process.env.REACT_APP_KMS = 'https://t2ru-kmststap-01.corp.tele2.ru'
        process.env.REACT_APP_KMS_SEARCH = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/lh'
        process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW'
        process.env.REACT_APP_ADMIN = 'https://t2ru-crmccfe-pp:8443'
        process.env.REACT_APP_TRBL = 'http://10.77.251.165:8082/Subscriber/Subscriber'
        process.env.REACT_APP_SMART_GIS_MAP = 'https://smartgis-test.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx'
        process.env.REACT_APP_SMART_GIS = 'https://torus-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_BACKUP = 'https://smartgis-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_REDIRECT_MAP = 'http://smartgis.corp.tele2.ru/map-smartgis'
        process.env.REACT_APP_SUZ = 'https://retail-map.teko.io'
        process.env.REACT_APP_CASPER = 'https://t2ru-crmccfe-pp:10443/'
        process.env.REACT_APP_MAGNIT = 'http://10.179.49.4/'
        break
      case '-dev': // Бывшая dev сборка
        let dev
        let hostAddr

        const devPort = process.argv[3]
        if (devPort) {
          const dev_node = (20000 + +devPort).toString()
          dev = `http://t2ru-crmcc-dev01:${dev_node}`
          hostAddr = 'http://t2ru-crmcc-dev01'
        } else {
          dev = 'https://t2ru-crmccfe-pp'
          hostAddr = 'https://t2ru-crmccfe-pp'
          setServiceLocation(false)
        }

        const broadbandPort = process.argv[4]
        const broadbandUrl = broadbandPort ? `${hostAddr}:${broadbandPort}` : 'https://t2ru-crmccfe-pp:35010'

        console.log('Build with dev configurations')
        console.log(`and address search ${dev}`)
        process.env.REACT_APP_WS = 'wss://'
        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_SE = 't2ru-crmse-tst'
        process.env.REACT_APP_BE = 't2ru-crmccbe-t1'
        process.env.REACT_APP_NLP = 't2ru-crmcc-dev01'
        process.env.REACT_APP_SEARCH = dev
        process.env.REACT_APP_BROADBAND_FE = broadbandUrl
        process.env.REACT_APP_KMS = 'https://t2ru-kmststap-01.corp.tele2.ru'
        process.env.REACT_APP_KMS_SEARCH = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/lh'
        process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW'
        process.env.REACT_APP_ADMIN = 'https://t2ru-crmccfe-pp:8443'
        process.env.REACT_APP_TRBL = 'http://10.77.251.165:8082/Subscriber/Subscriber'
        process.env.REACT_APP_SMART_GIS_MAP = 'https://smartgis-test.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx'
        process.env.REACT_APP_SMART_GIS = 'https://torus-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_BACKUP = 'https://smartgis-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_REDIRECT_MAP = 'http://smartgis-test.corp.tele2.ru/map-smartgis/'
        process.env.REACT_APP_SUZ = 'https://retail-map.teko.io'
        process.env.REACT_APP_CASPER = 'https://t2ru-crmccfe-pp:10443/'
        process.env.REACT_APP_MAGNIT = 'http://10.179.49.4/'
        break
      case '-tst':
        console.log('Build with test configurations')
        process.env.REACT_APP_WS = 'wss://'
        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_SE = 't2ru-crmse-tst'
        process.env.REACT_APP_BE = 't2ru-crm-k8s-ms-tst'
        process.env.REACT_APP_NLP = 't2ru-crmbepp-02'
        process.env.REACT_APP_SEARCH = 'http://t2ru-crmcc-dev02:12400'
        process.env.REACT_APP_BROADBAND_FE = process.env.REACT_APP_SEARCH + '/front/broadbandfront'
        process.env.REACT_APP_KMS = 'https://t2ru-kmststap-01.corp.tele2.ru'
        process.env.REACT_APP_KMS_SEARCH = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/lh'
        process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW'
        process.env.REACT_APP_ADMIN = 'https://t2ru-crmccfe-pp:8443'
        process.env.REACT_APP_TRBL = 'http://10.77.251.165:8082/Subscriber/Subscriber'
        process.env.REACT_APP_SMART_GIS_MAP = 'https://smartgis-test.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx'
        process.env.REACT_APP_SMART_GIS = 'https://torus-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_BACKUP = 'https://smartgis-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_REDIRECT_MAP = 'http://smartgis-test.corp.tele2.ru/map-smartgis/'
        process.env.REACT_APP_SUZ = 'https://retail-map.teko.io'
        process.env.REACT_APP_CASPER = 'https://t2ru-crmccfe-pp:10443/'
        process.env.REACT_APP_MAGNIT = 'http://10.179.49.4/'
        break
      case '-t1': // Бывшая t1 сборка
        console.log('Build with test configurations')
        process.env.REACT_APP_WS = 'wss://'
        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_SE = 't2ru-crmse-tst'
        process.env.REACT_APP_BE = 't2ru-crmccbe-t1.corp.tele2.ru'
        process.env.REACT_APP_NLP = 't2ru-crmbepp-02'
        process.env.REACT_APP_SEARCH = 'http://t2ru-crmcc-dev02:1488'
        process.env.REACT_APP_BROADBAND_FE = process.env.REACT_APP_SEARCH + '/front/broadbandfront'
        process.env.REACT_APP_KMS = 'https://t2ru-kmststap-01.corp.tele2.ru'
        process.env.REACT_APP_KMS_SEARCH = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/lh'
        process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://t2ru-kmststap-01.corp.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW'
        process.env.REACT_APP_ADMIN = 'https://t2ru-crmccfe-pp:8443'
        process.env.REACT_APP_TRBL = 'http://10.77.251.165:8082/Subscriber/Subscriber'
        process.env.REACT_APP_SMART_GIS_MAP = 'https://smartgis-test.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx'
        process.env.REACT_APP_SMART_GIS = 'https://torus-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_BACKUP = 'https://smartgis-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_REDIRECT_MAP = 'http://smartgis-test.corp.tele2.ru/map-smartgis/'
        process.env.REACT_APP_SUZ = 'https://retail-map.teko.io'
        process.env.REACT_APP_CASPER = 'https://t2ru-crmccfe-pp:10443/'
        process.env.REACT_APP_MAGNIT = 'http://10.179.49.4/'
        break
      case '-prod': {
        let search = ''
        let backend = ''
        const feParam = process.argv[3]
        const beParam = process.argv[4]
        if (feParam === undefined) {
          console.error('Silverster (s) or Tweety (t) second parameters expected!')
          process.exit(1)
        }
        switch (feParam) {
          case 't':
            search = 'https://tweety.crmcc.corp.tele2.ru'
            backend = 'crmhp-02'
            if (beParam !== undefined && beParam === 'w') {
              backend = 't2ru-crmccbe-11'
            }
            break
          case 's':
            search = 'https://silvester.crmcc.corp.tele2.ru'
            backend = 'crmhp'
            if (beParam !== undefined && beParam === 'w') {
              backend = 'crmns-02'
            }
            break
        }
        console.log(`Build with prod configurations; search: ${search}`)
        process.env.GENERATE_SOURCEMAP = 'false'
        process.env.REACT_APP_WS = 'wss://'
        process.env.REACT_APP_HTTP = 'https://'
        process.env.REACT_APP_SE = 'crmnsse'
        process.env.REACT_APP_BE = backend
        process.env.REACT_APP_NLP = 'crmhp'
        process.env.REACT_APP_SEARCH = search
        process.env.REACT_APP_BROADBAND_FE = search + '/front/broadbandfront'
        process.env.REACT_APP_KMS = 'https://kms.tele2.ru'
        process.env.REACT_APP_KMS_SEARCH = 'https://kms.tele2.ru/kms/lh'
        process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'https://kms.tele2.ru/kms/CM/T_PAKET_TARIF/VIEW'
        process.env.REACT_APP_ADMIN = 'https://admin.crmcc.corp.tele2.ru'
        process.env.REACT_APP_TRBL = 'http://crmtrbl/Subscriber/Subscriber'
        process.env.REACT_APP_SMART_GIS_MAP = 'https://smartgis.corp.tele2.ru/map-smartgis/ServiceGEOCODE.asmx'
        process.env.REACT_APP_SMART_GIS = 'https://torus-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_BACKUP = 'https://smartgis-osm.corp.tele2.ru'
        process.env.REACT_APP_SMART_GIS_REDIRECT_MAP = 'http://smartgis.corp.tele2.ru/map-smartgis'
        process.env.REACT_APP_SUZ = 'https://retail-map.teko.io'
        process.env.REACT_APP_CASPER = 'https://casper.crmcc.corp.tele2.ru'
        process.env.REACT_APP_MAGNIT = 'http://10.179.49.4/'
        break
      }
      case '-onebuild':
        console.log('Build with all env configurations')
        process.env.NODE_PATH = 'ENV_NODE_PATH'
        process.env.REACT_APP_WS = 'ENV_REACT_APP_WS'
        process.env.REACT_APP_HTTP = 'ENV_REACT_APP_HTTP'
        process.env.REACT_APP_BE = 'ENV_REACT_APP_BE'
        process.env.REACT_APP_SE = 'ENV_REACT_APP_SE'
        process.env.REACT_APP_NLP = 'ENV_REACT_APP_NLP'
        process.env.REACT_APP_SEARCH = 'ENV_REACT_APP_SEARCH'
        process.env.REACT_APP_BROADBAND_FE = 'ENV_REACT_APP_BROADBAND_FE'
        process.env.REACT_APP_WEBSELLER_FE = 'ENV_REACT_APP_WEBSELLER_FE'
        process.env.REACT_APP_KMS_DEFAULT = 'ENV_REACT_APP_KMS_DEFAULT'
        process.env.REACT_APP_KMS_SEARCH = 'ENV_REACT_APP_KMS_SEARCH'
        process.env.REACT_APP_KMS_API_OPEN_ARTICLE = 'ENV_REACT_APP_KMS_API_OPEN_ARTICLE'
        process.env.REACT_APP_ADMIN = 'ENV_REACT_APP_ADMIN'
        process.env.REACT_APP_TRBL = 'ENV_REACT_APP_TRBL'
        process.env.REACT_APP_SMART_GIS_DEFAULT = 'ENV_REACT_APP_SMART_GIS_DEFAULT'
        process.env.REACT_APP_SMART_GIS_BACKUP = 'ENV_REACT_APP_SMART_GIS_BACKUP'
        process.env.REACT_APP_SMART_GIS_MAP = 'ENV_REACT_APP_SMART_GIS_MAP'
        process.env.REACT_APP_SMART_GIS_REDIRECT_MAP = 'ENV_REACT_APP_SMART_GIS_REDIRECT_MAP'
        process.env.REACT_APP_SUZ = 'ENV_REACT_APP_SUZ'
        process.env.REACT_APP_MAGNIT = 'ENV_REACT_APP_MAGNIT'
        process.env.REACT_APP_CASPER = 'ENV_REACT_APP_CASPER'
        process.env.REACT_APP_WEBIM_APP = 'ENV_REACT_APP_WEBIM_APP'
        process.env.REACT_APP_WEBIM_SERVICE_LOCATION = 'ENV_REACT_APP_WEBIM_SERVICE_LOCATION'
        process.env.REACT_APP_BILLING_NOTIFICATION_SERVICE_LOCATION = 'ENV_REACT_APP_BILLING_NOTIFICATION_SERVICE_LOCATION'
        process.env.REACT_APP_TARIFF_CONSTRUCTOR_SERVICE_LOCATION = 'ENV_REACT_APP_TARIFF_CONSTRUCTOR_SERVICE_LOCATION'
        process.env.REACT_APP_REMAINS_SERVICE_LOCATION = 'REACT_APP_REMAINS_SERVICE_LOCATION'
        process.env.REACT_APP_CHARGE_SERVICE_LOCATION = 'ENV_REACT_APP_CHARGE_SERVICE_LOCATION'
        process.env.REACT_APP_SHOP_ORDER_SERVICE_LOCATION = 'ENV_REACT_APP_SHOP_ORDER_SERVICE_LOCATION'
        process.env.REACT_APP_SUBS_COMPENSATION_CALCULATOR_SERVICE_LOCATION = 'ENV_REACT_APP_SUBS_COMPENSATION_CALCULATOR_SERVICE_LOCATION'
        process.env.REACT_APP_OIDC_AUTH_HOST = 'ENV_REACT_APP_OIDC_AUTH_HOST'
        process.env.REACT_APP_APPSELLER_BACKEND_HOST_HTTP = 'ENV_REACT_APP_APPSELLER_BACKEND_HOST_HTTP'
        process.env.REACT_APP_APPSELLER_BACKEND_HOST_WS = 'ENV_REACT_APP_APPSELLER_BACKEND_HOST_WS'
        process.env.REACT_APP_APPSELLER_DATA_INTEGRATION_BE = 'ENV_REACT_APP_APPSELLER_DATA_INTEGRATION_BE'
        process.env.REACT_APP_CUSTOMER_REPRESENT_SERVICE_LOCATION = 'ENV_REACT_APP_CUSTOMER_REPRESENT_SERVICE_LOCATION'
		// ports'
        process.env.REACT_APP_AUTHORIZATION_SERVICE_LOCATION = 'ENV_REACT_APP_AUTHORIZATION_SERVICE_LOCATION'
        process.env.REACT_APP_REASON_CATEGORY_SERVICE_LOCATION = 'ENV_REACT_APP_REASON_CATEGORY_SERVICE_LOCATION'
        process.env.REACT_APP_PERSONAL_INFO_SERVICE_LOCATION = 'ENV_REACT_APP_PERSONAL_INFO_SERVICE_LOCATION'
        process.env.REACT_APP_SUBSCRIPTION_SERVICE_LOCATION = 'ENV_REACT_APP_SUBSCRIPTION_SERVICE_LOCATION'
        process.env.REACT_APP_SMS_TEMPLATE_SERVICE_LOCATION = 'ENV_REACT_APP_SMS_TEMPLATE_SERVICE_LOCATION'
        process.env.REACT_APP_TEMPORARY_PAYMENT_SERVICE_LOCATION = 'ENV_REACT_APP_TEMPORARY_PAYMENT_SERVICE_LOCATION'
        process.env.REACT_APP_REMAINS_SERVICE_LOCATION = 'ENV_REACT_APP_REMAINS_SERVICE_LOCATION'
        process.env.REACT_APP_MANUAL_SEARCH_SERVICE_LOCATION = 'ENV_REACT_APP_MANUAL_SEARCH_SERVICE_LOCATION'
        process.env.REACT_APP_SMS_SERVICE_LOCATION = 'ENV_REACT_APP_SMS_SERVICE_LOCATION'
        process.env.REACT_APP_BALANCE_SERVICE_LOCATION = 'ENV_REACT_APP_BALANCE_SERVICE_LOCATION'
        process.env.REACT_APP_STATUSES_HISTORY_SERVICE_LOCATION = 'ENV_REACT_APP_STATUSES_HISTORY_SERVICE_LOCATION'
        process.env.REACT_APP_MANAGMENT_SERVICE_LOCATION = 'ENV_REACT_APP_MANAGMENT_SERVICE_LOCATION'
        process.env.REACT_APP_MASS_TECH_PROBLEM_SERVICE_LOCATION = 'ENV_REACT_APP_MASS_TECH_PROBLEM_SERVICE_LOCATION'
        process.env.REACT_APP_COMMENT_SERVICE_LOCATION = 'ENV_REACT_APP_COMMENT_SERVICE_LOCATION'
        process.env.REACT_APP_SMS_HISTORY_SERVICE_LOCATION = 'ENV_REACT_APP_SMS_HISTORY_SERVICE_LOCATION'
        process.env.REACT_APP_OFFERS_SERVICE_LOCATION = 'ENV_REACT_APP_OFFERS_SERVICE_LOCATION'
        process.env.REACT_APP_SUBSCRIBER_STATUS_SERVICE_LOCATION = 'ENV_REACT_APP_SUBSCRIBER_STATUS_SERVICE_LOCATION'
        process.env.REACT_APP_TICKET_ADMIN_SERVICE_LOCATION = 'ENV_REACT_APP_TICKET_ADMIN_SERVICE_LOCATION'
        process.env.REACT_APP_TICKET_SERVICE_LOCATION = 'ENV_REACT_APP_TICKET_SERVICE_LOCATION'
        process.env.REACT_APP_ADMIN_UNIT_SERVICE_LOCATION = 'ENV_REACT_APP_ADMIN_UNIT_SERVICE_LOCATION'
        process.env.REACT_APP_HLR_SERVICE_LOCATION = 'ENV_REACT_APP_HLR_SERVICE_LOCATION'
        process.env.REACT_APP_EMAIL_SERVICE_LOCATION = 'ENV_REACT_APP_EMAIL_SERVICE_LOCATION'
        process.env.REACT_APP_OFFERS_HISTORY_SERVICE_LOCATION = 'ENV_REACT_APP_OFFERS_HISTORY_SERVICE_LOCATION'
        process.env.REACT_APP_FINANCE_SERVICE_LOCATION = 'ENV_REACT_APP_FINANCE_SERVICE_LOCATION'
        process.env.REACT_APP_CHANGE_SIM_SERVICE_LOCATION = 'ENV_REACT_APP_CHANGE_SIM_SERVICE_LOCATION'
        process.env.REACT_APP_FILE_STORAGE_SERVICE_LOCATION = 'ENV_REACT_APP_FILE_STORAGE_SERVICE_LOCATION'
        process.env.REACT_APP_SUBSCRIBER_GROUPS_SERVICE_LOCATION = 'ENV_REACT_APP_SUBSCRIBER_GROUPS_SERVICE_LOCATION'
        process.env.REACT_APP_LIKE_SERVICE_LOCATION = 'ENV_REACT_APP_LIKE_SERVICE_LOCATION'
        process.env.REACT_APP_FEEDBACK_SERVICE_LOCATION = 'ENV_REACT_APP_FEEDBACK_SERVICE_LOCATION'
        process.env.REACT_APP_MARKERS_SERVICE_LOCATION = 'ENV_REACT_APP_MARKERS_SERVICE_LOCATION'
        process.env.REACT_APP_MTP_SERVICE_LOCATION = 'ENV_REACT_APP_MTP_SERVICE_LOCATION'
        process.env.REACT_APP_BILLING_NOTIFICATIONS_SERVICE_LOCATION = 'ENV_REACT_APP_BILLING_NOTIFICATIONS_SERVICE_LOCATION'
        process.env.REACT_APP_DIAGNOSTICS_SERVICE_LOCATION = 'ENV_REACT_APP_DIAGNOSTICS_SERVICE_LOCATION'
        process.env.REACT_APP_SMART_SEARCH_SERVICE_LOCATION = 'ENV_REACT_APP_SMART_SEARCH_SERVICE_LOCATION'
        process.env.REACT_APP_DIAGNOSTIC_MANAGER_SERVICE_LOCATION = 'ENV_REACT_APP_DIAGNOSTIC_MANAGER_SERVICE_LOCATION'
        process.env.REACT_APP_RESTRICTION_MANAGMENT_SERVICE_LOCATION = 'ENV_REACT_APP_RESTRICTION_MANAGMENT_SERVICE_LOCATION'
        process.env.REACT_APP_GAME_INTERACTIONS_SERVICE_LOCATION = 'ENV_REACT_APP_GAME_INTERACTIONS_SERVICE_LOCATION'
        process.env.REACT_APP_COMPENSATIONS_SERVICE_LOCATION = 'ENV_REACT_APP_COMPENSATIONS_SERVICE_LOCATION'
        process.env.REACT_APP_QUESTIONARY_SERVICE_LOCATION = 'ENV_REACT_APP_QUESTIONARY_SERVICE_LOCATION'
        process.env.REACT_APP_CONFIG_SERVICE_LOCATION = 'ENV_REACT_APP_CONFIG_SERVICE_LOCATION'
        process.env.REACT_APP_RC_SEARCH_SERVICE_LOCATION = 'ENV_REACT_APP_RC_SEARCH_SERVICE_LOCATION'
        process.env.REACT_APP_LOG_SERVICE_LOCATION = 'ENV_REACT_APP_LOG_SERVICE_LOCATION'
        process.env.REACT_APP_NLP_SERVICE_LOCATION = 'ENV_REACT_APP_NLP_SERVICE_LOCATION'
        process.env.REACT_APP_CONVERSATIONS_SERVICE_LOCATION = 'ENV_REACT_APP_CONVERSATIONS_SERVICE_LOCATION'
        process.env.REACT_APP_MESSAGES_SERVICE_LOCATION = 'ENV_REACT_APP_MESSAGES_SERVICE_LOCATION'
        process.env.REACT_APP_IDENTIFICATIONS_SERVICE_LOCATION = 'ENV_REACT_APP_IDENTIFICATIONS_SERVICE_LOCATION'
        process.env.REACT_APP_MESSAGE_TEMPLATES_SERVICE_LOCATION = 'ENV_REACT_APP_MESSAGE_TEMPLATES_SERVICE_LOCATION'
        process.env.REACT_APP_HANDLINGS_SERVICE_LOCATION = 'ENV_REACT_APP_HANDLINGS_SERVICE_LOCATION'
        process.env.REACT_APP_INTERACTION_SERVICE_LOCATION = 'ENV_REACT_APP_INTERACTION_SERVICE_LOCATION'
        process.env.REACT_APP_REASON_CATEGORY_MATRIX_SERVICE_LOCATION = 'ENV_REACT_APP_REASON_CATEGORY_MATRIX_SERVICE_LOCATION'
        process.env.REACT_APP_MARGIN_SERVICE_LOCATION = 'ENV_REACT_APP_MARGIN_SERVICE_LOCATION'
        process.env.REACT_APP_PROMO_SERVICE_LOCATION = 'ENV_REACT_APP_PROMO_SERVICE_LOCATION'
        process.env.REACT_APP_ADJUSTMENT_SERVICE_LOCATION = 'ENV_REACT_APP_ADJUSTMENT_SERVICE_LOCATION'
        process.env.REACT_APP_ADDRESS_INFO_SERVICE_LOCATION = 'ENV_REACT_APP_ADDRESS_INFO_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_ORDER_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_ORDER_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_EQUIPMENT_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_EQUIPMENT_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_ADDRESS_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_ADDRESS_SERVICE_LOCATION'
        process.env.REACT_APP_PROTOCOL_SERVICE_LOCATION = 'ENV_REACT_APP_PROTOCOL_SERVICE_LOCATION'
        process.env.REACT_APP_MNP_ORDER_SERVICE_LOCATION = 'ENV_REACT_APP_MNP_ORDER_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_TIMESLOTS_SERVICE_LOCATION = 'ENV_REACT_APP_BROADBAND_TIMESLOTS_SERVICE_LOCATION'
        process.env.REACT_APP_PERSONAL_DATA_SERVICE_LOCATION = 'ENV_REACT_APP_PERSONAL_DATA_SERVICE_LOCATION'
        process.env.REACT_APP_MNP_VERIFY_SERVICE_LOCATION = 'ENV_REACT_APP_MNP_VERIFY_SERVICE_LOCATION'
        process.env.REACT_APP_CLICK_SERVICE_LOCATION = 'ENV_REACT_APP_CLICK_SERVICE_LOCATION'
        process.env.REACT_APP_BROADBAND_BE = 'ENV_REACT_APP_BROADBAND_BE'

        // WebSeller services
        process.env.REACT_APP_CONTRACT_SERVICE_HTTP_APPSELLER = 'ENV_REACT_APP_CONTRACT_SERVICE_HTTP_APPSELLER'

        // WebSeller settings
        process.env.REACT_APP_WAITING_TIME_MONITORING_WS = 'ENV_REACT_APP_WAITING_TIME_MONITORING_WS'
        process.env.REACT_APP_FREQUENCY_TIMING_MONITORING_WS = 'ENV_REACT_APP_FREQUENCY_TIMING_MONITORING_WS'

        break
      default:
        console.error('Unexpected argument!')
        process.exit(1)
    }
  }
}
