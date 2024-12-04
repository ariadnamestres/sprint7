import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { FirebaseAuth } from './firebase/firebase'
import { login, logout } from './store/authSlice'

import Stars from './views/Stars'
import Login from './views/Login'
import SignUp from './views/SignUp'
import { AssetsProvider } from './context/assetsProvider'
import PrivateRoute from './components/PrivateRoute'
import ShipInformation from './views/ShipInformation'


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        // Usuario autenticado
        dispatch(login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
        }));
      } else {
        // Usuario no autenticado
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <>
      <AssetsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="stars" element={
            <PrivateRoute>
              <Stars />
            </PrivateRoute>} />

          <Route path="ShipInformation" element={
              <ShipInformation />

            } />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </AssetsProvider>

    </>
  )
}

export default App
