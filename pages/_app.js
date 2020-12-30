import Head from "next/head";
import "../styles/globals.css";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "../services/firebase";
import { ErrorBoundary } from "../components/common/ErrorBoundary";

function MyApp({ Component, pageProps }) {
  const queryCache = new QueryCache();
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
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
      </FirebaseAppProvider>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
