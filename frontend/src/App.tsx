import React from 'react'
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './components/registerPage/RegisterPage';
import LoginPage from './components/loginPage/LoginPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}  />
      </Routes>
    </div>
  );
}

export default App
