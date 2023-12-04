import React,{Suspense,lazy} from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RootLayout from "@components/RootLayout";
import LoadingSpinner from "@components/LoadingSpinner";

const Home = lazy(() => import('./Home'));
const ProductList = lazy(() => import('./Product'));
const ProductDetail = lazy(() => import('./ProductDetail'));
const Payment = lazy(() => import('./Checkout'));
const CheckoutResult = lazy(() => import('./SuccessPage/confirmDetail'));
const Favorite = lazy(() => import('./Favorite'));
const Solution = lazy(() => import('./Solution'));
const ErrorPage = lazy(() => import('./ErrorPage'));
const Contact = lazy(() => import('./Contact'));
const Sign = lazy(() => import('./Sign'));
const Profile = lazy(() => import('./Profile'));
const ProfileInfo = lazy(() => import('./Profile/ProfileInfo'));
const Transaction = lazy(() => import('./Profile/Transaction'));
const TransactionDetail = lazy(() => import('./SuccessPage/transactionDetail'));

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
          path: "favorite/:productId",
          element: <ProductDetail />,
        },
        {
          path: "payment",
          element: <Payment />,
        },
        {
          path: "checkout",
          element: <CheckoutResult />,
        },
        {
          path: "solutions",
          element: <Solution />,
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
        {
          path: "profile",
          element: <Profile />,
          children: [
            { index: true, path: 'profileInfo', element: <ProfileInfo /> ,},
            { path: 'transaction', element: <Transaction /> },
            { path: 'transaction/:reference', element: <TransactionDetail /> },
          ],
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
