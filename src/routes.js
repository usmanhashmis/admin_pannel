import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Selectcoin from './pages/Selectcoin';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
// import Alert from './_mock/Valuestoredb';
import Addproduct from './pages/Addproduct';
import Productorders from './pages/Productorders';
import Contractamount from './pages/Contractamount';
import Discount from './pages/Discountoffer';
import Addstock from './pages/Addnewstock';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'selectcoin', element: <Selectcoin /> },
        { path: 'products', element: <Products /> },
        // { path: 'valuestoredone', element: <Alert /> },
        { path: 'addproduct', element: <Addproduct/> },
        { path: 'addproduct/edit/:id', element: <Addproduct/> },
        { path: 'productorders', element: <Productorders/> },
        { path: 'contractamount', element: <Contractamount/> },
        { path: 'discount', element: <Discount/> },
        { path: 'addstock', element: <Addstock/> },

      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
