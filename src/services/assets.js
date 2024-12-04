import axios from 'axios'

const baseUrl = "https://swapi.dev/api/starships/"

const getAssets = async (url = baseUrl) => {
  try{
  const response = await axios.get(url)
  return response.data
  } catch(error) {
    console.error("Ha habido un error al buscar las naves en la API", error)
    throw error
  }
  }


  const getPilot= async (url= baseUrl) =>{
    const response = await axios.get(url)
    return response.data 
  }

  const getFilm = async (url= baseUrl) => {
    const response = await axios.get(url)
    return response.data
  }

  
const baseImageUrl = "https://starwars-visualguide.com/assets/img";

const getStarshipImage = (id) => `${baseImageUrl}/starships/${id}.jpg`;
const getPilotImage = (id) => `${baseImageUrl}/characters/${id}.jpg`;
const getFilmImage = (id) => `${baseImageUrl}/films/${id}.jpg`;




export default {
  getAssets,
  getPilot,
  getFilm,
  getStarshipImage,
  getPilotImage,
  getFilmImage,
}