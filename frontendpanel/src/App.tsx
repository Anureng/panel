import React from 'react';
import logo from './logo.svg';
import './App.css';
import Course from './components/Course';
import Instructor from './components/Instructor';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login';
import Redirect from './components/Redirect';
import Detail from './components/Detail';

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <Course />,
    },
    {
      path: "/instructor",
      element: <Instructor />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Detail/:id",
      element: <Detail />,
    }
  ]);
  return (
    <>
      <Redirect />
      <br />
      <br />
      <br />
      <RouterProvider router={router} />
      {/* <Instructor />
      <Course /> */}

    </>
  );
}

export default App;
