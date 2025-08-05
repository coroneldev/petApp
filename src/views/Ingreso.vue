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

const codigo = ref('')
const router = useRouter()

const verificarCodigo = () => {
  if (!codigo.value.trim()) {
    alert('Por favor ingresa un código válido.')
    return
  }

  // 🚧 Simulación de validación de código
  // En el futuro aquí se consultará una API para verificar el código
  if (codigo.value === '1234ABC') {
    // ✅ Código válido, navegar a la pantalla de información
    router.push('/dashboard')
  } else {
    // ❌ Código inválido
    alert('Código incorrecto. Intenta nuevamente.')
  }
}
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
