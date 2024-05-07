import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Login from './Lgoin'
import Dashborad from './dashboard'

const RouteComponent = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'/'} element={<Dashborad/>}/>
        </Routes>
      </BrowserRouter>
    )
}

export default RouteComponent;