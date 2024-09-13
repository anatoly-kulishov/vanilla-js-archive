import type { CSSProperties, FC } from 'react';
import type { IImageProps, TImages } from './model/types.ts';
import SVG400 from './assets/images/400.svg';
import SVG401 from './assets/images/401.svg';
import SVG403 from './assets/images/403.svg';
import SVG404 from './assets/images/404.svg';
import SVG405 from './assets/images/405.svg';
import SVG408 from './assets/images/408.svg';
import SVG429 from './assets/images/429.svg';
import SVG500 from './assets/images/500.svg';
import SVG503 from './assets/images/503.svg';
import AllProductCreditBillSVG from './assets/images/all-product-credit-bill.svg';
import AllProductCurrentBillSVG from './assets/images/all-product-current-bill.svg';
import AllProductDepositBillSVG from './assets/images/all-product-deposit-bill.svg';
import AppStoreSVG from './assets/images/appStore.svg';
import BrokerImageSVG from './assets/images/brokerImage.svg';
import CardChildSVG from './assets/images/card-child.svg';
import CardClassicSVG from './assets/images/card-classic.svg';
import CardGoldSVG from './assets/images/card-gold.svg';
import CardPlatinumSVG from './assets/images/card-platinum.svg';
import CardSecureSVG from './assets/images/card-secure.svg';
import CardTravelSVG from './assets/images/card-travel.svg';
import CardVirtualSVG from './assets/images/card-virtual.svg';
import CharacterWithPlantSVG from './assets/images/character-with-plant.svg';
import CharacterSVG from './assets/images/character.svg';
import CloseBillSVG from './assets/images/close-bill.svg';
import ComissionPNG from './assets/images/comission.png';
import CreditBillSVG from './assets/images/credit-bill.svg';
import CurrentBillSVG from './assets/images/current-bill.svg';
import DepositBillSVG from './assets/images/deposit-bill.svg';
import DontOpenBillSVG from './assets/images/dont-open-bill.svg';
import FailedOpenBillRedSVG from './assets/images/faild-open-bill-red.svg';
import FailedOpenBillSVG from './assets/images/faild-open-bill.svg';
import FrameForShotInfoDepositSVG from './assets/images/frame-for-shot-info-deposit.svg';
import FrameSVG from './assets/images/frame.svg';
import GooglePlaySVG from './assets/images/googlePlay.svg';
import HeapOfCoinsSVG from './assets/images/heap-of-coins.svg';
import InDevelopmentSVG from './assets/images/in-development.svg';
import LadyWithPaperSVG from './assets/images/lady-with-paper.svg';
import QuestionLadySVG from './assets/images/question-lady.svg';
import ServiceUnavailableSVG from './assets/images/service-unavailable.svg';
import SuccessfullyClosedBillSVG from './assets/images/successfully-closed-bill.svg';
import WeOpenBillSVG from './assets/images/we-open-bill.svg';
import LadyWithMoneyBoxSVG from './assets/images/lady-with-money-box.svg';
import HealthPNG from './assets/images/health.png';
import ApartmentPNG from './assets/images/apartment.png';
import HousePNG from './assets/images/house.png';
import CarPartsPNG from './assets/images/car-parts.png';
import ApartmentFullPNG from './assets/images/apartment-full.png';
import HouseFullPNG from './assets/images/house-full.png';
import CondoPNG from './assets/images/condo.png';
import CroppedPlanetPNG from './assets/images/cropped-planet.png';
import EarthPNG from './assets/images/earth.png';
import HeartPNG from './assets/images/heart.png';
import HeartDMSPNG from './assets/images/heart-dms.png';
import ImagePNG from './assets/images/image.png';
import MercedesBenzPNG from './assets/images/mercedes-benz.png';
import MercedesBenzMClassPNG from './assets/images/mercedes-benz-m-class.png';
import PenPuttingBlueTicksPaperPNG from './assets/images/pen-putting-blue-ticks-paper.png';
import ProductPNG from './assets/images/product.png';
import RoadConePNG from './assets/images/road-cone.png';
import SendApplicationFailPNG from './assets/images/send-application-fail.png';
import SendApplicationSuccessPNG from './assets/images/send-application-success.png';
import WasherPNG from './assets/images/washer.png';
import WasherFullPNG from './assets/images/washer-full.png';
import WhiteCarPNG from './assets/images/white-car.png';
import WhiteAudiPNG from './assets/images/white-audi.png';
import AnalyticsItemBoxPNG from './assets/images/analyticsItemBox.png';
import AnalyticsItemCartPNG from './assets/images/analyticsItemCart.png';
import AnalyticsItemAbbottPNG from './assets/images/analyticsItemAbbott.png';
import SingleNewsImgPNG from './assets/images/singleNewsImg.png';
import AnalyticsItemClockPNG from './assets/images/analyticsItemClock.png';
import LogoSVG from './assets/images/logo.svg';
import InfoSuccessCardLimitSVG from './assets/images/info-success-card-limit.svg';
import Card1SVG from './assets/images/card1.svg';
import Card4SVG from './assets/images/card4.svg';
import Card2SVG from './assets/images/card2.svg';
import Card3SVG from './assets/images/card3.svg';
import MapCircleSVG from './assets/images/mapCircle.svg';
import LocationSVG from './assets/images/location.svg';
import News1PNG from './assets/images/news1.png';
import News2PNG from './assets/images/news2.png';
import News3PNG from './assets/images/news3.png';
import dskyPng from './assets/images/dsky.png';
import mvidPng from './assets/images/mvid.png';
import ozonPng from './assets/images/ozon.png';
import yndxPng from './assets/images/yndx.png';
import gazpPng from './assets/images/gazp.png';
import chmfPng from './assets/images/chmf.png';
import gmknPng from './assets/images/gmkn.png';
import lkohPng from './assets/images/lkoh.png';
import nvtkPng from './assets/images/nvtk.png';
import plzlPng from './assets/images/plzl.png';
import rosnPng from './assets/images/rosn.png';
import sberPng from './assets/images/sber.png';
import sibnPng from './assets/images/sibn.png';
import tatnPng from './assets/images/tatn.png';
import cnyPng from './assets/images/cny.png';
import usdPng from './assets/images/usd.png';
import eurPng from './assets/images/eur.png';
import EducationMainPNG from './assets/images/education-main.png';
import EducationLessonPNG from './assets/images/education-lesson.png';
import Education1SVG from './assets/images/education1.svg';
import Education2SVG from './assets/images/education2.svg';
import Education3SVG from './assets/images/education3.svg';
import Education4SVG from './assets/images/education4.svg';
import Education5SVG from './assets/images/education5.svg';
import Education6SVG from './assets/images/education6.svg';
import ChoiceIsYesNo from './assets/images/choice-is-yes-no.svg';
import CurrentBillMirroredSVG from './assets/images/current-bill-mirrored.svg';

