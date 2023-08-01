
import './App.css'
import Signup from './Signup'
import Login from './Login' 
import Welcome from './Welcome'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Storage from './Storage'

import { Navigate } from 'react-router-dom';

function App() {
  const isLoggedIn = Storage.getItem('isLoggedIn');

  return (
    <Router>
      <div>
        <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Welcome' element={isLoggedIn ? <Welcome /> : <Navigate to="/Login" />}/>
        </Routes>
      </div>
    </Router>
   
  )
}

export default App
