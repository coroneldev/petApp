
import axios from 'axios';

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
