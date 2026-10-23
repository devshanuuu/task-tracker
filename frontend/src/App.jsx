import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Tasks from './components/Tasks'

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path = "/login" element ={<Login />} />
          <Route path = "/register" element ={<Register />} />
          <Route path = "/" element ={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path = "/tasks" element = {<ProtectedRoute><Tasks /></ProtectedRoute>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App