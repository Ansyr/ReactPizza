import React, { Suspense } from "react";
import Loadable from "react-loadable";
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

// const Cart = React.lazy(
//   () => import(/*webpackChunkName: "Cart"*/ "./pages/Cart")
// );

const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart"*/ "./pages/Cart"),
  loading: () => <div>Идет загрузка корзины...</div>,
});

const FullPizza = React.lazy(
  () => import(/*webpackChunkName: "FullPizza"*/ "./pages/FullPizza")
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName: "NotFound"*/ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
