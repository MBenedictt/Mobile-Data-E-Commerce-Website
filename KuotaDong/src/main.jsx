import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Homepage';
// import PaketDataPage from './pages/PaketDataPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  // {
  //   path: '/paket-data',
  //   element: <PaketDataPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);