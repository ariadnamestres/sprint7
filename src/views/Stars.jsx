import { useEffect, useState, useContext } from 'react'
import { Box, Button, List, ListItem, ListItemText } from '@mui/material'
import assetsService from '../services/assets'
import ShipCard from '../components/ShipCard'
import { assetsContext } from '../context/assetsContext'
import InfiniteScroll from "react-infinite-scroll-component"

const Stars = () => {
  const { starships, setStarships, setSelectedStarship, selectedStarship, nextPage,setNextPage,hasMore,setHasMore } = useContext(assetsContext)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)
  const fetchStarShips = async () => {
    if (!nextPage){
      console.log("No hay más páginas de naves para cargar")
      return
    }
    try {
    console.log("Fetching las naves from:", nextPage)
    const response = await assetsService.getAssets(nextPage)
    console.log("API Response:", response);
    if (!response.results || !Array.isArray(response.results)) {
      throw new Error("Respuesta de la API inválida: 'results' no existe o no es un arreglo.");
    }
    setStarships((prevResults) => [...prevResults, ...response.results])
    setNextPage(response.next)
    if (!response.next) {
      setHasMore(false)

    }
  } catch (error) {
    console.error("Error al obtener las naves:", error);
    setError("Hubo un error al cargar las naves.");
  }
}

  useEffect(() => {
    if (starships.length === 0){
    fetchStarShips()
    }
  }, [starships.length])

  const handleClickOpen = (starship) => {
    setSelectedStarship(starship)
    console.log(starship)
    setOpen(true);
  }

  return (
    <Box minHeight={'100vh'}>

      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>

        <InfiniteScroll
          dataLength={starships.length}
          next={fetchStarShips}
          hasMore={hasMore}>
          <List >
            {starships.map((starship) => (

              <ListItem key={starship.name}>
                <ListItemText primary={starship.name} secondary={starship.model} />
                <Button onClick={() => { handleClickOpen(starship) }}>+ </Button>
              </ListItem>
             
            ))}
          </List>
        </InfiniteScroll>

        {open && (
          <ShipCard open={open} setOpen={setOpen}></ShipCard>

        )
        }

      </Box>

    </Box>
  )
}

export default Stars