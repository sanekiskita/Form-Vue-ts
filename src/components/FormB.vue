<template>
  <div class="form">
    <h1>Форма Б</h1>
    <BaseForm :is-submitting="isSubmitting" @submit="handleSubmit">
      <div class="form-field">
        <label for="firstName">Имя</label>
        <input
          id="firstName"
          v-model="formData.firstName"
          type="text"
          :class="{ error: errors.firstName }"
          @blur="validateFirstName"
        />
        <span
          v-if="errors.firstName"
          class="error-message"
        >
          {{ errors.firstName }}
        </span>
      </div>

      <div class="form-field">
        <label for="lastName">Фамилия</label>
        <input
          id="lastName"
          v-model="formData.lastName"
          type="text"
          :class="{ error: errors.lastName }"
          @blur="validateLastName"
        />
        <span
          v-if="errors.lastName"
          class="error-message"
        >
          {{ errors.lastName }}
        </span>
      </div>

      <div class="form-field">
        <label for="middleName">Отчество</label>
        <input
          id="middleName"
          v-model="formData.middleName"
          type="text"
          :class="{ error: errors.middleName }"
          @blur="validateMiddleName"
        />
        <span
          v-if="errors.middleName"
          class="error-message"
        >
          {{ errors.middleName }}
        </span>
      </div>

      <div class="form-field">
        <label for="birthDate">Дата рождения</label>
        <input
          id="birthDate"
          v-model="formData.birthDate"
          type="date"
          :class="{ error: errors.birthDate }"
          @blur="validateBirthDate"
        />
        <span
          v-if="errors.birthDate"
          class="error-message"
        >
          {{ errors.birthDate }}
        </span>
      </div>

      <div class="form-field">
        <label for="login">Логин</label>
        <input
          id="login"
          v-model="formData.login"
          type="text"
          :class="{ error: errors.login }"
          @blur="validateLogin"
        />
        <span
          v-if="errors.login"
          class="error-message"
        >
          {{ errors.login }}
        </span>
      </div>

      <div class="form-field">
        <label for="email">Email *</label>
        <input
          id="email"
          v-model="formData.email"
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
        <label for="phone">Телефон *</label>
        <input
          id="phone"
          type="tel"
          placeholder="+7 (999) 999-99-99"
          :class="{ error: errors.phone }"
          :value="formData.phone"
          @blur="validatePhone"
          @input="formData.phone = formatPhone(($event.target as HTMLInputElement)?.value || '')"
        />
        <span
          v-if="errors.phone"
          class="error-message"
        >
          {{ errors.phone }}
        </span>
      </div>
    </BaseForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseForm from './BaseForm.vue';
import { submitForm } from '@/services/api';
import { validateRequired, validateEmail as validateEmailUtil, validatePhoneUtil } from '@/utils/validation';

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return '';
  if (digits.length <= 1) return `+${digits.slice(0, 1)} (${digits.slice(1)}`;
  if (digits.length <= 4) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}`;
  if (digits.length <= 7) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}`;
  if (digits.length <= 9) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}`;
  return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
};

const isSubmitting = ref(false);
const formData = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  birthDate: '',
  login: '',
  email: '',
  phone: '',
});

const errors = ref({
  firstName: '',
  lastName: '',
  middleName: '',
  birthDate: '',
  login: '',
  email: '',
  phone: '',
});

const validateFirstName = () => {
  errors.value.firstName = '';
};

const validateLastName = () => {
  errors.value.lastName = '';
};

const validateMiddleName = () => {
  errors.value.middleName = '';
};

const validateBirthDate = () => {
  errors.value.birthDate = '';
};

const validateLogin = () => {
  errors.value.login = '';
};

const validateEmail = () => {
  if (!validateRequired(formData.value.email)) {
    errors.value.email = 'Email обязателен для заполнения';
  } else if (!validateEmailUtil(formData.value.email)) {
    errors.value.email = 'Введите корректный email';
  } else {
    errors.value.email = '';
  }
};

const validatePhone = () => {
  if (formData.value.phone && !validatePhoneUtil(formData.value.phone)) {
    errors.value.phone = 'Введите корректный телефон';
  } else {
    errors.value.phone = '';
  }
};

const validateForm = () => {
  validateFirstName();
  validateLastName();
  validateMiddleName();
  validateBirthDate();
  validateLogin();
  validateEmail();
  validatePhone();
  
  return !errors.value.firstName && !errors.value.lastName && !errors.value.middleName
    && !errors.value.birthDate && !errors.value.login && !errors.value.email && !errors.value.phone;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  
  try {
    await submitForm({
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      middleName: formData.value.middleName,
      birthDate: formData.value.birthDate,
      login: formData.value.login,
      email: formData.value.email,
      phone: formData.value.phone,
    }, 'form/b');
  } finally {
    isSubmitting.value = false;
  }
};
</script> 