import { assetsContext } from './assetsContext'
import {useState} from 'react'


export const AssetsProvider = ({children}) => {
  const [starships, setStarships] = useState([])
  const [selectedStarship, setSelectedStarship] = useState(null)
  const [nextPage, setNextPage] = useState('https://swapi.dev/api/starships/')
  const [hasMore, setHasMore] = useState(true)

 
  return(
    <assetsContext.Provider value={{
      starships,
      setStarships,
      selectedStarship,
      setSelectedStarship,
      nextPage,
      setNextPage,
      hasMore, 
      setHasMore
      }}>
      {children}
    </assetsContext.Provider>
  )
}