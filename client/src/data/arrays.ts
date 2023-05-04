import { HiChartBar, HiCollection, HiHome, HiStar } from 'react-icons/hi';
import { IMenuItem } from '@types';
import { CHANNEL_ROUTE, SUBSCRIPTIONS_ROUTE, TRENDING_ROUTE } from './consts';

// eslint-disable-next-line import/prefer-default-export
export const sidebarMenuItems: IMenuItem[] = [
  {
    title: 'Main',
    Icon: HiHome,
    href: '/',
  },
  {
    title: 'Trends',
    Icon: HiChartBar,
    href: `/${TRENDING_ROUTE}`,
  },
  {
    title: 'My channel',
    Icon: HiStar,
    href: `/${CHANNEL_ROUTE}`,
  },
  {
    title: 'My subscriptions',
    Icon: HiCollection,
    href: `/${SUBSCRIPTIONS_ROUTE}`,
  },
];
