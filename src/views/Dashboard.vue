<template>
  <ion-page>

    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-title>Información de la Mascota</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <!-- Información básica -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Nombre: {{ mascota?.nombre || 'Cargando...' }}</ion-card-title>
          <ion-card-subtitle>Edad: {{ mascota?.edad || 'Cargando...' }} años</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p><strong>Raza:</strong> {{ mascota?.raza || 'Cargando...' }}</p>
          <p><strong>Sexo:</strong> {{ mascota?.sexo || 'Cargando...' }}</p>
          <p><strong>Especie:</strong> {{ mascota?.especie || 'Cargando...' }}</p>
          <!--<ion-img class="ion-margin-top" :src="imageUrl" alt="Imagen de mascota" />-->
          <!--Reemplazar ion-img por img normal -->
          <img :src="imageUrl" alt="Imagen de mascota" style="max-width: 150px; display: block; margin: 0 auto;" />
        </ion-card-content>
      </ion-card>

      <!-- Información del responsable -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Responsable</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p><strong>Nombre:</strong> {{ responsable?.nombre || 'Cargando...' }}</p>
          <p><strong>Teléfono:</strong> {{ responsable?.telefono || 'Cargando...' }}</p>
          <p><strong>Dirección:</strong> {{ responsable?.direccion || 'Cargando...' }}</p>
        </ion-card-content>
      </ion-card>

      <!-- Historial de vacunas -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Historial de Vacunas</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row class="ion-text-center" color="light">
              <ion-col><strong>Vacuna</strong></ion-col>
              <ion-col><strong>Fecha Aplicacion</strong></ion-col>
              <ion-col><strong>Proxima Aplicacion</strong></ion-col>
              <ion-col><strong>Veterinario</strong></ion-col>
              <ion-col><strong>Observacion</strong></ion-col>
            </ion-row>

            <ion-row v-for="(vacuna, index) in vacunas || []" :key="index" class="ion-text-center">

              <ion-col>{{ vacuna.vacuna_nombre }}</ion-col>
              <ion-col>{{ vacuna.fecha_aplicacion }}</ion-col>
              <ion-col>{{ vacuna.proxima_aplicacion }}</ion-col>
              <ion-col>{{ vacuna.usuario_nombre }}</ion-col>
              <ion-col>{{ vacuna.observaciones }}</ion-col>

            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-button expand="block" color="tertiary" @click="abrirPdf">
        Generar Carnet de Vacunas
      </ion-button>
      <!-- Botón para salir de la app -->
      <ion-button expand="block" color="danger" @click="salir" class="ion-margin-top">
        Salir de la App
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'


import MascotaService from '@/services/MascotaService'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonButton
} from '@ionic/vue'


// Reactive variables
const mascota = ref(null)
const responsable = ref(null)
const vacunas = ref([])

// Router y store
const store = useStore()
const router = useRouter()

// Leer código de localStorage si existe
let codigo_masc = store.getters.getCodigo
if (!codigo_masc) {
  codigo_masc = localStorage.getItem('codigo_masc') || ''
  store.commit('setCodigo', codigo_masc)
}
console.log('Código recuperado:', codigo_masc)

// Imagen por defecto
const defaultImage = 'https://cdn-icons-png.flaticon.com/512/616/616408.png'
const imageUrl = ref(defaultImage)


// Obtener datos al montar
onMounted(async () => {
  if (!codigo_masc) {
    alert('No se encontró el código de la mascota. Por favor inicia sesión.')
    router.push('/')
    return
  }

  try {
    const mascotaResp = await MascotaService.getByCodigo(codigo_masc)
    console.log('Información de la mascota:', mascotaResp)
    mascota.value = mascotaResp

    if (mascotaResp?.cliente) {
      responsable.value = mascotaResp.cliente
    }


   /* imageUrl.value = mascotaResp?.foto
      ? `http://localhost:8000/storage/${encodeURI(mascotaResp.foto)}`
      : defaultImage*/

      


    console.log('URL de la imagen:', imageUrl.value)

    console.log('API URL:', import.meta.env.VITE_API_URL)
    console.log('URL completa de la imagen:', imageUrl.value)


    // --- Aquí agregamos la llamada para ver las vacunas ---
    const vacunasResp = await MascotaService.getVacunasByCodigo(codigo_masc)
    console.log('Vacunas obtenidas del API:', vacunasResp)
    // Si quieres, puedes guardarlas en tu reactive variable:
    vacunas.value = vacunasResp || []


  } catch (error) {
    console.error('Error al obtener datos:', error)
    alert('No se pudo cargar la información de la mascota.')
  }
})

// Convertir imagen a base64
async function getImageBase64(url) {
  try {
    return await new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(this, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = () => resolve(null)
      img.src = url
    })
  } catch (e) {
    console.error('Error convert image to base64', e)
    return null
  }
}

// Nueva función: abrir PDF generado por el backend (DomPDF)
function abrirPdf() {
  if (!mascota.value?.codigo) {
    alert('No se encontró el código de la mascota')
    return
  }

  const base = import.meta.env.VITE_API_URL || ''
  const url = `http://localhost:8000/api/mascota/codigo/${mascota.value.codigo}/pdf`

  // Abrir en nueva pestaña (opción estándar)
  window.open(url, '_blank')

}

// Salir de la app
function salir() {
  router.push('/')
}
</script>

<style scoped>
ion-img {
  max-width: 150px;
  margin: 0 auto;
}
</style>