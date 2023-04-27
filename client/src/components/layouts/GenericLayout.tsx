import { FC } from 'react';
import Meta, { MetaProps } from '@components/seo/Meta';
import Header from '@components/ui/common/header/Header';
import Sidebar from '@components/ui/common/sidebar/Sidebar';
import { Children } from '@types';
import styles from './GenericLayout.module.scss';

interface LayoutProps extends MetaProps {
  className?: string;
  children: Children;
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  children,
  className,
}: LayoutProps) => (
  <Meta title={title} description={description}>
    <div className={`${styles.genericLayout} ${className}`}>
      <Sidebar />
      <section className={styles.content}>
        <Header />
        {children}
      </section>
    </div>
  </Meta>
);

Layout.defaultProps = {
  className: '',
};

export default Layout;
