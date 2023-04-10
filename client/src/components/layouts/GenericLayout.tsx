import { FC } from 'react';
import Meta, { MetaProps } from '@components/seo/Meta';
import Footer from '@components/ui/footer/Footer';
import Navbar from '@components/ui/navbar/Navbar';
import Sidebar from '@components/ui/sidebar/Sidebar';
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
    <div className={`${styles['generic-layout']} ${className}`}>
      <Sidebar />
      <section className={styles.wrapper}>
        <Navbar />
        {children}
      </section>
      <Footer />
    </div>
  </Meta>
);

Layout.defaultProps = {
  className: '',
};

export default Layout;
