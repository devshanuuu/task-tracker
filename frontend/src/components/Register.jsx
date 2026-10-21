import {useState} from 'react'
import api from '../api/axios'
import {Link, useNavigate} from 'react-router-dom'

function Register() {
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
 
    const[error, setError] =useState('')
    const[loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const passwordLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    

    const handleSubmit = async(e) => {
        
        e.preventDefault()
        setError('') // Clear any previous error
        setLoading(true)

        try {
            const response = await api.post('/register', {name: name, email: email, password: password })
            console.log(response.data)

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))

            navigate('/')

        }catch(error) {
            console.log(error.response)

            if(error.response?.status === 422) {
               setError(error.response.data.message)
            }else {
               setError('Something went wrong, Please try again')
            }
        } finally {
            setLoading(false)
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
                <div>
                    <p>{passwordLength ? '✓' : '✗'} At least 8 Charcaters</p>
                    <p>{hasUppercase ? '✓' : '✗'} One uppercase letter</p>
                    <p>{hasLowercase ? '✓' : '✗'} One lowercase letter</p>
                    <p>{hasNumber ? '✓' : '✗'} One number</p>
                </div>
                <button type = "submit" disabled = {loading}>
                    {loading?'Creating...' : 'Create Account'}
                </button>
            </form>
            <p>Already have an account? <Link to ='/login'>Login</Link></p>
        </div>
    )
}

export default Register