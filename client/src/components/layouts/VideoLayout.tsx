import { FC } from 'react';
import Meta, { MetaProps } from '@components/seo/Meta';
import Footer from '@components/ui/footer/Footer';
import Header from '@components/ui/header/Header';
import Sidebar from '@components/ui/sidebar/Sidebar';
import { Children } from '@types';
import styles from './VideoLayout.module.scss';

interface VideoLayoutProps extends MetaProps {
  className?: string;
  children: Children;
}

const VideoLayout: FC<VideoLayoutProps> = ({
  title,
  description,
  children,
  className,
}: VideoLayoutProps) => (
  <Meta title={title} description={description}>
    <div className={`${styles.genericVideoLayout} ${className}`}>
      <Sidebar />
      <section className={styles.content}>
        <Header />
        {children}
        <Footer />
      </section>
    </div>
  </Meta>
);

VideoLayout.defaultProps = {
  className: '',
};

export default VideoLayout;
