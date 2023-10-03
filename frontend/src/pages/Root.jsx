import React,{Suspense,lazy} from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import '@Public/styles/main.scss'
import RootLayout from "@components/RootLayout";
import LoadingSpinner from "@components/LoadingSpinner";
const Home = lazy(() => import('./Home'));
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
          path: "/contact",
          element: <Contact />,
          // loader: postsLoader,
          // children: [
          //   { path: '/:postId', element: <PostDetails />, loader: postDetailsLoader }
          // ],
        },
        {
          path: "/login",
          element: <Sign />,
        },
        {
          path: "/register",
          element: <Sign />,
        },
      ],
    },
  ]);

  return (
     <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />;
     </Suspense>
  )
}

export default Root;
