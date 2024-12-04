
import { Provider } from 'react-redux'
import {store} from './store/store'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NavBar from './components/NavBar.jsx'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
  {/* <StrictMode> */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <NavBar/>
    <App />
    </ThemeProvider>
  {/* </StrictMode>, */}
  </BrowserRouter>
  </Provider>
)