export const SVGImages: TImages = {
  '400': SVG400,
  '401': SVG401,
  '403': SVG403,
  '404': SVG404,
  '405': SVG405,
  '408': SVG408,
  '429': SVG429,
  '500': SVG500,
  '503': SVG503,
  'all-product-credit-bill': AllProductCreditBillSVG,
  'all-product-current-bill': AllProductCurrentBillSVG,
  'all-product-deposit-bill': AllProductDepositBillSVG,
  appStore: AppStoreSVG,
  brokerImage: BrokerImageSVG,
  card1: Card1SVG,
  card2: Card2SVG,
  card3: Card3SVG,
  card4: Card4SVG,
  'card-child': CardChildSVG,
  'card-classic': CardClassicSVG,
  'card-gold': CardGoldSVG,
  'card-platinum': CardPlatinumSVG,
  'card-secure': CardSecureSVG,
  'card-travel': CardTravelSVG,
  'card-virtual': CardVirtualSVG,
  'character-with-plant': CharacterWithPlantSVG,
  character: CharacterSVG,
  'close-bill': CloseBillSVG,
  'credit-bill': CreditBillSVG,
  'current-bill': CurrentBillSVG,
  'deposit-bill': DepositBillSVG,
  'dont-open-bill': DontOpenBillSVG,
  'failed-open-bill-red': FailedOpenBillRedSVG,
  'info-success-card-limit': InfoSuccessCardLimitSVG,
  'failed-open-bill': FailedOpenBillSVG,
  'frame-for-shot-info-deposit': FrameForShotInfoDepositSVG,
  location: LocationSVG,
  logo: LogoSVG,
  frame: FrameSVG,
  mapCircle: MapCircleSVG,
  googlePlay: GooglePlaySVG,
  'heap-of-coins': HeapOfCoinsSVG,
  'in-development': InDevelopmentSVG,
  'lady-with-paper': LadyWithPaperSVG,
  'lady-with-money-box': LadyWithMoneyBoxSVG,
  'question-lady': QuestionLadySVG,
  'service-unavailable': ServiceUnavailableSVG,
  'successfully-closed-bill': SuccessfullyClosedBillSVG,
  'we-open-bill': WeOpenBillSVG,
  education1: Education1SVG,
  education2: Education2SVG,
  education3: Education3SVG,
  education4: Education4SVG,
  education5: Education5SVG,
  education6: Education6SVG,
  choiceIsYesNo: ChoiceIsYesNo,
  'current-bill-mirrored': CurrentBillMirroredSVG,

  // PNG
  apartment: ApartmentPNG,
  'apartment-full': ApartmentFullPNG,
  'analytics-item-box': AnalyticsItemBoxPNG,
  'analytics-item-cart': AnalyticsItemCartPNG,
  'analytics-item-clock': AnalyticsItemClockPNG,
  'analytics-item-abbott': AnalyticsItemAbbottPNG,
  'car-parts': CarPartsPNG,
  condo: CondoPNG,
  'cropped-planet': CroppedPlanetPNG,
  earth: EarthPNG,
  health: HealthPNG,
  heart: HeartPNG,
  'heart-dms': HeartDMSPNG,
  house: HousePNG,
  'house-full': HouseFullPNG,
  image: ImagePNG,
  news1: News1PNG,
  news2: News2PNG,
  news3: News3PNG,
  'mercedes-benz': MercedesBenzPNG,
  'mercedes-benz-m-class': MercedesBenzMClassPNG,
  'pen-putting-blue-ticks-paper': PenPuttingBlueTicksPaperPNG,
  product: ProductPNG,
  'road-cone': RoadConePNG,
  'send-application-fail': SendApplicationFailPNG,
  'send-application-success': SendApplicationSuccessPNG,
  'single-news-img': SingleNewsImgPNG,
  washer: WasherPNG,
  'washer-full': WasherFullPNG,
  'white-audi': WhiteAudiPNG,
  'white-car': WhiteCarPNG,
  YNDX: yndxPng,
  OZON: ozonPng,
  MVID: mvidPng,
  DSKY: dskyPng,
  GAZP: gazpPng,
  CHMF: chmfPng,
  GMKN: gmknPng,
  LKOH: lkohPng,
  NVTK: nvtkPng,
  PLZL: plzlPng,
  ROSN: rosnPng,
  SBER: sberPng,
  SIBN: sibnPng,
  TATN: tatnPng,
  cny: cnyPng,
  usd: usdPng,
  eur: eurPng,
  comission: ComissionPNG,
  'education-main': EducationMainPNG,
  'education-lesson': EducationLessonPNG,
};

export const Image: FC<IImageProps> = (props) => {
  const { image, height, width, widthAndHeight, ...rest } = props;

  const getSize = (): CSSProperties => {
    const size: CSSProperties = {};
    if (height) size.height = height;
    if (width) size.width = width;
    return size;
  };

  const sizeStyle = widthAndHeight ? { width: widthAndHeight, height: widthAndHeight } : getSize();

  return (
    <img
      src={SVGImages[image]}
      alt={rest?.alt || image}
      data-testid={`image-${image}`}
      style={{ ...sizeStyle }}
      {...rest}
    />
  );
};
