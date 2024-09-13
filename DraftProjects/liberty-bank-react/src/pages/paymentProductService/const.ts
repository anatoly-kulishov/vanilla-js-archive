const productPath = '/payments/products';
const communicationPath = `${productPath}/communication`;
const bankingPath = `${productPath}/banking`;
const communalPath = `${productPath}/communal`;
const otherPath = `${productPath}/other`;

const MOCK_MOBILE_OPERATORS = [
  { title: 'Билайн', path: `${communicationPath}/mobile/Beeline` },
  { title: 'Мегафон', path: `${communicationPath}/mobile/Megaphone` },
  { title: 'МТС', path: `${communicationPath}/mobile/Mts` },
  { title: 'Теле 2', path: `${communicationPath}/mobile/Tele2` },
  { title: 'Тинькофф Мобайл', path: `${communicationPath}/mobile/TinkoffMobile` },
];
const MOCK_INTERNET_OPERATORS = [
  { title: 'Билайн', path: `${communicationPath}/internet/Beeline` },
  { title: 'Мегафон', path: `${communicationPath}/internet/Megaphone` },
  { title: 'МТС', path: `${communicationPath}/internet/Mts` },
  { title: 'МТС Home', path: `${communicationPath}/internet/MtsHome` },
  { title: 'Ростелеком', path: `${communicationPath}/internet/Rostelecom` },
  { title: 'ТТК', path: `${communicationPath}/internet/Ttk` },
  { title: 'Yota', path: `${communicationPath}/internet/Yota` },
];
const MOCK_LOAN_REPAYMENT_OPERATORS = [
  { title: 'Альфа-банк', path: `${bankingPath}/loanRepayment/Alfa` },
  { title: 'ВТБ', path: `${bankingPath}/loanRepayment/VTB` },
  { title: 'Газпромбанк', path: `${bankingPath}/loanRepayment/Gazprom` },
  { title: 'Открытие', path: `${bankingPath}/loanRepayment/Open` },
  { title: 'Россельхозбанк', path: `${bankingPath}/internet/Rosselkhoz` },
  { title: 'Сбербанк', path: `${bankingPath}/loanRepayment/Sber` },
  { title: 'Тинькофф', path: `${bankingPath}/loanRepayment/Tinkoff` },
  { title: 'Трастон', path: `${bankingPath}/loanRepayment/Traston` },
  { title: 'Liberty Bank', path: `${bankingPath}/loanRepayment/Liberty` },
  { title: 'Power Bank', path: `${bankingPath}/loanRepayment/Power` },
  { title: 'Easy', path: `${bankingPath}/loanRepayment/Easy` },
];
const MOCK_INSURANCE_OPERATORS = [
  { title: 'Альфа-банк Страхование', path: `${bankingPath}/insurance/Alfa` },
  { title: 'ВТБ', path: `${bankingPath}/insurance/VTB` },
  { title: 'Ренессанс Страхование', path: `${bankingPath}/insurance/Renessans` },
  { title: 'Росгосстрах', path: `${bankingPath}/insurance/Rosgosstrah` },
  { title: 'Сбербанк', path: `${bankingPath}/insurance/Sber` },
  { title: 'Согласие', path: `${bankingPath}/insurance/Soglasovanie` },
  { title: 'Liberty Bank', path: `${bankingPath}/insurance/Liberty` },
];
const MOCK_RENT_OPERATORS = [
  { title: 'ЖКУ Москва ЕИРЦ', path: `${communalPath}/rent/EIRC` },
  { title: 'ЕИРКЦ', path: `${communalPath}/rent/EIRCRB` },
  { title: 'ЕИРЦ РБ', path: `${communalPath}/rent/EIRCSPb-EIRCPES/VTsKP` },
  { title: 'ЕИРЦ СПб - ЕИРЦ ПЭС/ВЦКП', path: `${communalPath}/rent/EIRCSPb-EIRCPES/VTsKP` },
  { title: 'МосОблЕИРЦ', path: `${communalPath}/rent/MosObleIRC` },
  { title: 'РИВЦ Симплекс', path: `${communalPath}/rent/RIVCSimplex` },
  { title: 'СГРЦ', path: `${communalPath}/rent/SGRC` },
];
const MOCK_WATER_SUPPLY_OPERATORS = [
  { title: 'Водоканал-Мытищи', path: `${communalPath}/waterSupply/Mytishchi` },
  { title: 'ВТКХ', path: `${communalPath}/waterSupply/VTKH` },
  { title: 'ООО КП', path: `${communalPath}/waterSupply/KP` },
  { title: 'Мосводоканал', path: `${communalPath}/waterSupply/Mosvodokanal` },
  { title: 'МОЭК', path: `${communalPath}/waterSupply/MOEK` },
  { title: 'Тепло Коломны', path: `${communalPath}/waterSupply/Kolomna` },
  { title: 'Чайка', path: `${communalPath}/waterSupply/Gull` },
];

const MOCK_GAS_OPERATORS = [
  { title: 'Газпром межрегион Москва', path: `${communalPath}/gas/Gazprom-Moscow` },
  { title: 'Газпром сеть АГЗС', path: `${communalPath}/gas/Gazprom-AGZS` },
  { title: 'Мособлгаз', path: `${communalPath}/gas/Mosoblgaz` },
  { title: 'МРИВЦ', path: `${communalPath}/gas/MRIVTS` },
  { title: 'НАО РКЦ', path: `${communalPath}/gas/NAO-RCC` },
  { title: 'РРКЦ - АБ Россия', path: `${communalPath}/gas/RRKTs-AB-Russia` },
  { title: 'СВГК', path: `${communalPath}/gas/SVGK` },
];

