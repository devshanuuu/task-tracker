import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from '../api/axios'

function Login() {
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [error, setError] = useState('');
    const[loading, setLoading] =  useState(false);
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      setError('')
      setLoading(true)

      try {
        const response = await api.post('/login', {email: email, password: password,})
         console.log(response.data)
         localStorage.setItem('token', response.data.token) // Store the token in local storage
         localStorage.setItem('user', JSON.stringify(response.data.user))
         navigate('/') // Navigate after saving the token
      } catch(error) {
        console.log(error.response)
        
        if(error.response?.status === 422) {
           setError(error.response.data.message)
        } else if (error.response?.status === 401) {
           setError('Invalid Email or Password.')
        } else {
          setError('Something went wrong. Please try again')
        }
      } finally {
        setLoading(false)
      }
    }

    return (
        <div>
            <h1>Login</h1>

            {error && <p className = "error-message">{error}</p>}

            <form onSubmit = {handleSubmit}>
              <input type = "email" placeholder = "Email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
              <input type = "password" placeholder = "Password" value = {password} onChange ={(e) => setPassword(e.target.value)}/>
              <button type = "submit" disabled={loading}>
                {loading?'Logging In' : 'Login'}
              </button>
            </form>
            
            <p>Don't have an account? <Link to ="/register">Create one</Link></p>
        </div>
    )
}

export default Login