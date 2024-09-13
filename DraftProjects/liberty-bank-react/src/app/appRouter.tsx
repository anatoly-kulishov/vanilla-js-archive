import { ReactElement, Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom';

import LKTopUpBalancesSuccessPage from '@/pages/investmentLKbriefcase/investmentLKbriefcaseTopUpBalance/investmentLKTopUpBalanceSuccessPage/LKTopUpBalancesSuccessPage';
import InvestmentTestingPage from '@/pages/investmentLKbriefcase/investmentTestingPage/InvestmentTestingPage';
import SelectedPaymentsPage from '@/pages/paymentsProducts/SelectedPaymentsPage/SelectedPaymentsPage';
import {
  PATH_PAGE,
  Preloader,
  checkTokenExpire,
  getAccessToken,
  getRefreshToken,
  removeTokensFromStorage,
  setAuthToken,
  setTokensIntoStorage,
  useUpdateTokenMutation,
} from '@/shared';
// import { PaymentsPage } from '@/pages/paymentsPage/PaymentsPage';
import { useDispatch } from 'react-redux';

const InsuranceEditPolicies = lazy(
  () => import('@/pages/insuranceEditPolicies/InsuranceEditPolicies'),
);
const PaymentProductService = lazy(
  () => import('@/pages/paymentProductService/ui/PaymentProductService'),
);
const PaymentsProductDetails = lazy(
  () => import('@/pages/paymentsProductDetails/ui/PaymentsProductDetails'),
);

const PersonalAccountChangeEmail = lazy(
  () => import('@/pages/personalAccountChangeEmail/PersonalAccountChangeEmail'),
);
const PersonalAccount = lazy(() => import('@/pages/personalAccount/PersonalAccount'));
const PersonalAccountLegalInfo = lazy(
  () => import('@/pages/personalAccountLegalInfo/PersonalAccountLegalInfo'),
);
const PersonalDate = lazy(() => import('@/pages/personalDate/PersonalDate'));
const PersonalAccountNotification = lazy(
  () => import('@/pages/personalAccountNotification/PersonalAccountNotification'),
);

const MainLayout = lazy(() => import('./layouts/mainLayout/MainLayout'));
const MainBodyLayout = lazy(() => import('./layouts/mainBodyLayout/MainBodyLayout'));
const LoginPage = lazy(() => import('@/pages/login/LoginPage'));
const RegistrationPage = lazy(() => import('@/pages/registration/RegistrationPage'));
const ResetPage = lazy(() => import('@/pages/reset/ResetPage'));
const Rate = lazy(() => import('@/pages/rate/Rate'));
const MapPage = lazy(() => import('@/pages/map/MapPage'));
const UserAccountsPage = lazy(() => import('@/pages/userAccountsPage/UserAccountsPage'));
const MyBillPage = lazy(() => import('@/pages/myBill/MyBillPage'));
const MyCardPage = lazy(() => import('@/pages/myCardInfo/MyCardPage'));
const AccountStatement = lazy(() => import('@/pages/accountStatement/AccountStatement'));
const ChangeAccountStatus = lazy(
  () => import('@/pages/myBill/changeAccountStatus/ui/ChangeAccountStatus'),
);
const ChangeAccountName = lazy(
  () => import('@/pages/myBill/changeAccountName/ui/ChangeAccountName'),
);
const CloseBill = lazy(() => import('@/pages/myBill/closeBill/ui/CloseBill'));
const MainBill = lazy(() => import('@/pages/myBill/mainBill/ui/MainBill'));
const RequisitesPage = lazy(() => import('@/pages/requisites/RequisitesPage'));
const CertificateOfAvailableBalance = lazy(
  () => import('@/pages/сertificateOfAvailableBalance/CertificateOfAvailableBalance'),
);
const CreditsPage = lazy(() => import('@/pages/credits/CreditsPage'));
const UserCreditsPage = lazy(() => import('@/pages/userCredits/UserCreditsPage'));
const CreditProductsPage = lazy(() => import('@/pages/creditProducts/CreditProductsPage'));
const CreditInformationPage = lazy(() => import('@/pages/creditInformation/CreditInformationPage'));
const MyCreditCardPage = lazy(() => import('@/pages/myCreditCardPage/MyCreditCardPage'));
const CreditCardChangeLimits = lazy(
  () => import('@/pages/creditCardChangeLimits/CreditCardChangeLimits'),
);
const CreditCardInformation = lazy(
  () => import('@/pages/creditCardInformation/CreditCardInformationPage'),
);
const CreditCalculatePage = lazy(() => import('@/pages/creditCalculate/CreditCalculatePage'));
const CreditFormPage = lazy(() => import('@/pages/creditForm/CreditFormPage'));
const CreditCardFormPage = lazy(() => import('@/pages/creditCardForm/CreditCardFormPage'));
const CreditRequestsPage = lazy(() => import('@/pages/creditRequests/CreditRequestsPage'));
const CreditHistoryPage = lazy(() => import('@/pages/creditHistory/CreditHistoryPage'));
const DepositsPage = lazy(() => import('@/pages/deposits/DepositsPage'));
const DepositProductsPage = lazy(() => import('@/pages/depositProducts/DepositProductsPage'));
const DepositHistoryPage = lazy(() => import('@/pages/depositHistory/depositHistoryPage'));
const DepositInfoPage = lazy(() => import('@/pages/depositInfo/DepositInfoPage'));
const UserDepositsPage = lazy(() => import('@/pages/userDeposits/UserDepositsPage'));
const DepositApplicationPage = lazy(
  () => import('@/pages/depositApplication/DepositApplicationPage'),
);
const CreateCurrentAccount = lazy(
  () => import('@/pages/createCurrentAccount/CreateCurrentAccount'),
);
const InsurancePage = lazy(() => import('@/pages/insurance/InsurancePage'));
const MyInsurancePoliciesPage = lazy(
  () => import('@/pages/myInsurancePolicies/MyInsurancePoliciesPage'),
);
const InsuranceProductsPage = lazy(() => import('@/pages/insuranceProducts/InsuranceProductsPage'));
const InsuranceOrdersPage = lazy(() => import('@/pages/insuranceOrders/InsuranceOrdersPage'));
const InsuranceCurrentProduct = lazy(
  () => import('@/pages/insuranceCurrentProduct/InsuranceCurrentProduct'),
);
const ProductPage = lazy(() => import('@/pages/productPage/ProductPage'));
const AbroadTravelInsuranceApplicationPage = lazy(
  () => import('@/pages/abroadTravelInsuranceApplication/ui/abroadTravelInsuranceApplicationPage'),
);
const HomeContentsInsuranceApplication = lazy(
  () => import('@/pages/homeContentsInsuranceApplication/ui/homeContentsInsuranceApplication'),
);
const InsuranceApplicationOffline = lazy(
  () => import('@/pages/insuranceApplicationOffline/InsuranceApplicationOffline'),
);
const HomeInsuranceApplicationOnline = lazy(
  () =>
    import(
      '@/pages/homeInsuranceApplication/ui/homeInsuranceApplicationOnline/homeInsuranceApplicationOnlinePage'
    ),
);
const ApartamentInsuranceApplicationOnline = lazy(
  () =>
    import(
      '@/pages/apartamentInsuranceApplication/ui/apartamentInsuranceApplicationOnline/apartamentInsuranceApplicationOnline'
    ),
);
const PoliciesInfo = lazy(() => import('../pages/policiesInfo/ui/PoliciesInfo'));
const InsuranceClaim = lazy(() => import('../pages/insuranceClaim/InsuranceClaim'));
const CalculateInsuranceProduct = lazy(
  () => import('../pages/calculationInsuranceProduct/calculationInsuranceProduct'),
);
const PaymentsLayoutPage = lazy(() => import('../pages/paymentsLayout/PaymentsLayoutPage'));
const PaymentsProductsPage = lazy(() => import('../pages/paymentsProducts/PaymentsProductsPage'));
const InvestmentPage = lazy(() => import('../pages/investment/ui/InvestmentPage'));
const CheckBrokerAccountStatus = lazy(
  () => import('@/pages/investCheckBrokerAccountStatus/ui/CheckBrokerAccountStatus'),
);
const InvestmentDocuments = lazy(
  () => import('@/pages/investmentDocuments/ui/investmentDocuments'),
);
const InvestmentDocumentsQuestionnaire = lazy(
  () => import('@/pages/investmentDocumentsQuestionnaire/ui/InvestmentDocumentsQuestionnaire'),
);
const InvestmentSms = lazy(() => import('@/pages/investmentSms/ui/InvestmentSms'));
const Error = lazy(() => import('@/pages/Error/ui/Error'));
const InvestmentCheck = lazy(() => import('@/pages/investmentCheck/ui/InvestmentCheck'));
const InvestmentLK = lazy(() => import('@/pages/investmentLK/ui/InvestmentLK'));
const ProtectedLKRoute = lazy(() => import('@/widgets/protectedLKRoute/ui/ProtectedLKRoute'));

const InvestmentLKbriefcase = lazy(
  () => import('@/pages/investmentLKbriefcase/ui/InvestmentLKbriefcase'),
);
const LKbriefcaseTopUpBalance = lazy(
  () =>
    import(
      '@/pages/investmentLKbriefcase/investmentLKbriefcaseTopUpBalance/LKbriefcaseTopUpBalance'
    ),
);
const LKbriefcaseWithDrawMoney = lazy(
  () =>
    import(
      '@/pages/investmentLKbriefcase/investmentLKbriefcaseWithdrawMoney/LKbriefcaseWithdrawMoney'
    ),
);
const LKbriefcaseOperationsHistory = lazy(
  () =>
    import(
      '@/pages/investmentLKbriefcase/investmentLKbriefcaseOperationsHistory/LKbriefcaseOperationsHistory'
    ),
);
const LKbriefcaseMain = lazy(
  () => import('@/pages/investmentLKbriefcase/investmentLKbriefcaseMain/LKbriefcaseMain'),
);

const InvestmentLKcatalog = lazy(
  () => import('@/pages/investmentLKcatalog/ui/InvestmentLKcatalog'),
);
const InvestmentLKcatalogMain = lazy(
  () => import('@/pages/investmentLKcatalog/InvestmentLKcatalogMain/InvestmentLKcatalogMain'),
);
const InvestmentLKcatalogAsset = lazy(
  () => import('@/pages/investmentLKcatalog/InvestmentLKcatalogAssets/InvestmentLKcatalogAsset'),
);
const InvestmentLKcatalogPriceNotification = lazy(
  () =>
    import(
      '@/pages/investmentLKcatalog/investentLKcatalogPriceNotification/ui/investmentLKcatalogPriceNotification'
    ),
);
const InvestmentLKanalytics = lazy(
  () => import('@/pages/investmentLKanalytics/ui/InvestmentLKanalytics'),
);
const InvestmentLKanalyticsMain = lazy(
  () => import('@/pages/investmentLKanalytics/InvestmentLKAnalyticsMain/InvestmentLKanalyticsMain'),
);
const InvestmentLKnews = lazy(() => import('@/pages/investmentLKnews/ui/investmentLKnews'));
const InvestmentLKnewsMain = lazy(
  () => import('@/pages/investmentLKnews/investmentLKnewsMain/ui/investmentLKnewsMain'),
);
const InvestmentLKnewsSingleNews = lazy(
  () => import('@/pages/investmentLKnews/investmentLKnewsSingleNews/ui/investmentLKnewsSingleNews'),
);
const InvestmentLKeducation = lazy(
  () => import('@/pages/investmentLKeducation/ui/InvestmentLKeducation'),
);
const InvestmentLKEducationMain = lazy(
  () => import('@/pages/investmentLKeducation/investmentLKEducationMain/investmentLKEducationMain'),
);
const InvestmentLKEducationSingleCourse = lazy(
  () =>
    import(
      '@/pages/investmentLKeducation/investmentLKEducationSingleCourse/investmentLKEducationSingleCourse'
    ),
);
const InvestmentLKEducationOneLesson = lazy(
  () =>
    import('@/pages/investmentLKeducation/investmentLKEducationSingleCourse/oneLesson/oneLesson'),
);
const TestPage = lazy(() => import('@/pages/investmentLKeducation/testPage/testPage'));
const InvestmentLKsettings = lazy(
  () => import('@/pages/investmentLKsettings/ui/InvestmentLKsettings'),
);

const InvestmentAccClosureAssets = lazy(
  () => import('@/pages/investmentAccClosureAssets/ui/InvestmentAccClosureAssets'),
);
const InvestmentAccClosureCurrency = lazy(
  () => import('@/pages/investmentAccClosureCurrency/ui/InvestmentAccClosureCurrency'),
);
const InvestmentAccClosureDeclaration = lazy(
  () => import('@/pages/investmentAccClosureDeclaration/ui/InvestmentAccClosureDeclaration'),
);
const NotFoundPage = lazy(() => import('@/pages/notFoundPage/NotFoundPage'));

const CustomerSecurity = lazy(() => import('@/pages/customerSecurity/CustomerSecurity'));
const CustomerChangePassword = lazy(
  () => import('@/pages/customerChangePassword/CustomerChangePassword'),
);
const RulesRBS = lazy(() => import('@/pages/rulesRBS/RulesRBS'));
const RulesPP = lazy(() => import('@/pages/rulesPP/RulesPP'));
const RulesGDPR = lazy(() => import('@/pages/rulesGDPR/RulesGDPR'));
const ActiveUserCreditProduct = lazy(() => import('@/pages/activeUserCredit/ActiveUserCreditPage'));
const PaymentSchedulePage = lazy(() => import('@/pages/paymentSchedule/PaymentSchedulePage'));
const CustomerServices = lazy(() => import('@/pages/customerServices/CustomerServices'));
const PersonalAccountContactWithTheBank = lazy(
  () => import('@/pages/personalAccountContactWithTheBank/PersonalAccountContactWithTheBank'),
);
const PersonalAccountServices = lazy(
  () => import('@/pages/personalAccountServices/PersonalAccountServices'),
);
const UserDepositInformation = lazy(
  () => import('@/pages/userDepositInformation/UserDepositInformationPage'),
);
const CardsPage = lazy(() => import('@/pages/cards/CardsPage'));
const CardChangeLimitsPage = lazy(() => import('@/pages/cardChangeLimitsPage'));
const MyCardsPage = lazy(() => import('@/pages/myCards/MyCardsPage'));
const CardRequestsPage = lazy(() => import('@/pages/cardRequests/CardRequestsPage'));
const CloseCardPage = lazy(() => import('@/pages/cardClose/CardClosePage'));
const OrderCardPage = lazy(() => import('@/pages/orderCard/OrderCardPage'));
const ReissueCardPage = lazy(() => import('@/pages/reissueCard/ReissueCardPage'));
const OrderCardResultPage = lazy(() => import('@/pages/orderCardResult/OrderCardResultPage'));
const MyCardChangePIN = lazy(() => import('@/pages/myCardChangePIN/MyCardChangePIN'));
const ChangeCreditCardPin = lazy(() => import('@/pages/creditCardChangePIN/CreditCardChangePIN'));
const AboutBank = lazy(() => import('@/pages/aboutBank/AboutBank'));
const Contacts = lazy(() => import('@/pages/contacts/Contacts'));
const Work = lazy(() => import('@/pages/workPage/WorkPage'));
const Help = lazy(() => import('@/pages/help/Help'));
const CardProductsPage = lazy(() => import('@/pages/cardProducts/CardProductsPage'));
const CardProductPage = lazy(() => import('@/pages/cardProduct/CardProductPage'));
const CardTariffsPage = lazy(() => import('@/pages/myCardTariff/MyCardTariffs'));

const BodyUnitMenu = lazy(() => import('@/pages/bodyUnitMenu/BodyUnitMenu'));

const TransfersPage = lazy(() => import('../pages/transfers'));
const TransferPage = lazy(() => import('../pages/transfer'));
const News = lazy(() => import('@/features/news/News'));

type AuthGuardProps = {
  children: ReactElement;
};

const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props;
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(!!getAccessToken());
  const [updateTokens] = useUpdateTokenMutation();

  const handlerUpdateTokens = (refreshToken: string) => {
    updateTokens({ refreshToken: JSON.parse(refreshToken) }).then(
      (res) =>
        ('data' in res && setTokensIntoStorage(res.data)) ||
        ('error' in res && removeTokensFromStorage()),
    );
  };

  const checkToken = () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken && !refreshToken) {
      setIsAuth(false);
      return;
    }

    const isValidAccessToken = !!accessToken && !checkTokenExpire(accessToken);
    const isValidRefreshToken = !!refreshToken && !checkTokenExpire(refreshToken);

    if (!isValidAccessToken)
      if (!isValidRefreshToken) removeTokensFromStorage();
      else handlerUpdateTokens(refreshToken);
    else {
      setIsAuth(true);
      dispatch(setAuthToken(accessToken));
    }
  };

  useEffect(() => {
    const listener = () => checkToken();
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);

  useEffect(checkToken, [children, pathname]);

  return isAuth ? children : <Navigate to={PATH_PAGE.login} />;
};

