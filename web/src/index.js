import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Confirmation from './pages/ConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage'; 
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFound from './pages/NotFoundPage';
import ResultPage from './pages/ResultPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <OrderPage />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />
  },
  {
    path: "/search",
    element:<SearchPage />,
  },
  {
    path: "/history",
    element: <OrderHistoryPage/>
  },
  {
    path: "/signin",
    element: <SignInPage/>
  },
  {
    path: "/signup",
    element: <SignUpPage/>
  },
  {
    path: "/result/:OrderId",
    element: <ResultPage/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="d-flex flex-column min-vh-100">
      <Navbar/>
      <RouterProvider router={router}  />
      <Footer/>
    </div>
  </React.StrictMode>
);