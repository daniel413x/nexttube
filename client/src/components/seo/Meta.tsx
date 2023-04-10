import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';

export interface MetaProps {
  title: string;
  description?: string;
}

const standardize = (string: string) => `${string} | Videohosting`;

const Meta: FC<PropsWithChildren<MetaProps>> = ({
  title,
  description,
  children,
}) => (
  <>
    <Head>
      <title>{standardize(title)}</title>
      {description ? (
        <>
          <meta name="description" content={description} />
          <meta name="og:title" content={standardize(title)} />
          <meta name="og:description" content={description} />
        </>
      ) : (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </Head>
    <main>{children}</main>
  </>
);

Meta.defaultProps = {
  description: '',
};

export default Meta;
