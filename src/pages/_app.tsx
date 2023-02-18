/** @format */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SearchFeature from "@/components/SearchFeataure";
import Layout from "@/components/Layout";

import { AuthContextProvider } from "@/lib/context/Auth/authContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <Layout title="Home Page">
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </>
  );
}
