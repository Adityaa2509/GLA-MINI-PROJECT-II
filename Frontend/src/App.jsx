import './App.css'
import React from 'react'
import { BrowserRouter,Route,Routes, useNavigate} from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import AdminPanel from './components/AdminPanel'
import Header from './components/Header'

function App() {
  return (
    
    <div>
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/adminpanel' element={<AdminPanel/>}/>
        
      </Routes>
     </BrowserRouter> 
    </div>
  )
}

export default App
