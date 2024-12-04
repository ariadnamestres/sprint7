import { useSelector, useDispatch } from 'react-redux'
import { Typography, AppBar, Button, Toolbar ,IconButton} from '@mui/material'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {logoutFirebase} from '../firebase/providers';
import { logout as logoutAction } from '../store/authSlice';

const NavBar = () => {
  const dispatch = useDispatch();
  const { status, email } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    await logoutFirebase()
    dispatch(logoutAction())
  };
  return (

    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="div" sx={{ flexGrow: 2 }}>
          STARWARS
        </Typography>

        {status === 'authenticated' ? (
          <>
            <IconButton>
              <AccountCircleIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {email}
              </Typography>
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>

          </>
          ) :
          (
            <>
              <Button color="inherit" component={Link} to='/login'>Login</Button>
              <Button color="inherit" component={Link} to='/signup'>Sign Up</Button>
              </>
          )}
      
      </Toolbar>
      <Toolbar sx={{ display: 'flex', gap: 1, justifyContent: 'center', bgcolor: '#000000' }}>
        <Button color="inherit" sx={{ border: '1px solid #FFFFFF' }} component={Link} to='/stars'>Starships</Button>
        <Button color="inherit" sx={{ border: '1px solid #FFFFFF' }} component={Link} to='/'>Home</Button>
      </Toolbar>
    </AppBar>

  )

}
export default NavBar

