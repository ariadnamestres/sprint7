import { useNavigate } from 'react-router-dom'
import {Button, Card, CardContent, Typography, Dialog}from '@mui/material'
import { useContext } from 'react'
import { assetsContext}  from '../context/assetsContext'


const ShipCard = ({ open, setOpen}) => {
  const navigate = useNavigate()
  const { selectedStarship, setSelectedStarship} = useContext(assetsContext)
  const handleClose = () => {
    setOpen(false)
  }
   const MoreInformation = () => {
    navigate('/ShipInformation')
   }

  return(
    <Dialog
    open={open}
    onClose= {handleClose}
   >
    <Card  sx={{borderRadius:2 ,borderLeft: '1px solid red'}}>
      
      <CardContent>
      
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {selectedStarship.name}
        </Typography>

        <Typography>model: {selectedStarship.model}</Typography>
        <Typography> cost:  {selectedStarship.cost_in_credits} </Typography>
        <Typography> atmosphering speed:{selectedStarship.max_atmosphering_speed}</Typography>
        <Typography> manufacturer :{selectedStarship.manufacturer} </Typography>
        <Typography> length: {selectedStarship.length}</Typography>
        <Typography> crew: {selectedStarship.crew} </Typography>
        <Button onClick={ MoreInformation}> + </Button>
      </CardContent>
    </Card>
    </Dialog>
  )
}

export default ShipCard