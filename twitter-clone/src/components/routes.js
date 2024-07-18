

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Lgoin';
import Dashboard from './dashboard';

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteComponent;
