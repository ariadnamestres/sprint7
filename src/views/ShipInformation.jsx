
import { useContext, useEffect, useState } from 'react';
import { assetsContext } from '../context/assetsContext'
import assetsService from '../services/assets'
import getIdFromUrl from '../utils/utils'
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import { getId } from 'firebase/installations';


const ShipInformation = () => {
  const { selectedStarship, setSelectedStarship } = useContext(assetsContext)
  const [pilots, setPilots] = useState([])
  const [loadingPilots, setLoadingPilots] = useState(false)
  const [errorPilots, setErrorPilots] = useState(null)

  const [films, setFilms] = useState([])
  const [loadingFilms, setLoadingFilms] = useState(false)
  const [errorFilms, setErrorFilms] = useState(null)


  //PILOTS

  useEffect(() => {
    const fetchPilots = async () => {
      console.log(selectedStarship)
      if (selectedStarship && selectedStarship.pilots.length > 0) {
        setLoadingPilots(true)
        setErrorPilots(null)

        try {
          const pilotPromises = selectedStarship.pilots.map((url) => assetsService.getPilot(url))
          console.log(pilotPromises)
          const responses = await Promise.all(pilotPromises)
          console.log(responses)
          const pilotsData = responses.map((pilot) => pilot)
          console.log(pilotsData)
          setPilots(pilotsData)
          setLoadingPilots(false)
        } catch (error) {
          setErrorPilots(error)

        }

      }
    }
    fetchPilots()

  }, [selectedStarship])

  // FILMS

  useEffect(() => {
    const fetchFilms = async () => {
      if (selectedStarship && selectedStarship.films.length > 0) {
        setLoadingFilms(true)
        setErrorFilms(null)

        try {
          const filmsPromises = selectedStarship.films.map((url) => assetsService.getFilm(url))
          const responses = await Promise.all(filmsPromises)
          const filmsData = responses.map((film) => film)

          setFilms(filmsData)
          setLoadingFilms(false)
        } catch (error) {
          setErrorFilms(error)

        }

      }
    }
    fetchFilms()

  }, [selectedStarship])

  //naves obtener imagenes 
  const starshipId = selectedStarship ? getIdFromUrl(selectedStarship.url) : null
  const starshipImage = starshipId ? assetsService.getStarshipImage(starshipId) : ''







  return (
    <Box minHeight={'100vh'}>

      {/* starships information */}
      <Typography variant='h5' textAlign={'center'}>StarShip</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 5, margin: 5 }}>
        <Box>
          {starshipImage && (
            <img src={starshipImage} alt={selectedStarship.name} style={{ width: '200px', height: '200px' }} />
          )}
        </Box>

        <Box sx={{ borderRadius: 2, borderLeft: '2px solid red', p: 3 }}>

          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {selectedStarship.name}
          </Typography>
          <Typography>model: {selectedStarship.model}</Typography>
          <Typography> cost:  {selectedStarship.cost_in_credits} </Typography>
          <Typography> atmosphering speed:{selectedStarship.max_atmosphering_speed}</Typography>
          <Typography> manufacturer :{selectedStarship.manufacturer} </Typography>
          <Typography> length: {selectedStarship.length}</Typography>
          <Typography> crew: {selectedStarship.crew} </Typography>
        </Box>


      </Box>

      {/* starships pilot */}
      <Typography variant='h5' textAlign={'center'}>Pilot </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {loadingPilots && <Typography>Loading pilots...</Typography>}
        {errorPilots && <Typography>There was an error loading the pilots</Typography>}

        {selectedStarship.pilots.length === 0 &&
          (<Typography>No hay pilotos disponibles</Typography>)
        }


        <Box sx={{ display: 'flex', gap: 2 }}>
          {selectedStarship.pilots.length > 0 && (
            pilots.map((pilot) => {
              const pilotId = getIdFromUrl(pilot.url)
              const pilotImage = assetsService.getPilotImage(pilotId)

              return (

                <Card key={pilot.name} sx={{ width: 200, height: 300 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={pilotImage}
                    alt="pilots"
                    onError={(e) => { e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'; }}
                  ></CardMedia>
                  <CardContent>
                    <Typography variant="body" sx={{ color: 'text.secondary' }}>
                      {pilot.name}

                    </Typography>
                  </CardContent>

                </Card>
              )
            })
          )}

        </Box>

      </Box>

      {/* starships Films */}
      <Typography variant='h5' textAlign={'center'}>Films </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {loadingFilms && <Typography>Loading films...</Typography>}
          {errorFilms && <Typography>There was an error loading the films</Typography>}

          {selectedStarship.films.length === 0 &&
            (<Typography>No hay pelis disponibles</Typography>)
          }

          <Box sx={{ display: 'flex', gap: 2 }}>
            {selectedStarship.films.length > 0 && (
              films.map((film) => {
                const filmId = getIdFromUrl(film.url)
                const filmImage = assetsService.getFilmImage(filmId)
                
                return (
                <Card key={film.title} sx={{ width: 200, height: 300 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={filmImage}
                    alt="green iguana"
                  ></CardMedia>
                  <CardContent>
                    <Typography variant="body" sx={{ color: 'text.secondary' }}>
                      {film.title}

                    </Typography>
                  </CardContent>

                </Card>
              )})
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ShipInformation