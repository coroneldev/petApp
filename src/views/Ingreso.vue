<template>
  <ion-page>

    <ion-header>
      <ion-toolbar class="custom-toolbar">
        <ion-title>Tu Mascota APP</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="contenedor-centro">
        <ion-card class="form-card">
          <ion-card-header>
            <ion-card-title class="titulo">Bienvenido</ion-card-title>
            <ion-card-subtitle class="subtitulo">Ingresa tu código único</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Código de Ingreso</ion-label>
              <ion-input v-model="codigo" type="text" />
            </ion-item>

            <ion-button expand="block" color="tertiary" class="ion-margin-top" @click="verificarCodigo">
              Ingresar
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Importar el router para navegar
import { useStore } from 'vuex' // Importar el store de Vuex
import MascotaService from '@/services/MascotaService' // Importamos el servicio MascotaService

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/vue'

const codigo = ref('')  // Variable reactiva para el código
const router = useRouter()
const store = useStore() // Accedemos al store de Vuex


const verificarCodigo = async () => {
  if (!codigo.value.trim()) {
    alert('Por favor ingresa un código válido.');
    return;
  }

  // Imprime el valor del código ingresado en la consola
  console.log('Código ingresado por el usuario:', codigo.value);

  try {
    const mascota = await MascotaService.getByCodigo(codigo.value.trim()); // Pasa el valor ingresado
      console.log("Mascota obtenida:", mascota); // Puedes ver los datos de la mascota aquí
      
      // Guardamos el código en Vuex
      store.dispatch('updateCodigo', codigo.value.trim())

      router.push('/dashboard'); 
  } catch (error) {
    console.error('Error al verificar el código:', error);
    alert('Hubo un problema al verificar el código. Intenta más tarde.');
  }

};
</script>

<style scoped>
/* Centrar verticalmente */
.contenedor-centro {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 1;
}

/* Watermark */
.contenedor-centro::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%232e7d32" stroke-width="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="10" width="24" height="44" rx="4" ry="4"/><path d="M20 18h-8v20"/><path d="M20 38h-8v12"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.1;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: -1;
}

/* Tarjeta estilo formulario */
.form-card {
  width: 100%;
  max-width: 400px;
  background-color: #fefefe;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Título principal */
.titulo {
  text-align: center;
  font-size: 1.6rem;
  color: #2e7d32;
}

/* Subtítulo */
.subtitulo {
  text-align: center;
  color: #666;
  font-size: 0.95rem;
}

/* Para que el ion-label floating no se superponga con el texto al escribir */
ion-input input {
  padding-top: 1.2rem !important; /* Empuja el texto un poco hacia abajo */
}

/* Ajustar ion-label floating */
ion-label[position="floating"] {
  font-weight: 600;
  font-size: 0.95rem;
  color: #2e7d32;
}
</style>
