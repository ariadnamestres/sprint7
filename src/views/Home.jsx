

import { Typography, Box, Button} from '@mui/material'
import { Link} from 'react-router-dom'  

const Home = () => {
  return(
    <Box 
    sx ={{minHeight: '100vh',width: '100%', display: 'flex', alignItems:'center', alignContent:'center'}}>
      <Box sx={{display: 'flex', flexDirection: 'column',margin:'auto', alignItems:'center' }}>
      <Typography variant= 'h4'> Welcome Home </Typography>
      <Typography variant= 'h6'> Click the link below to discover Starwars</Typography>
      <Button to='/stars'component={Link}>Go to Starships</Button>
      </Box>

    </Box>
  )
}

export default Home 