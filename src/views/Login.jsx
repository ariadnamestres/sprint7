import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login as loginAction, logout, checkingCredentials } from '../store/authSlice'
import { Box, TextField, Button, Typography} from '@mui/material'
import AuthLayout from '../components/AuthLayout'
import { useForm}  from '../hooks/useForm';
import  {loginUser} from '../firebase/providers'


  
const Login = () => {
const navigate = useNavigate()
  const dispatch = useDispatch()
  const {status} = useSelector((state) => state.auth)
  const [loginSubmitted, setLoginSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const {email, password, onInputChange} = useForm({
    email: '',
    password: '' ,
  })
 
  const isAuthenticating = useMemo ( () => status === 'checking', [status])


  const onSubmit = async (event) => {
    event.preventDefault()
    setLoginSubmitted(true)
    setErrorMessage('')
    console.log( password, email)
    dispatch(checkingCredentials())
    try {
      const response = await loginUser(email, password)
      if(!response.ok){
        dispatch(logout({errorMessage: response.errorMessage}))
        setErrorMessage(response.errorMessage)
        return
      }
      dispatch(loginAction(response))
      navigate('/stars')
    } catch(error) {
      dispatch(logout({ errorMessage: error.message }))
      setErrorMessage(error.message)
    }
    
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
      <AuthLayout title='Login' subtitle='Please enter your credentials'>
      {errorMessage && (
          <Typography variant='body2' color='error'>
            {errorMessage}
          </Typography>
        )}
      
        <Box component='form' onSubmit ={onSubmit}sx={{display:'flex', flexDirection:'column', gap: 2}}>
          <TextField
          label='Email'
          type='email'
          name= 'email'
          fullWidth
          value= {email}
          onChange={onInputChange}
          ></TextField>
          <TextField
          label='Password'
          type='password'
          fullWidth
          name= 'password'
          value = {password}
          onChange= {onInputChange}
          ></TextField>
          <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>Log in</Button>
        
          

        </Box>
      </AuthLayout>
    </Box>

  )
}

export default Login 