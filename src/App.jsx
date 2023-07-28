
import './App.css'
import Signup from './Signup'
import Login from './Login' 
import Welcome from './Welcome'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <Router>
      <div>
        <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Welcome' element={<Welcome/>} />
        </Routes>
      </div>
    </Router>
   
  )
}

export default App
