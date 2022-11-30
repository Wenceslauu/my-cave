import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login } from '../services/UserServices'

import { ServerErrorContext } from '../contexts/ServerErrorContext'

import Input from '../components/Input'

import isVowel from '../utils/isVowel'

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [clientErrors, setClientErrors] = useState({})
    
    const { setServerErrors, setShowServerErrors } = useContext(ServerErrorContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setCredentials((prevCredentials) => {
            return {
                ...prevCredentials,
                [name]: value
            }
        })

        if (target.validity.valid)
            clearClientError(target)
        else 
            showClientError(target)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!e.target.checkValidity()) 
            return

        try {
            const data = await login(credentials)

            localStorage.setItem('user', data.token)
            navigate('/feed')
        } catch (error) {
            setCredentials({
                username: '',
                password: ''
            })

            setServerErrors([error.response.data.error])
            setShowServerErrors(true)
        }
    }

    function showClientError(field) {
        const name = field.name
        if (field.validity.valueMissing) {
            setClientErrors((prevClientErrors) => {
                return {
                    ...prevClientErrors,
                    [name]: `Please enter a${(isVowel(name[0])) ? 'n' : ''} ${name}`
                }
            })
        } else if (field.validity.tooShort) {
            setClientErrors((prevClientErrors) => {
                return {
                    ...prevClientErrors,
                    [name]: `Passwords should be at least ${field.minLength} characters`
                }
            })
        }
    }

    function clearClientError(field) {
        const name = field.name
        setClientErrors((prevClientErrors) => {
            const newClientErrors = { ...prevClientErrors }
            delete newClientErrors[name]

            return newClientErrors
        })
    }

    return (
        <>
            <div className='container mx-auto px-16 md:w-1/3 md:px-0'>
                    <form id='signup' onSubmit={handleSubmit} noValidate className='form-control gap-4'>
                    <Input
                        type="text"
                        field="username"
                        label="Username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="mage_king99"
                        error={clientErrors.username}
                        required
                    />
                    <Input
                        type="password"
                        field="password"
                        label="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="********"
                        error={clientErrors.password}
                        required
                        minLength="8"
                    />
                    <button className={`btn btn-primary rounded-full ${(Object.keys(clientErrors).length > 0 || credentials.username === '' || credentials.password === '') ? 'btn-disabled': null}`} type='submit'>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login