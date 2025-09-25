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
          <ion-img class="ion-margin-top" :src="imageUrl" alt="Imagen de mascota" />
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
              <ion-col><strong>Fecha</strong></ion-col>
            </ion-row>

            <ion-row v-for="(vacuna, index) in vacunas" :key="index" class="ion-text-center">
              <ion-col>{{ vacuna.nombre }}</ion-col>
              <ion-col>{{ vacuna.fecha }}</ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <!-- Botón para generar PDF tipo carnet -->
      <ion-button expand="block" color="tertiary" @click="generarPdf">
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

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Reactive variables
const mascota = ref(null)
const responsable = ref(null)

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

// Vacunas de ejemplo
const vacunas = [
  { nombre: 'Antirrábica', fecha: '2025-04-10' },
  { nombre: 'Parvovirus', fecha: '2025-05-01' },
  { nombre: 'Triple', fecha: '2025-06-15' },
]

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

    imageUrl.value = mascotaResp?.foto
      ? `${import.meta.env.VITE_API_URL}/${mascotaResp.foto}`
      : defaultImage

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

// Generar PDF tipo carnet
async function generarPdf() {
  const doc = new jsPDF()
  const imgData = await getImageBase64(imageUrl.value)

  doc.setFontSize(18)
  doc.text('Carnet de Vacunación de Mascota', 55, 15)

  if (imgData) doc.addImage(imgData, 'PNG', 15, 25, 40, 40)

  doc.setFontSize(12)
  doc.text('Información de la Mascota:', 60, 30)
  doc.setFontSize(10)
  doc.text(`Nombre: ${mascota.value?.nombre || 'N/A'}`, 60, 38)
  doc.text(`Edad: ${mascota.value?.edad || 'N/A'} años`, 60, 44)
  doc.text(`Raza: ${mascota.value?.raza || 'N/A'}`, 60, 50)
  doc.text(`Sexo: ${mascota.value?.sexo || 'N/A'}`, 60, 56)
  doc.text(`Especie: ${mascota.value?.especie || 'N/A'}`, 60, 62)

  doc.setFontSize(12)
  doc.text('Responsable:', 15, 75)
  doc.setFontSize(10)
  doc.text(`Nombre: ${responsable.value?.nombre || 'N/A'}`, 15, 82)
  doc.text(`Teléfono: ${responsable.value?.telefono || 'N/A'}`, 15, 88)
  doc.text(`Dirección: ${responsable.value?.direccion || 'N/A'}`, 15, 94)

  doc.setFontSize(12)
  doc.text('Historial de Vacunas:', 15, 110)
  autoTable(doc, {
    startY: 115,
    head: [['Vacuna', 'Fecha']],
    body: vacunas.map(v => [v.nombre, v.fecha]),
    styles: { halign: 'center' },
    headStyles: { fillColor: [40, 167, 69] },
  })

  doc.save('carnet_mascota.pdf')
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
