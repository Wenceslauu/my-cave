import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ServerMessageContext } from '../contexts/ServerMessageContext'

import { signup } from '../services/UserServices'

import Input from '../components/Input'

import snakeToString from '../utils/snakeToString'
import isVowel from '../utils/isVowel'

function SignUp() {
    const [accountData, setAccountData] = useState({
        first_name: '',
        last_name: '',
        age: '',
        username: '',
        password: '',
        confirm_password: ''
    })
    const [clientErrors, setClientErrors] = useState({})
    
    const { setServerErrors, setShowServerErrors, setServerSuccesses, setShowServerSuccesses } = useContext(ServerMessageContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        setAccountData((prevAccData) => {
            return {
                ...prevAccData,
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
            const data = await signup(accountData)

            setServerSuccesses([data.success])
            setShowServerSuccesses(true)

            navigate('/login')
        } catch(error) {
            setServerErrors(error.response.data.errors)
            setShowServerErrors(true)
        }
    }
    
    // change to accomodate more errors
    function showClientError(field) {
        const name = field.name
        if (field.validity.valueMissing) {
            const normalized = snakeToString(name)
            setClientErrors((prevClientErrors) => {
                return {
                    ...prevClientErrors,
                    [name]: `Please enter a${(isVowel(normalized[0])) ? 'n' : ''} ${normalized}`
                }
            })
        } else if (field.validity.tooShort) {
            setClientErrors((prevClientErrors) => {
                return {
                    ...prevClientErrors,
                    [name]: `Passwords should be at least ${field.minLength} characters`
                }
            })
        } else if (field.validity.rangeUnderflow) {
            setClientErrors((prevClientErrors) => {
                return {
                    ...prevClientErrors,
                    [name]: `The minimun age required is ${field.min} years old`
                }
            })
        } else if (field.validity.patternMismatch) {
            setClientErrors((prevClientErrors) => {
                return {
                    ...prevClientErrors,
                    [name]: `Passwords should match`
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
                        field="first_name"
                        label="First name"
                        value={accountData.first_name}
                        onChange={handleChange}
                        placeholder="Carlos"
                        error={clientErrors.first_name}
                        required
                    />
                    <Input
                        type="text"
                        field="last_name"
                        label="Last name"
                        value={accountData.last_name}
                        onChange={handleChange}
                        placeholder="Alberto"
                        error={clientErrors.last_name}
                        required
                    />
                    <Input
                        type="number"
                        field="age"
                        label="Age"
                        value={accountData.age}
                        onChange={handleChange}
                        placeholder="12"
                        error={clientErrors.age}
                        min="12"
                        required
                    />
                    <Input
                        type="text"
                        field="username"
                        label="Username"
                        value={accountData.username}
                        onChange={handleChange}
                        placeholder="mage_king99"
                        error={clientErrors.username}
                        required
                    />
                    <Input
                        type="password"
                        field="password"
                        label="Password"
                        value={accountData.password}
                        onChange={handleChange}
                        placeholder="********"
                        error={clientErrors.password}
                        minLength="8"
                        required
                    />
                    <Input
                        type="password"
                        field="confirm_password"
                        label="Confirm password"
                        value={accountData.confirm_password}
                        onChange={handleChange}
                        placeholder="********"
                        error={clientErrors.confirm_password}
                        pattern={accountData.password}
                        required
                    />
                    <button className={`btn btn-primary rounded-full
                    ${(Object.keys(clientErrors).length > 0 || accountData.first_name === '' || accountData.last_name === ''
                    || accountData.age === '' || accountData.username === '' || accountData.password === '' || accountData.confirm_password === '' ) ? 'btn-disabled' : null}`} type='submit'>
                        Signup
                    </button>
                </form>
            </div>
        </>
    )
}

export default SignUp