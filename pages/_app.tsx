import Head from "next/head";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "../components/common/ErrorBoundary";
import { Provider } from "next-auth/client";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect } from "react";

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
              <title>Create Next App</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mx-auto px-4">
              <Component {...pageProps} />
            </main>

            <footer className=""></footer>
          </div>
          <ReactQueryDevtools initialIsOpen />
        </ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
