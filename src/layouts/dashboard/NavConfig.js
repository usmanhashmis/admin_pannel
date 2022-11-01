// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;
const myfun=()=>{
  console.log("working")
  localStorage.removeItem("token")
}

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Coins',
    path: '/dashboard/selectcoin',
    icon: getIcon('la:coins'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'product Orders',
    path: '/dashboard/productorders',
    icon: getIcon('bxs:purchase-tag'),
  },
  {
    title: 'Discounts',
    path: '/dashboard/discount',
    icon: getIcon('bxs:purchase-tag'),
  },
  {
    title: 'contract Amount',
    path: '/dashboard/contractamount',
    icon: getIcon('clarity:contract-solid'),
    
  },
  {
    title: 'logout',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
    fun:myfun()
  },

];

export default navConfig;
