// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('user'),
  },
  {
    title: 'Orgnaizations',
    path: '/dashboard/division',
    icon: icon('orphanage'),
  },
  // {
  //   title: 'Oldage homes',
  //   path: '/dashboard/oldageHome',
  //   icon: icon('old'),
  // },
  // {
  //   title: 'Orphanages',
  //   path: '/dashboard/orphange',
  //   icon: icon('orphanage'),
  // },
  {
    title: 'Store',
    path: '/dashboard/store',
    icon: icon('store'),
  },
  {
    title: 'Events',
    path: '/dashboard/event',
    icon: icon('event'),
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: icon('order'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
