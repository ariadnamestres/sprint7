
// layout estandar para login, register, olvide mi contraseña...

import { Box, Typography } from "@mui/material"


const AuthLayout = ({ children, title = '', subtitle = '' }) => {
  return (
    <Box
     
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '75vh', padding: 3 }}
    >
      <Box
       
        xs={3}
        sx={{
          backgroundColor: '#EEEEEE',
          boxShadow: 1,
          padding: 3,
          borderRadius: 2,
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap:2,
          maxWidth: 'sm',
        }}
      >
        <Typography variant="h4" color='black'>
          {title}
        </Typography>

        <Typography variant="h6" color='black'>
          {subtitle}
        </Typography>
        {children}

      </Box>
    </Box>

  )

}

export default AuthLayout;