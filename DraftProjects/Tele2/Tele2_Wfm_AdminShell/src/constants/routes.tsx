import {
  ApartmentOutlined,
  TeamOutlined,
  HomeOutlined,
  SettingOutlined,
  BellOutlined,
  ShopOutlined,
  UserSwitchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import CompanyGroupsPage from 'pages/CompanyGroupsPage';
import DealersPage from 'pages/DealersPage';
import PersonsPage from 'pages/PersonsPage';
import MainPage from 'pages/MainPage';
import PartnersPage from 'pages/PartnersPage';
import AutoOperationsSettings from 'pages/AutoOperationsSettings';
import NotificationsSettings from 'pages/NotificationsSettings';
import SalesOfficesPage from 'pages/SalesOfficesPage';
import RolesPage from 'pages/RolesPage';
import UploadStatisticDataPage from 'pages/UploadStatisticDataPage';
import UploadFromWdPage from 'pages/UploadFromWdPage';
import {
  OrganizationalStructurePaths, UploadsPaths,
} from 'enums/paths';
import { Routes } from 'types/Routes';
import Roles from 'enums/roles';

const routes: Routes = {
  main: {
    title: 'Главная',
    path: '/',
    autoRedirect: false,
    icon: HomeOutlined,
    component: <MainPage />,
    roles: [Roles.WFM_Admin],
  },
  'organizational-structure': {
    title: 'Орг. структура',
    path: '/organizational-structure',
    autoRedirect: false,
    icon: ApartmentOutlined,
    roles: [Roles.WFM_Admin],
    children: [
      {
        title: 'Группы компаний',
        path: OrganizationalStructurePaths.CompanyGroups,
        key: 'company-groups',
        component: <CompanyGroupsPage />,
      },
      {
        title: 'Партнеры',
        path: OrganizationalStructurePaths.Partners,
        key: 'partners',
        component: <PartnersPage />,
      },
      {
        title: 'Дилеры',
        path: OrganizationalStructurePaths.Dealers,
        key: 'dealers',
        component: <DealersPage />,
      },
    ],
  },
  persons: {
    title: 'Пользователи',
    path: '/persons',
    autoRedirect: false,
    icon: TeamOutlined,
    component: <PersonsPage />,
    roles: [Roles.WFM_Admin],
  },
  'operations-settings': {
    title: 'Автоматические операции',
    path: '/operations-settings',
    autoRedirect: false,
    icon: SettingOutlined,
    component: <AutoOperationsSettings />,
    roles: [Roles.WFM_Admin, Roles.WorkShiftsFactSettingsAdmin],
  },
  'notifications-settings': {
    title: 'Уведомления',
    path: '/notifications-settings',
    autoRedirect: false,
    icon: BellOutlined,
    component: <NotificationsSettings />,
    roles: [Roles.WFM_Admin, Roles.WorkShiftsFactSettingsAdmin],
  },
  'sales-offices': {
    title: 'Офисы продаж',
    path: '/sales-offices',
    autoRedirect: false,
    icon: ShopOutlined,
    component: <SalesOfficesPage />,
    roles: [Roles.WFM_Admin],
  },
  roles: {
    title: 'Роли',
    path: '/roles',
    autoRedirect: false,
    icon: UserSwitchOutlined,
    component: <RolesPage />,
    roles: [Roles.AuthAdmin],
  },
  uploads: {
    title: 'Загрузка',
    path: 'upload',
    autoRedirect: false,
    icon: UploadOutlined,
    roles: [Roles.ForecastParametersLoad],
    children: [
      {
        title: 'Статистических данных',
        path: UploadsPaths.StatisticData,
        key: 'statistic-data',
        component: <UploadStatisticDataPage />,
      },
      {
        title: 'Данных из WD',
        path: UploadsPaths.FromWd,
        key: 'from-wd',
        component: <UploadFromWdPage />,
      },
    ],
  },
};

export default routes;
