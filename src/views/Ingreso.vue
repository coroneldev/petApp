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
</style>
