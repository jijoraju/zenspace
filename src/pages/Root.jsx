import React,{Suspense,lazy} from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RootLayout from "@components/RootLayout";
import LoadingSpinner from "@components/LoadingSpinner";

const Home = lazy(() => import('./Home'));
const ProductList = lazy(() => import('./Product'));
const ProductDetail = lazy(() => import('./Product/ProductDetail'));
const Favorite = lazy(() => import('./Favorite'));
const ErrorPage = lazy(() => import('./ErrorPage'));
const Contact = lazy(() => import('./Contact'));
const Sign = lazy(() => import('./Sign'));

function Root() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: "/",
          element: <Home />,
          // loader: postsLoader,
          // children: [
          //   { path: '/:postId', element: <PostDetails />, loader: postDetailsLoader }
          // ],
        },
        {
          path: "product",
          element: <ProductList />,
        },
        {
          path: "product/:productId",
          element: <ProductDetail />,
        },
        {
          path: "favorite",
          element: <Favorite />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "login",
          element: <Sign />,
        },
        {
          path: "register",
          element: <Sign />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-center"
        // autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />
    </Suspense>
  )
}

export default Root;
