import { useNavigate } from 'react-router-dom'
import { registerUserWithEmailPassword } from '../firebase/providers'
import { useDispatch } from 'react-redux'
import { login, checkingCredentials } from '../store/authSlice'

import { Box, TextField, Button, Typography } from '@mui/material'
import AuthLayout from '../components/AuthLayout'
import { useForm } from '../hooks/useForm'
import { useState } from 'react'

const formValidations = {
  email: {
    fn: (value) => value.includes('@'),
    errorMessage: 'El email debe contener un @'
  },
  password: {
    fn: (value) => value.length >= 6,
    errorMessage: 'La contraseña debe tener al menos 6 caracteres'
  }
};



const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  const { email, password, onInputChange, isFormValid,
    emailValid, passwordValid
  } = useForm(
    {
      email: '',
      password: ''
    },
    formValidations
  )

  const onSubmit = async (event) => {
    event.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    console.log(email, password)
    dispatch(checkingCredentials())
    const result = await registerUserWithEmailPassword({ email, password })
    if (!result.ok) {
      setErrorMessage(result.errorMessage)
      return
    }
    dispatch(login(result))
    navigate('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AuthLayout title='Registro' subtitle='Crea una nueva cuenta'>
        {errorMessage && (
          <Typography variant='body2' color='error'>
            {errorMessage}
          </Typography>
        )}
        <Typography variant='notion' color='warning'> {isFormValid ? '' : 'El email o contraseña son incorrectos, revísalos'}</Typography>
        <Box component='form' onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label='Email'
            type='email'
            fullWidth
            value={email}
            name='email'
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText={emailValid}
          ></TextField>
          <TextField
            label='Password'
            type='Password'
            value={password}
            name='password'
            onChange={onInputChange}
            fullWidth
            error={!!passwordValid && formSubmitted}
            helperText={passwordValid}
          ></TextField>
          <Button type='submit' variant='contained' fullWidth>Registrarme</Button>



        </Box>
      </AuthLayout>
    </Box>

  )
}

export default SignUp