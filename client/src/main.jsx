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

// Create Apollo Client
// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql', // Replace with your GraphQL endpoint
//   cache: new InMemoryCache(),
// });

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
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
