import {useState} from 'react'
import axios from 'axios'

function Login() {
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = async(e) => {
      e.preventDefault(); // Prevent the default form submission behavior

      try {
        const response = await axios.post('http://localhost:8000/api/login', {email: email, password: password,})
         console.log(response.data)
         localStorage.setItem('token', response.data.token) // Store the token in local storage
      } catch(error) {
        console.log(error);
      }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
              <input type = "email" placeholder = "Email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
              <input type = "password" placeholder = "Password" value = {password} onChange ={(e) => setPassword(e.target.value)}/>
              <button type = "submit">
                Login
              </button>
            </form>
        </div>
    )
}

export default Login