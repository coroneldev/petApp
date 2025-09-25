
import axios from 'axios';

// Leer la URL desde .env
// Por ejemplo en .env.local o .env.development tienes:
// VITE_API_URL=http://localhost:8000

//const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

// Si estás usando un entorno de producción
//local
const API_URL = "http://localhost:8000/api";  // Reemplaza con tu IP pública o dominio

//servidor Test
//const API_URL = "http://192.168.172.115:8000/api";  // Reemplaza con tu IP pública o dominio

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

export default http;
