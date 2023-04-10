import { HiChartBar, HiCollection, HiHome, HiStar } from 'react-icons/hi';

import { IMenuItem } from '@types';

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
    href: '/trending',
  },
  {
    title: 'My channel',
    Icon: HiStar,
    href: '/my-channel',
  },
  {
    title: 'My subscriptions',
    Icon: HiCollection,
    href: '/subscriptions',
  },
];
