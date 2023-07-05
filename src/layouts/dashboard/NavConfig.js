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
    title: 'Customers List',
    path: '/dashboard/customerlist',
    icon: getIcon('bxs:purchase-tag'),
  },
  {
    title: 'product Orders',
    path: '/dashboard/productorders',
    icon: getIcon('bxs:purchase-tag'),
  },
  {
    title: 'Discounts',
    path: '/dashboard/discount',
    icon: getIcon('tabler:shopping-cart-discount'),
  },
  {
    title: 'contract Amount',
    path: '/dashboard/contractamount',
    icon: getIcon('clarity:contract-solid'),
    
  },
  {
    title: 'Profit Calculation ',
    path: '/dashboard/addstock',
    icon: getIcon('game-icons:profit'),
    
  },
  {
    title: 'logout',
    path: '/login',
    removeToken : () => { localStorage.removeItem("token") },
    icon: getIcon('eva:lock-fill'),

  
  },

];

export default navConfig;
