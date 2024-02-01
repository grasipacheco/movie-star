import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export default function App({ Component, pageProps }) {
  const [favorites] = useState([]);
  return (
    <>
      <GlobalStyle />
      <Layout>
        <FavoritesContext.Provider value={{ favorites }}>
          <Component {...pageProps} />
        </FavoritesContext.Provider>
      </Layout>
    </>
  );
}
