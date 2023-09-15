import { Navigate, useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import LoadingScreen  from './components/loading/Loading'
//



import UserPage from './pages/user/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
// import Organization from './pages/organaization/Index';
import Orphange from './pages/organaization/orphangae/Orphanages';
import Store from './pages/store/Store';
import Event from './pages/event/Events';
import CreateForm from './pages/organaization/Create';
import View from './components/organization/View/Index';
import Requiremnt from './components/organization/View/Requirement/Index';
import AddRequirement from './components/organization/View/Requirement/Form';

// Attendance
import Attendance from './components/organization/View/Attendance/Index';
import AddAttendance from './components/organization/View/Attendance/CreateForm';


import CreateStore from './components/store/Form';
import ViewStore from './pages/store/View';
import StoreInvoice from './components/invoice/store/Index';
import EventInvoice from './components/invoice/event/Index';

import CreateEvent from './components/event/Form';
import EventView from './pages/event/View';

import Orders from './pages/orders/Order';
import OrgInvoice from './components/invoice/organization/Index';

import DivisionCreate from './components/organization/division/CreateDivisionForm';
import OrganaizationList from './components/organization/organaization/Index'
import CreateOrgForm from './components/organization/organaization/CreateOrganaization'
import AuthGuard from './guards/AuthGuard';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen loading />}>
      <Component {...props} />
    </Suspense>
  );

  const Organization = Loadable(lazy(() => import('./pages/organaization/Index')));
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <AuthGuard> <DashboardLayout /> </AuthGuard> ,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },

        {
          path: 'division',
          children: [
            { element: <Organization />, index: true },
            { path: 'create', element: <DivisionCreate /> },
            { path: 'edit/:id', element: <DivisionCreate /> },

            { path: 'list/:id',element: <OrganaizationList/> },
            { path: 'create-organaization/:id',element: <CreateOrgForm/> },
            { path: 'edit-organaization/:orgId',element: <CreateOrgForm/> },
            { path: 'organaization/view/:id',element: <View/> },
            // Requrment
            { path: 'organaization/view/requiremnt/:orgId',element: <Requiremnt/> },
            { path: 'organaization/view/requiremnt/create/:orgId',element: <AddRequirement/> },
            { path: 'organaization/view/requiremnt/edit/:reqId',element: <AddRequirement/> },
            // Attendance
            { path: 'organaization/view/attendance/:orgId',element: <Attendance/> },
            { path: 'organaization/view/attendance/create/:orgId',element: <AddAttendance/> },
            { path: 'organaization/view/attendance/edit/:attId',element: <AddAttendance/> },
          ],
        },

      
       
        {
          path: 'store',
          children: [
            { element: <Store />, index: true },
            { path: 'create', element: <CreateStore /> },
            { path: 'edit/:storeId', element: <CreateStore /> },
            { path: 'view/:id', element: <ViewStore /> },
            { path: 'donation/invoice/:id', element: <StoreInvoice /> },
          ],
        },

        {
          path: 'event',
          children: [
            { element: <Event />, index: true },
            { path: 'create', element: <CreateEvent /> },
            { path: 'view/:id', element: <EventView /> },
            { path: 'edit/:id', element: <CreateEvent /> },
            { path: 'donation/invoice/:id', element: <EventInvoice /> },
          ],
        },

        {
          path: 'orders',
          children: [
            { element: <Orders />, index: true },
            { path: 'view/:id', element: <OrgInvoice /> },
            { path: 'store-view/:id', element: <StoreInvoice /> },
            { path: 'event-view/:id', element: <EventInvoice /> },
          ],
        },
      ],
    },

    {
      path: 'invoice',
      children: [
        { path: 'org-invoice/:id', element: <OrgInvoice /> },
        { path: 'store-invoice/:id', element: <StoreInvoice /> },
        { path: 'event-invoice/:id', element: <EventInvoice /> },
      ],
    },



    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
