import Head from "next/head";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { Provider } from "next-auth/client";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect } from "react";
import { Navbar } from "../components/common/Navbar";
import { PageLayout } from "../components/common/PageLayout";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }: AppProps) {
  // https://github.com/nextauthjs/next-auth/issues/532#issuecomment-746770260
  useEffect(() => {
    if (router.asPath.endsWith("#")) router.push(router.asPath.slice(0, -1));
  });

  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <div>
            <Head>
              <title>my-pantry</title>
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
              />
              <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <PageLayout>
              <Component {...pageProps} />
            </PageLayout>

            <footer className=""></footer>
          </div>
          <ReactQueryDevtools initialIsOpen />
        </ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
