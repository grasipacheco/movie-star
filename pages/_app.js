import GlobalStyle from "../styles";
import styled from "styled-components";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
