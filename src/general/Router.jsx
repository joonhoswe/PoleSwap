import { Route, Routes } from "react-router-dom";

import { RoutePaths } from "./RoutePaths.jsx";
import { Home } from "../pages/Home.jsx";
import { Listings } from "../pages/Listings.jsx";
import { MyListings } from "../pages/MyListings.jsx";
import { Sell } from "../pages/Sell.jsx";
import { NotFound } from "./NotFound.jsx";
import { Layout } from "./Layout.jsx";

export const Router = () => (
  <Routes>
    <Route
      path={RoutePaths.HOME}
      element={
        <Layout>
          <Home />
        </Layout>
      }
    />
    <Route
      path={RoutePaths.LISTINGS}
      element={
        <Layout>
          <Listings />
        </Layout>
      }
    />
    <Route
      path={RoutePaths.MY_LISTINGS}
      element={
        <Layout>
          <MyListings />
        </Layout>
      }
    />
    <Route
      path={RoutePaths.SELL}
      element={
        <Layout>
          <Sell />
        </Layout>
      }
    />
    <Route
      path="*"
      element={
        <Layout>
          <NotFound />
        </Layout>
      }
    />
  </Routes>
);