const MOCK_ELECTRICITY_OPERATORS = [
  { title: 'БЭЛС', path: `${communalPath}/electricity/BELS` },
  { title: 'ЕИРЦ СПб - ЕИРЦ ПЭС/ВЦКП', path: `${communalPath}/electricity/EIRCSPb-EIRCPES-VTsKP` },
  { title: 'Мосэнергосбыт', path: `${communalPath}/electricity/Mosenergosbyt` },
  { title: 'РКС-Энерго', path: `${communalPath}/electricity/RKS-Energo` },
  { title: 'РРКЦ - АБ Россия', path: `${communalPath}/electricity/RRKTs-ABRussia` },
  { title: 'Электросеть г Мытищи', path: `${communalPath}/electricity/Mytishchi` },
  { title: 'Юнисервис', path: `${communalPath}/electricity/Uniservice` },
];
const MOCK_LOTTERIES_OPERATORS = [
  { title: 'Мегалото', path: `${otherPath}/lottery/Megaloto` },
  { title: 'Альфабет', path: `${otherPath}/lottery/Alphabet` },
  { title: 'Суперлото', path: `${otherPath}/lottery/Superlotto` },
  { title: 'То!Лото', path: `${otherPath}/lottery/ToLoto` },
];
const MOCK_CHARITY_OPERATORS = [
  { title: 'Центр Матуля', path: `${otherPath}/charity/MatulyaCenter` },
  { title: 'Зоошанс', path: `${otherPath}/charity/Zooshans` },
  { title: 'Фонд Планета без границ', path: `${otherPath}/charity/PlanetWithoutBorders` },
  { title: 'Белорусский красный крест', path: `${otherPath}/charity/BelarusianRedCross` },
];
const MOCK_HEALTH_OPERATORS = [
  { title: 'Багена Мед', path: `${otherPath}/health/BagenaHoney` },
  { title: 'Виталимед', path: `${otherPath}/health/Vitalimed` },
  { title: 'Добрый взгляд', path: `${otherPath}/health/kindlook` },
  { title: 'ДомДок', path: `${otherPath}/health/DomDoc` },
  { title: 'Исцеление', path: `${otherPath}/health/Healing` },
  { title: 'ЛОДЭ', path: `${otherPath}/health/LODE` },
];
const MOCK_TAXES_OPERATORS = [
  { title: 'ИМНС по Октябрьскому р-ну', path: `${otherPath}/taxes/Oktyabrsky` },
  { title: 'ИМНС по Ленинскому р-ну', path: `${otherPath}/taxes/Leninsky` },
  { title: 'ИМНС по Московскому р-ну', path: `${otherPath}/taxes/Moscow` },
  { title: 'ИМНС по Западному р-ну', path: `${otherPath}/taxes/Western` },
  { title: 'ИМНС по Заводскому р-ну', path: `${otherPath}/taxes/Zavodsky` },
];
const MOCK_EDUCATION_OPERATORS = [
  { title: 'Высшее образование', path: `${otherPath}/education/Higher-education` },
  {
    title: 'Гимназии, лицеи, кадетские училища',
    path: `${otherPath}/education/Gymnasiums-lyceums`,
  },
  { title: 'Детские сады, ясли', path: `${otherPath}/education/Kindergartens` },
  {
    title: 'СуперСреднеспециальное образование, ПТОлото',
    path: `${otherPath}/education/Secondary-specialized-education`,
  },
];

const MOCK_TRANSPORT_OPERATORS = [
  { title: 'Автопрокат', path: `${otherPath}/transport/CarRental` },
  { title: 'Курьерские услуги ', path: `${otherPath}/transport/Courier` },
  { title: 'Платные дороги', path: `${otherPath}/transport/TollRoads` },
];

const MOCK_TOURISM_OPERATORS = [
  { title: 'ANEX Tour', path: `${otherPath}/tourism/ANEX` },
  { title: 'TEZ TOUR', path: `${otherPath}/tourism/TEZ` },
  { title: 'Ростинг', path: `${otherPath}/tourism/Rosting` },
  { title: 'ТрейдВояж', path: `${otherPath}/tourism/TradeVoyage` },
];
const MOCK_FINES_OPERATORS = [
  { title: 'ГИБДД', path: `${otherPath}/fines/GIBDD` },
  { title: 'Прочие штрафы', path: `${otherPath}/fines/OutherFines` },
];

interface INavLink {
  title: string;
  path: string;
}

interface IMOCK_PRODUCTS {
  [key: string]: ISUB_LINKS;
}

interface ISUB_LINKS {
  [key: string]: INavLink[];
}

export const MOCK_PRODUCTS: IMOCK_PRODUCTS = {
  communication: {
    mobile: MOCK_MOBILE_OPERATORS,
    internet: MOCK_INTERNET_OPERATORS,
  },
  banking: {
    loanRepayment: MOCK_LOAN_REPAYMENT_OPERATORS,
    insurance: MOCK_INSURANCE_OPERATORS,
  },
  communal: {
    rent: MOCK_RENT_OPERATORS,
    waterSupply: MOCK_WATER_SUPPLY_OPERATORS,
    gas: MOCK_GAS_OPERATORS,
    electricity: MOCK_ELECTRICITY_OPERATORS,
  },
  other: {
    lottery: MOCK_LOTTERIES_OPERATORS,
    charity: MOCK_CHARITY_OPERATORS,
    health: MOCK_HEALTH_OPERATORS,
    taxes: MOCK_TAXES_OPERATORS,
    education: MOCK_EDUCATION_OPERATORS,
    transport: MOCK_TRANSPORT_OPERATORS,
    tourism: MOCK_TOURISM_OPERATORS,
    fines: MOCK_FINES_OPERATORS,
  },
};