export const appRouter = () =>
  createBrowserRouter([
    {
      element: (
        <Suspense fallback={<Preloader />}>
          <MainLayout />
        </Suspense>
      ),
      errorElement: <NotFoundPage />,
      children: [
        {
          element: (
            <AuthGuard>
              <MainBodyLayout />
            </AuthGuard>
          ),
          children: [
            {
              path: PATH_PAGE.root,
              element: <BodyUnitMenu />,
            },
            {
              path: PATH_PAGE.protectedTest,
              element: (
                <AuthGuard>
                  <p>ProtectedPage - Страница в разработке</p>
                </AuthGuard>
              ),
            },
            {
              path: PATH_PAGE.myBills,
              element: <UserAccountsPage />,
            },
            {
              path: PATH_PAGE.myBillsById,
              element: <MyBillPage />,
            },
            {
              path: PATH_PAGE.myBillsByIdAccountStatement,
              element: <AccountStatement />,
            },
            {
              path: PATH_PAGE.changeAccountStatus,
              element: <ChangeAccountStatus />,
            },
            {
              path: PATH_PAGE.changeAccountName,
              element: <ChangeAccountName />,
            },
            {
              path: PATH_PAGE.myBillsByIdClosed,
              element: <CloseBill />,
            },
            {
              path: PATH_PAGE.myBillsIsMain,
              element: <MainBill />,
            },
            {
              path: PATH_PAGE.myBillsByIdRequisites,
              element: <RequisitesPage />,
            },
            {
              path: PATH_PAGE.myBillsByIdAvailableBalance,
              element: <CertificateOfAvailableBalance />,
            },

            {
              path: PATH_PAGE.credits,
              element: (
                <Suspense fallback={<Preloader />}>
                  <CreditsPage />
                </Suspense>
              ),
              children: [
                {
                  path: PATH_PAGE.myCredits,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <UserCreditsPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.creditProducts,
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <CreditProductsPage />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.creditInformation,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <CreditInformationPage />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.creditCalculate,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <CreditCalculatePage />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.creditForm,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <CreditFormPage />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.creditCardFormCreditsSection,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <CreditCardFormPage />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: PATH_PAGE.creditRequests,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <CreditRequestsPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.creditHistory,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <CreditHistoryPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.myCreditInfo,
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <ActiveUserCreditProduct />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: PATH_PAGE.myCreditPaymentSchedule,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <PaymentSchedulePage />
                    </Suspense>
                  ),
                },
              ],
            },
            {
              path: PATH_PAGE.deposits,
              element: (
                <Suspense fallback={<Preloader />}>
                  <DepositsPage />
                </Suspense>
              ),
              children: [
                {
                  path: PATH_PAGE.depositProducts,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <DepositProductsPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.depositHistory,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <DepositHistoryPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.depositInformation,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <DepositInfoPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.myDeposits,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <UserDepositsPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.depositApplication,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <DepositApplicationPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.depositUserInformation,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <UserDepositInformation />
                    </Suspense>
                  ),
                },
              ],
            },
            {
              path: PATH_PAGE.createCurrentAccount,
              element: <CreateCurrentAccount />,
            },
            {
              path: PATH_PAGE.insurance,
              element: <InsurancePage />,
              children: [
                {
                  index: true,
                  element: <Navigate to={PATH_PAGE.myInsurancePolicies} replace />,
                },
                {
                  path: PATH_PAGE.myInsurancePolicies,
                  element: <MyInsurancePoliciesPage />,
                },
                {
                  path: PATH_PAGE.insuranceProducts,
                  element: <InsuranceProductsPage />,
                },
                {
                  path: PATH_PAGE.insuranceOrders,
                  element: <InsuranceOrdersPage />,
                },
              ],
            },
            {
              path: PATH_PAGE.insuranceCurrentProduct,
              element: <InsuranceCurrentProduct />,
            },
            {
              path: PATH_PAGE.productPage,
              element: (
                <Suspense fallback={<Preloader />}>
                  <ProductPage />
                </Suspense>
              ),
            },
            {
              path: PATH_PAGE.abroadTravelInsuranceApplication,
              element: <AbroadTravelInsuranceApplicationPage />,
            },
            {
              path: PATH_PAGE.homeContentsInsuranceApplication,
              element: <HomeContentsInsuranceApplication />,
            },
            {
              path: PATH_PAGE.insuranceApplicationOffline,
              element: <InsuranceApplicationOffline />,
            },
            {
              path: PATH_PAGE.homeInsuranceApplicationOnline,
              element: <HomeInsuranceApplicationOnline />,
            },
            {
              path: PATH_PAGE.apartamentInsuranceApplicationOnline,
              element: <ApartamentInsuranceApplicationOnline />,
            },
            {
              path: PATH_PAGE.insurancePolicies,
              element: <PoliciesInfo />,
            },
            {
              path: PATH_PAGE.editPolicies,
              element: <InsuranceEditPolicies />,
            },
            {
              path: PATH_PAGE.insuranceClaim,
              element: <InsuranceClaim />,
            },
            {
              path: PATH_PAGE.calculateInsuranceProduct,
              element: <CalculateInsuranceProduct />,
            },
            {
              path: PATH_PAGE.investment,
              element: (
                <Suspense fallback={<Preloader />}>
                  <CheckBrokerAccountStatus />
                </Suspense>
              ),
            },
            {
              path: PATH_PAGE.investmentDocuments,
              element: (
                <Suspense fallback={<Preloader />}>
                  <InvestmentDocuments />
                </Suspense>
              ),
            },
            {
              path: PATH_PAGE.investmentDocumentsQuestionnaire,
              element: (
                <Suspense fallback={<Preloader />}>
                  <InvestmentDocumentsQuestionnaire />
                </Suspense>
              ),
            },
            {
              path: PATH_PAGE.investmentSms,
              element: (
                <Suspense fallback={<Preloader />}>
                  <InvestmentSms />
                </Suspense>
              ),
            },
            {
              path: PATH_PAGE.error,
              element: <Error />,
            },
            {
              path: PATH_PAGE.investmentCheck,
              element: (
                <Suspense fallback={<Preloader />}>
                  <InvestmentCheck />
                </Suspense>
              ),
            },
            {
              path: PATH_PAGE.investmentLK.start,
              element: (
                <Suspense fallback={<Preloader />}>
                  <InvestmentLK />
                </Suspense>
              ),
              children: [
                {
                  path: PATH_PAGE.investmentLK.startNonRegistered,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <InvestmentPage />
                    </Suspense>
                  ),
                },

                {
                  path: PATH_PAGE.investmentLK.briefcase.start,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <ProtectedLKRoute>
                        <InvestmentLKbriefcase />
                      </ProtectedLKRoute>
                    </Suspense>
                  ),
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <LKbriefcaseMain />
                        </Suspense>
                      ),
                    },

                    {
                      path: PATH_PAGE.investmentLK.briefcase.topupbalance,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <LKbriefcaseTopUpBalance />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.success,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <LKTopUpBalancesSuccessPage />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.testing,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <InvestmentTestingPage />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.briefcase.withdrawmoney,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <LKbriefcaseWithDrawMoney />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.briefcase.operationshistory,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <LKbriefcaseOperationsHistory />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: PATH_PAGE.investmentLK.catalog.start,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <InvestmentLKcatalog />
                    </Suspense>
                  ),
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <InvestmentLKcatalogMain />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.catalog.assets,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <InvestmentLKcatalogAsset />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.catalog.priceNotification,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <InvestmentLKcatalogPriceNotification />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: PATH_PAGE.investmentLK.analytics.start,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <InvestmentLKanalytics />
                    </Suspense>
                  ),
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <InvestmentLKanalyticsMain />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: PATH_PAGE.investmentLK.news.start,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <InvestmentLKnews />
                    </Suspense>
                  ),
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <InvestmentLKnewsMain />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.news.singleNews,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <InvestmentLKnewsSingleNews />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: PATH_PAGE.investmentLK.education.start,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <InvestmentLKeducation />
                    </Suspense>
                  ),
                  children: [
                    {
                      index: true,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <ProtectedLKRoute>
                            <InvestmentLKEducationMain />
                          </ProtectedLKRoute>
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.education.singleCourse,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <InvestmentLKEducationSingleCourse />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.education.singleLesson,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <InvestmentLKEducationOneLesson />
                        </Suspense>
                      ),
                    },
                    {
                      path: PATH_PAGE.investmentLK.education.exam,
                      element: (
                        <Suspense fallback={<Preloader />}>
                          <TestPage />
                        </Suspense>
                      ),
                    },
                  ],
                },
                {
                  path: PATH_PAGE.investmentLK.settings,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <ProtectedLKRoute>
                        <InvestmentLKsettings />
                      </ProtectedLKRoute>
                    </Suspense>
                  ),
                },
              ],
            },
            {
              path: PATH_PAGE.investmentAccClosureAssets,
              element: (
                <Suspense fallback={<Preloader />}>
                  <InvestmentAccClosureAssets />
                </Suspense>
              ),
            },
            {
              path: PATH_PAGE.investmentAccClosureCurrency,
              element: (
                <Suspense fallback={<Preloader />}>
                  <InvestmentAccClosureCurrency />
                </Suspense>
              ),
            },
            {
              path: PATH_PAGE.investmentAccClosureDeclaration,
              element: (
                <Suspense fallback={<Preloader />}>
                  <InvestmentAccClosureDeclaration />
                </Suspense>
              ),
            },
            {
              path: PATH_PAGE.cards,
              element: <CardsPage />,
              children: [
                {
                  index: true,
                  element: <Navigate to={PATH_PAGE.myCards} replace />,
                },
                {
                  path: PATH_PAGE.myCards,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <MyCardsPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.cardProducts,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <CardProductsPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.creditCardProduct,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <CreditCardInformation />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.cardRequests,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <CardRequestsPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.cardProduct,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <CardProductPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.myCreditCardInfo,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <MyCreditCardPage />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.creditCardChangeLimits,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <CreditCardChangeLimits />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.creditCardChangePIN,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <ChangeCreditCardPin />
                    </Suspense>
                  ),
                },
                {
                  path: PATH_PAGE.creditCardFormCardsSection,
                  element: (
                    <Suspense fallback={<Preloader />}>
                      <CreditCardFormPage />
                    </Suspense>
                  ),
                },
              ],
            },
            {
              path: PATH_PAGE.orderCard,
              element: <OrderCardPage />,
            },
            {
              path: PATH_PAGE.orderCardAnswers,
              element: <OrderCardResultPage />,
            },
            {
              path: PATH_PAGE.reissueCard,
              element: <ReissueCardPage />,
            },
            {
              path: PATH_PAGE.changeCardLimits,
              element: <CardChangeLimitsPage />,
            },
            {
              path: PATH_PAGE.myCardChangePIN,
              element: <MyCardChangePIN />,
            },
            {
              path: PATH_PAGE.myCardInfo,
              element: <MyCardPage />,
            },
            {
              path: PATH_PAGE.myCardTariffs,
              element: <CardTariffsPage />,
            },
            {
              path: PATH_PAGE.closeCard,
              element: <CloseCardPage />,
            },
            {
              path: PATH_PAGE.transfers.home,
              element: <TransfersPage />,
            },
            {
              path: PATH_PAGE.transfers.transfer,
              element: <TransferPage />,
            },
            {
              path: PATH_PAGE.payments,
              element: (
                <Suspense fallback={<Preloader />}>
                  <PaymentsLayoutPage />
                </Suspense>
              ),
              children: [
                {
                  index: true,
                  element: <Navigate to={PATH_PAGE.paymentsCommunication} replace />,
                },
                {
                  path: PATH_PAGE.paymentsProducts,
                  element: <PaymentsProductsPage />,
                },
                {
                  path: PATH_PAGE.paymentsProductsService,
                  element: <PaymentProductService />,
                },
                {
                  path: PATH_PAGE.paymentsProductDetails,
                  element: <PaymentsProductDetails />,
                },
              ],
            },
            {
              path: PATH_PAGE.selectedPayments,
              element: <SelectedPaymentsPage />,
            },
            {
              path: PATH_PAGE.bonuses,
              element: <p>Bonuses Page - Страница в разработке</p>,
            },
          ],
        },
        {
          path: PATH_PAGE.aboutBank,
          element: <AboutBank />,
        },
        {
          path: PATH_PAGE.exchangeRates,
          element: <Rate />,
        },
        {
          path: PATH_PAGE.login,
          element: <LoginPage />,
        },

        {
          path: PATH_PAGE.registration,
          element: <RegistrationPage />,
        },
        {
          path: PATH_PAGE.reset,
          element: <ResetPage />,
        },
        {
          path: PATH_PAGE.bankBranch,
          element: <MapPage />,
        },
        {
          path: PATH_PAGE.contacts,
          element: <Contacts />,
        },
        {
          path: PATH_PAGE.help,
          element: <Help />,
        },
        {
          path: PATH_PAGE.news,
          element: <News />,
        },
        {
          path: PATH_PAGE.work,
          element: <Work />,
        },
        {
          path: PATH_PAGE.rulesRBS,
          element: <RulesRBS />,
        },
        {
          path: PATH_PAGE.rulesPP,
          element: <RulesPP />,
        },
        {
          path: PATH_PAGE.rulesGDPR,
          element: <RulesGDPR />,
        },
        {
          path: PATH_PAGE.customer.personalAccount,
          element: (
            <AuthGuard>
              <PersonalAccount />
            </AuthGuard>
          ),
          children: [
            {
              path: PATH_PAGE.customer.personalDate,
              element: <PersonalDate />,
              children: [
                {
                  path: PATH_PAGE.customer.changeEmail,
                  element: <PersonalAccountChangeEmail />,
                },
              ],
            },
            {
              path: PATH_PAGE.customer.security,
              element: <CustomerSecurity />,
              children: [
                {
                  path: PATH_PAGE.customer.changePassword,
                  element: <CustomerChangePassword />,
                },
              ],
            },
            {
              path: PATH_PAGE.customer.legalInformation,
              element: <PersonalAccountLegalInfo />,
            },
            {
              path: PATH_PAGE.customer.contactWithTheBank,
              element: <PersonalAccountContactWithTheBank />,
            },
            {
              path: PATH_PAGE.customer.notification,
              element: <PersonalAccountNotification />,
            },
            {
              path: PATH_PAGE.customer.servicePackages,
              element: <CustomerServices />,
            },
            {
              path: PATH_PAGE.customer.service,
              element: <PersonalAccountServices />,
            },
          ],
        },
      ],
    },
  ]);
