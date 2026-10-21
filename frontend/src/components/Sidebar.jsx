import {useNavigate} from 'react-router-dom'
import api from '../api/axios'


function Sidebar() {
    const navigate = useNavigate()

    const handleLogout = async() => {
        try {
           await api.post('/logout')
        } catch(error) {
           console.error('Logout request failed:', error) 
        } finally {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        }
    }
    
    
    return (
        <aside className = "sidebar">
            <div className = "sidebar-brand">
                 <h2>🌿 TaskTracker</h2>
            </div>

            <nav className = "sidebar-nav">
                <p className="active">Home</p>
                <p>Tasks</p>
                <p>Notes</p>
            </nav>

            <div className="sidebar-bottom">
                <p>Settings</p>
                <p onClick = {handleLogout}>Logout</p>
            </div>
        </aside>
    )
}

export default Sidebar