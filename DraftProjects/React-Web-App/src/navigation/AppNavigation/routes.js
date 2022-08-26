import React, {lazy} from 'react';
import {withSuspense} from "../../hoc/withSuspense";
import AccountsScreen from "../../screens/AccountsScreen"
import AccountScreen from "../../screens/AccountsScreen/AccountScreen"
import NewOrderReceived from "../../screens/OrderReceivedScreen"
import ReportingCostCenterScreen from "../../screens/ReportingCostCenterScreen";
import MessagesScreen from "../../screens/MessagesScreen";
import EditCompanyInfoScreen from "../../screens/CompaniesScreen/EditCompanyInfoScreen";
import EmployeeAssignment from "../../screens/EmployeeAssignmentScreen";
import JobLogsProcessingScreen from "../../screens/JobLogsProcessingScreen";
import ReportingCompanyScreen from "../../screens/ReportingCompanyScreen";
import ReportingEmployeeScreen from "../../screens/ReportingEmployeeScreen";
import NewOrderContainer from "../../screens/NewOrderScreen";
import EventListingContainer from "../../screens/EventListingScreen";
import DashboardScreenContainer from "../../screens/DashboardScreen/DashboardScreen";
import CompanyDetailsScreen from "../../screens/CompaniesScreen/CompanyDetailsScreen";
import CostCentersScreen from "../../screens/CostCentersScreen";
import SkillsCertificatesScreen from "../../screens/Skills&CertificatesScreen";
import TasksContainer from "../../screens/TasksScreen/TasksContainer";
import EditCompanyLocationsScreen from "../../screens/CompaniesScreen/EditCompanyLocationsScreen";
import EditAccountInfoScreen from "../../screens/AccountsScreen/AccountScreen/EditAccountInfoScreen";
import EmployeesScreen from "../../screens/EmployeesScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import ProfileEditPersonalInfo from "../../screens/ProfileScreen/EditPersonalInfoScreen/ProfileEditPersonalInfo";

const CompaniesScreen = lazy(() => import("../../screens/CompaniesScreen"));
const JoblinkApiScreen = lazy(() => import("../../screens/JoblinkApiScreen"));

export const AccountsSubMenu = [
    {
        id: 1,
        to: '/accounts-companies',
        label: '- Companies'
    },
    {
        id: 2,
        to: '/accounts-joblink-admins',
        label: '- Joblink Admins'
    },
    {
        id: 3,
        to: '/accounts-joblink-users',
        label: '- Joblink Users'
    },
    {
        id: 4,
        to: '/accounts-employees',
        label: '- Employees'
    },
]

export const AdminSettingsSubMenu = [
    {
        id: 1,
        to: '/cost-centers',
        label: '- Cost centers'
    },
    {
        id: 2,
        to: '/skills-and-certificates',
        label: '- Skills and Certificates'
    },
    {
        id: 3,
        to: '/tasks',
        label: '- Tasks'
    },
    {
        id: 4,
        to: '/joblink-api',
        label: '- Joblink API'
    }
]

export const ReportingSubMenu = [
    {
        id: 1,
        to: '/reporting-company',
        label: '- Company'
    },
    {
        id: 2,
        to: '/reporting-employee',
        label: '- Employee'
    },
    {
        id: 3,
        to: '/reporting-cost-center',
        label: '- Cost center'
    },
]

const routes = [
    {
        path: "/",
        exact: true,
        component: <DashboardScreenContainer/>
    },
    {
        path: "/messages",
        component: <MessagesScreen title="Messages"/>,
    },
    {
        path: "/event-listing",
        exact: true,
        component: <EventListingContainer/>,
    },
    {
        path: "/event-listing/:orderId",
        exact: true,
        component: <NewOrderReceived/>
    },
    {
        path: "/event-listing/:orderId/employee-assignment",
        exact: true,
        component: <EmployeeAssignment title="Employee Assignment"/>
    },
    {
        path: "/new-order",
        component: <NewOrderContainer/>
    },
    {
        path: "/job-logs-processing",
        component: <JobLogsProcessingScreen title="Job logs processing"/>
    },
    {
        path: "/reporting-company",
        component: <ReportingCompanyScreen title="Company"/>
    },
    {
        path: "/reporting-employee",
        component: <ReportingEmployeeScreen title="Employee"/>
    },
    {
        path: "/reporting-cost-center",
        component: <ReportingCostCenterScreen title="Cost center"/>
    },
    {
        path: "/accounts-companies",
        exact: true,
        component: withSuspense(CompaniesScreen)
    },
    {
        path: "/accounts-companies/:companyId",
        exact: true,
        component: <CompanyDetailsScreen/>
    },
    {
        path: "/accounts-companies/:companyId/edit-company-info",
        exact: true,
        component: <EditCompanyInfoScreen/>
    },
    {
        path: "/accounts-companies/:companyId/edit-company-locations",
        exact: true,
        component: <EditCompanyLocationsScreen/>
    },
    {
        path: "/accounts-joblink-admins",
        exact: true,
        component: <AccountsScreen title="Joblink Admins" role="admin"/>
    },
    {
        path: "/accounts-joblink-users",
        exact: true,
        component: <AccountsScreen title="Joblink Users" role="user"/>
    },
    {
        path: "/accounts-joblink/:id",
        exact: true,
        component: <AccountScreen/>
    },
    {
        path: "/accounts-joblink/:id/edit-company-info",
        exact: true,
        component: <EditAccountInfoScreen/>
    },
    {
        path: "/accounts-employees",
        exact: true,
        component: <EmployeesScreen/>
    },
    {
        path: "/accounts-employees/:employeeId",
        exact: true,
        component: <ProfileScreen/>
    },
    {
        path: "/accounts-employees/:employeeId/edit-person-info",
        exact: true,
        component: <ProfileEditPersonalInfo/>
    },
    {
        path: "/cost-centers",
        component: <CostCentersScreen title="Cost centers"/>
    },
    {
        path: "/skills-and-certificates",
        component: <SkillsCertificatesScreen title="Skills and Certificates"/>
    },
    {
        path: "/tasks",
        component: <TasksContainer/>
    },
    {
        path: "/joblink-api",
        component: withSuspense(JoblinkApiScreen)
    },

];


export default routes;
