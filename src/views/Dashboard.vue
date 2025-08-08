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
          <ion-card-title>Nombre: Rocky</ion-card-title>
          <ion-card-subtitle>Edad: 2 años</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p><strong>Raza:</strong> Labrador</p>
          <p><strong>Sexo:</strong> Macho</p>
          <p><strong>Color:</strong> Dorado</p>
          <ion-img class="ion-margin-top" :src="imageUrl" alt="Imagen de mascota" />
        </ion-card-content>
      </ion-card>

      <!-- Información del responsable -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Responsable</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p><strong>Nombre:</strong> {{ responsable.nombre }}</p>
          <p><strong>Teléfono:</strong> {{ responsable.telefono }}</p>
          <p><strong>Dirección:</strong> {{ responsable.direccion }}</p>
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
    </ion-content>
  </ion-page>
</template>

<script setup>

import { useStore } from 'vuex' // Importar el store de Vuex
import { onMounted, ref } from 'vue'  // Importar onMounted y ref


//const mascota = ref(null);  // Definir la variable reactiva 'mascota'

import MascotaService from '@/services/MascotaService' // Importamos el servicio MascotaService

const store = useStore()  // Usamos el store de Vuex
const codigo_masc = store.getters.getCodigo  // Accedemos al código guardado en Vuex
// Imprimir el valor del código en la consola
console.log('Código recuperado desde Vuex:', codigo_masc)

const codigo_cop = codigo_masc
console.log(codigo_cop)

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

// Imagen de mascota
const imageUrl = 'https://cdn-icons-png.flaticon.com/512/616/616408.png'

// Vacunas
const vacunas = [
  { nombre: 'Antirrábica', fecha: '2025-04-10' },
  { nombre: 'Parvovirus', fecha: '2025-05-01' },
  { nombre: 'Triple', fecha: '2025-06-15' },
]


// Usamos el código de Vuex para hacer la petición al servicio

//const response = await MascotaService.getByCodigo(codigo_masc)
//console.log('Información de la mascota:', response)


// Responsable
const responsable = {
  nombre: 'Juan Pérez',
  telefono: '+591 71234567',
  direccion: 'Av. Siempre Viva 123'
}

// Convertir imagen a base64
function getImageBase64(url) {
  return new Promise((resolve) => {
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
    img.src = url
  })
}



// Generar PDF tipo carnet
async function generarPdf() {
  const doc = new jsPDF()
  const imgData = await getImageBase64(imageUrl)

  doc.setFontSize(18)
  doc.text('Carnet de Vacunación de Mascota', 55, 15)

  // Imagen mascota
  doc.addImage(imgData, 'PNG', 15, 25, 40, 40)

  // Información de la mascota
  doc.setFontSize(12)
  doc.text('Información de la Mascota:', 60, 30)
  doc.setFontSize(10)
  doc.text('Nombre: Rocky', 60, 38)
  doc.text('Edad: 2 años', 60, 44)
  doc.text('Raza: Labrador', 60, 50)
  doc.text('Sexo: Macho', 60, 56)
  doc.text('Color: Dorado', 60, 62)

  // Responsable
  doc.setFontSize(12)
  doc.text('Responsable:', 15, 75)
  doc.setFontSize(10)
  doc.text(`Nombre: ${responsable.nombre}`, 15, 82)
  doc.text(`Teléfono: ${responsable.telefono}`, 15, 88)
  doc.text(`Dirección: ${responsable.direccion}`, 15, 94)

  // Tabla de vacunas
  doc.setFontSize(12)
  doc.text('Historial de Vacunas:', 15, 110)
  autoTable(doc, {
    startY: 115,
    head: [['Vacuna', 'Fecha']],
    body: vacunas.map(v => [v.nombre, v.fecha]),
    styles: { halign: 'center' },
    headStyles: { fillColor: [40, 167, 69] }, // Verde
  })

  doc.save('carnet_mascota.pdf')
}
</script>

<style scoped>
ion-img {
  max-width: 150px;
  margin: 0 auto;
}
</style>
