import { FaEdit, FaWrench } from 'react-icons/fa';
import { HiChartBar, HiCollection, HiHome, HiStar } from 'react-icons/hi';
import { RiFileWarningFill } from 'react-icons/ri';
import { IMenuItem } from '@types';
import {
  CHANNEL_ROUTE,
  SUBSCRIPTIONS_ROUTE,
  TRENDING_ROUTE,
  USER_ROUTE,
} from './consts';

// eslint-disable-next-line import/prefer-default-export
export const sidebarIndexItems: IMenuItem[] = [
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

export const sidebarAccountItems: IMenuItem[] = [
  {
    title: 'My information',
    Icon: FaEdit,
    href: `/${USER_ROUTE}/details`,
  },
  {
    title: 'My settings',
    Icon: FaWrench,
    href: `/${USER_ROUTE}/settings`,
  },
  {
    title: 'Delete account',
    Icon: RiFileWarningFill,
    href: `/${USER_ROUTE}/delete`,
  },
];
