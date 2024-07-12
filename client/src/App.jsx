// import { useState } from 'react'
import './App.css'

import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';

function App() {
 
  return (
    <>
       <NavBar />
      <main className="mx-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;
