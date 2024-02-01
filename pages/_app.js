import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export default function App({ Component, pageProps }) {
  const [favorites, setFavorites] = useState([]);
  return (
    <>
      <GlobalStyle />
      <Layout>
        <FavoritesContext.Provider value={{ favorites, setFavorites }}>
          <Component {...pageProps} />
        </FavoritesContext.Provider>
      </Layout>
    </>
  );
}
