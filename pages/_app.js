import Head from "next/head";
import "../styles/globals.css";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

function MyApp({ Component, pageProps }) {
  const queryCache = new QueryCache();
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
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
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
