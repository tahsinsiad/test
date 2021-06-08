import { ThemeProvider } from 'emotion-theming';
import GoogleFonts from 'next-google-fonts';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';
import Layout from '@/components/core/Layout';
import SEO from '@/next-seo.config';
import theme from '@/theme';

Router.events.on('routeChangeStart', (url) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&family=Literata:wght@400;600;700&display=swap" />
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link rel="stylesheet" href="/semantic.min.css" />
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
          <link rel="icon" href="/favicon.png" type="image/x-icon" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/android-icon-192x192.png"
          ></link>
          <link
            href="/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link
            href="/favicon-96x96.png"
            rel="icon"
            type="image/png"
            sizes="96x96"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-icon-180x180.png"
          />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#000000" />

          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/flickity.min.css"
          ></link>
          <script src="/flickity.min.js" defer></script>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>

      <style jsx global>
        {`
          html {
            scroll-behavior: smooth;
            hyphens: none;
          }

          /* external css: flickity.css */

          // .carousel {
          //   background: #eee;
          // }

          // .carousel-cell {
          //   width: 28%;
          //   height: 200px;
          //   margin-right: 10px;
          //   background: #8c8;
          //   border-radius: 5px;
          //   counter-increment: carousel-cell;
          // }

          // .carousel-cell.is-selected {
          //   background: #ed2;
          // }

          // /* cell number */
          // .carousel-cell:before {
          //   display: block;
          //   text-align: center;
          //   content: counter(carousel-cell);
          //   line-height: 200px;
          //   font-size: 80px;
          //   color: white;
          // }

          .content .carousel {
            background: #fff;
            margin-bottom: 60px;
          }

          .content .carousel-cell {
            width: 70%;
            height: 200px;
            /* flex-box, center image in cell */
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-align-items: center;
            align-items: center;
          }

          .content .carousel-cell img {
            display: block;
            max-width: 100%;
            max-height: 100%;
            /* dim unselected */
            opacity: 0.7;
            -webkit-transform: scale(0.85);
            transform: scale(0.85);
            -webkit-filter: blur(5px);
            filter: blur(5px);
            -webkit-transition: opacity 0.3s, -webkit-transform 0.3s,
              transform 0.3s, -webkit-filter 0.3s, filter 0.3s;
            transition: opacity 0.3s, transform 0.3s, filter 0.3s;
          }

          /* brighten selected image */
          .content .carousel-cell.is-selected img {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
            -webkit-filter: none;
            filter: none;
          }

          @media screen and (min-width: 768px) {
            .content .carousel-cell {
              height: 400px;
            }
          }
          @media screen and (max-width: 768px) {
            .content .carousel-cell {
              width: 100%;
              height: auto;
            }
          }

          @media screen and (min-width: 960px) {
            .content .carousel-cell {
              width: 100%;
            }
          }

          /* buttons, no circle */
          .content .flickity-prev-next-button {
            width: 60px;
            height: 60px;
            background: transparent;
            opacity: 0.6;
          }
          .content .flickity-prev-next-button:hover {
            background: transparent;
            opacity: 1;
          }
          /* arrow color */
          .content .flickity-prev-next-button .arrow {
            fill: white;
          }
          .content .flickity-prev-next-button.no-svg {
            color: white;
          }
          /* closer to edge */
          .content .flickity-prev-next-button.previous {
            left: 0;
          }
          .content .flickity-prev-next-button.next {
            right: 0;
          }
          /* hide disabled button */
          .content .flickity-prev-next-button:disabled {
            display: none;
          }

          .etcetera > .ui.card,
          .ui.cards > .card {
            border: 0;
            box-shadow: none;
          }

          .etcetera > .ui.card > .content.carousel {
            padding: 0;
          }

          .etcetera .carousel-indicators > a {
            padding: 0 5px;
          }

          .etcetera .carousel-control {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .etcetera .carousel-indicators > a:first-child {
            padding-left: 0;
          }
          .etcetera .carousel-indicators > a:last-child {
            padding-right: 0;
          }

          a:hover {
            color: #000 !important;
          }
          .tab-media > div.menu {
            margin-bottom: 40px !important;
          }
          .tab-media > div.menu > a:after {
            content: '';
            width: 0;
            height: 100%;
            position: absolute;
            border: 2px solid black;
            top: 0;
            right: -3px;
            background: #000;
          }

          .tab-media > div.menu > a:last-child:after {
            display: none;
          }

          .tab-media > div.menu > a.item {
            font-size: 40px;
            font-weight: 700 !important;
            line-height: 40px;
            padding: 0 20px !important;
          }
          .tab-media > div.menu > a.item:nth-child(1) {
            padding: 0 20px 0 0 !important;
            border: 0;
          }
          .tab-media > div.segment.tab {
            border: 0;
            padding: 0;
            box-shadow: none;
          }

          @media only screen and (min-width: 1200px) {
            .ui.container {
              width: 970px;
            }
            .ui.container.article-container {
              width: 768px;
            }
          }

          .ui.popup.research-pillars,
          .ui.popup.in-the-news {
            padding: 0;
          }

          .ui.bottom.left.popup:before,
          .ui.top.left.popup:before,
          .ui.bottom.right.popup:before,
          .ui.top.right.popup:before {
            display: none;
          }

          .back-to-top {
            position: fixed;
            right: 30px;
            bottom: 30px;
            padding: 5px 10px;
            color: #fff;
            background: #777268;
          }

          @media only screen and (min-width: 768px) {
            .excerpt-secondary {
              display: none;
            }
            .excerpt-primary {
              display: block;
            }
          }

          @media only screen and (max-width: 768px) {
            .ui.container {
              width: 100vw;
              margin: 0 !important;
              padding: 0 1em;
            }
            .excerpt-primary {
              display: none;
            }
            .excerpt-primary.isHome {
              display: none;
            }
            .excerpt-primary.isHero {
              display: block;
            }
            .excerpt-secondary {
              display: block;
            }
            .excerpt-secondary.isHome {
              display: none;
            }

            .tab-media > div.menu {
              margin-bottom: 20px !important;
            }

            .tab-media > div.menu > a.item {
              font-size: 20px !important;
              line-height: 20px;
              padding: 0 10px !important;
            }

            .tab-media > div.menu > a.item:nth-child(1) {
              padding: 0 10px !important;
            }

            .tab-media > div.menu > a:after {
              border: 2px solid black;
              right: -3px;
            }

            .back-to-top {
              right: 8px;
              bottom: 60px;
            }
          }

          @media only screen and (max-width: 1023px) {
            .back-to-top {
              right: 8px;
              bottom: 60px;
            }
          }

          #centre-table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 30px;
          }

          #centre-table td {
            line-height: 1.5;
          }

          #centre-table td,
          #centre-table th {
            // border: 1px solid #ddd;
            padding: 8px;
          }

          #centre-table td > span {
            font-weight: 700;
          }

          #centre-table td:first-child {
            max-width: 350px;
          }

          #centre-table td:not(:first-child) {
            text-align: center;
          }

          #centre-table tr:nth-child(odd) {
            background-color: #f3f3f3;
          }

          #centre-table tr td span {
            font-weight: 700;
          }

          #centre-table tr td:nth-child(2),
          #centre-table tr td:nth-child(3) {
            text-align: center;
          }

          // #centre-table tr:hover {
          //   background-color: #ddd;
          // }

          #centre-table th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: center;
            background-color: #fff;
            color: #000;
          }

          #centre-table.public-goods {
            border-bottom: 5px solid #f2c53d;
          }

          #centre-table.public-goods tr:first-child {
            border-bottom: 3px solid #f2c53d;
          }

          #centre-table.safety-nets {
            border-bottom: 5px solid #f07e5a;
          }

          #centre-table.safety-nets tr:first-child {
            border-bottom: 3px solid #f07e5a;
          }

          #centre-table.societal-contracts {
            border-bottom: 5px solid #bf8844;
          }

          #centre-table.societal-contracts tr:first-child {
            border-bottom: 3px solid #bf8844;
          }

          #centre-table.others {
            border-bottom: 5px solid #bababa;
          }

          #centre-table.others tr:first-child {
            border-bottom: 3px solid #bababa;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
