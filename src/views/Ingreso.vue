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

    <ion-footer>
      <ion-toolbar style="background-color: #003366; padding: 10px;">
        <div style="text-align: center;">
          <div style="color: #888; font-size: 0.9rem;">
            © 2025 Cris. Todos los derechos reservados.
          </div>
          <div style="color: #ffcc00; font-weight: bold; font-size: 1rem; margin-top: 4px;">
            Escuela Militar de Ingeniería EMI
          </div>
        </div>
      </ion-toolbar>
    </ion-footer>


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

/* Watermark de mascota (imagen en background) */
.contenedor-centro::before {
  content: '';
  position: absolute;
  top: 15%;
  left: 50%;
  width: 150px;
  /* Ajusta tamaño */
  height: 150px;
  /* Ajusta tamaño */
  background-image: url('https://cdn-icons-png.flaticon.com/512/616/616408.png');
  /* Ejemplo imagen de mascota */
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.07;
  /* Baja opacidad para no molestar */
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

/* Ajustar ion-input para que texto no se solape con label flotante */
ion-input {
  --padding-top: 1.8rem;
  /* Empuja el texto hacia abajo para no superponerse */
  --padding-bottom: 0.5rem;
}

/* Ajustar ion-label floating */
ion-label[position="floating"] {
  font-weight: 600;
  font-size: 0.95rem;
  color: #2e7d32;
  z-index: 2;
  /* Asegurar que esté por encima del input */
}
</style>
