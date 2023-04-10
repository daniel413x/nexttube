import { NextPage } from 'next';
import { Head, Html, Main, NextScript } from 'next/document';

const Document: NextPage = () => (
  <Html lang="en">
    <Head>
      <link rel="icon" href="/logos/favicon.svg" type="image/svg+xml" />
      <meta name="theme-color" content="#FF7652" />
      <meta name="msapplication-navbutton-color" content="#FF7652" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#FF7652" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
