import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, //permet d'envoyer les cookies systématiquement
})

export default instance
