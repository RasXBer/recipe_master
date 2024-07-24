// import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Blog from './pages/Blog';
import About from './pages/About';
import SignIn from './pages/SignIn';
// import LoginIn from './components/LoginForm'

// Define the accessible routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: '/Recipe', element: <Recipe /> },
      { path: '/Blog', element: <Blog /> },
      { path: '/About', element: <About /> },
      { path: '/SignIn', element: <SignIn /> },
      // { path: '/LogIn', element: <LoginIn /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
