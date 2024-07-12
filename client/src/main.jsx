import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './pages/Home';
import Recipe from './pages/Recipe';
import Blog from './pages/Blog';
import About from './pages/About';
import SignIn from './pages/SignIn';

// Define the accessible routes, and which components respond to which URL
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
  <React.StrictMode>
     <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
   document.getElementById('root')
);
