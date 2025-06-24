<template>
  <div class="form">
    <h1>Форма А</h1>
    <BaseForm
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
    >
      <div class="form-field">
        <label for="name">Имя</label>
        <input
          id="name"
          v-model.trim="formData.name"
          type="text"
          :class="{ error: errors.name }"
          @blur="validateName"
        />
        <span
          v-if="errors.name"
          class="error-message"
        >
          {{ errors.name }}
        </span>
      </div>

      <div class="form-field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model.trim="formData.email"
          type="email"
          :class="{ error: errors.email }"
          @blur="validateEmail"
        />
        <span
          v-if="errors.email"
          class="error-message"
        >
          {{ errors.email }}
        </span>
      </div>

      <div class="form-field">
        <label for="inn">ИНН</label>
        <input
          id="inn"
          v-model="formData.inn"
          type="text"
          :class="{ error: errors.inn }"
          @blur="validateInn"
        />
        <span v-if="errors.inn" class="error-message">{{ errors.inn }}</span>
      </div>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseForm from './BaseForm.vue';
import { submitForm } from '@/services/api';
import { validateEmail as validateEmailUtil, validateInn as validateInnUtil } from '@/utils/validation';

const isSubmitting = ref(false);
const formData = ref({
  name: '',
  email: '',
  inn: '',
});

const errors = ref({
  name: '',
  email: '',
  inn: '',
});

const validateName = () => {
  errors.value.name = '';
};

const validateEmail = () => {
  if (formData.value.email && !validateEmailUtil(formData.value.email)) {
    errors.value.email = 'Введите корректный email';
  } else {
    errors.value.email = '';
  }
};

const validateInn = () => {
  if (formData.value.inn && !validateInnUtil(formData.value.inn)) {
    errors.value.inn = 'ИНН должен содержать 10 или 12 цифр'
  } else {
    errors.value.inn = ''
  }
};

const validateForm = () => {
  validateName();
  validateEmail();
  validateInn();
  
  return !errors.value.name && !errors.value.email && !errors.value.inn;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  
  try {
    await submitForm({
      name: formData.value.name,
      email: formData.value.email,
      inn: formData.value.inn,
    }, 'form/a');
  } finally {
    isSubmitting.value = false;
  }
};
</script> 