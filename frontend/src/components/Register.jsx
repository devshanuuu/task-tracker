import {useState} from 'react'
import api from '../api/axios'
import {Link, useNavigate} from 'react-router-dom'

function Register() {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] =useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        
        e.preventDefault()
        setError('') // Clear any previous error

        try {
            const response = await api.post('/register', {name: name, email: email, password: password })
            console.log(response.data)

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))

            navigate('/')

        }catch(error) {
            console.log(error.response)
            setError('Something went wrong, Please try again')
        }
        


    }
    
    return (
        <div>
            <h1>REGISTER</h1>
            {error && <p>{error}</p>}

            <form onSubmit = {handleSubmit}>
                <input type = "text" placeholder = "Name" value = {name} onChange = {(e) => setName(e.target.value)}/>
                <input type = "email" placeholder = "Email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
                <input type = "password" placeholder = "Password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
                <p> Password must be at least 8 characters and contain uppercase,lowercase, and a number.</p>
                <button type = "submit">Create Account</button>
            </form>
            <p>Already have an account? <Link to ='/login'>Login</Link></p>
        </div>
    )
}

export default Register