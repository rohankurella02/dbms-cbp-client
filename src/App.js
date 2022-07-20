import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link, Route, Routes} from 'react-router-dom'
import Teacher from './Components/Teacher'
import Student from './Components/Student'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountMenu from './AccountMenu'
import Tooltip from '@mui/material/Tooltip';
import Profile from './Profile'


function App() {

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <div className="menu">
        <img style={{width: "165px", padding: "9px"}} src="https://fontmeme.com/permalink/220203/5a80245a7ad42952a89e45e33e4abb38.png" alt="" />
        <div className="links">
          <Tooltip title="Staff" ><Link className="Link" to="staff"><PersonIcon />  STAFF</Link></Tooltip>
          <Link className="Link" to="student"><PersonIcon />  STUDENT</Link>
          <AccountMenu />
        </div>
      </div>
      <Routes >
        <Route path="/" element={<App />} />
        <Route path="/staff" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/profile" element={<Profile/> } />
      </Routes>


      
    </div>
  )
}

export default App;
