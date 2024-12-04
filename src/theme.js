// src/theme.js
import { createTheme } from '@mui/material/styles';

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    mode: 'dark', // Cambia a 'dark' para modo oscuro
    // primary: {
    //   main: '#1976d2', // Color principal
    // },
    // secondary: {
    //   main: '#dc004e', // Color secundario
    // },
    // background: {
    //   default: '#f5f5f5', // Color de fondo predeterminado

    // },
    
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
   
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
   
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: '200px',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
        },
        containedPrimary: {
          backgroundColor: '#000000',
          color: '#ffffff', // Letra blanca
          '&:hover': {
           transform: 'scale(1.05)'
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor : '#ffffff',
          color: '#000000',
          borderRadius: 2,
          borderColor: 'black',
          '& .MuiInputBase-input': {
            color: '#000000', // Letra negra
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#000000', // Borde negro
            },
            '&:hover fieldset': {
              borderColor: '#000000', // Borde negro al hacer hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#000000', // Borde negro al hacer click
            },
          },
          '& .MuiInputLabel-root': {
            color: '#000000', // Etiqueta negra
            '&.Mui-focused': {
              color: '#000000', // Etiqueta negra al hacer click
            },
          },
        }
      }
    }
    
  },
});

export default theme;
