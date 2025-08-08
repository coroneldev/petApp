
import axios from 'axios';

// Si estás en un entorno local
// const API_URL = "http://192.168.1.100/api";  // Cambia a la IP de tu servidor

// Si estás usando un entorno de producción
const API_URL = "http://localhost:8000/api";  // Reemplaza con tu IP pública o dominio

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

export default http;
