<template>
  <div id="app">
    <FormA/>
    <FormB/>
  </div>
  <div v-if="store.lastResponse">
    <p>Последняя отправленная форма: {{ store.lastResponse?.url }}</p>
    <p>Классификатор: {{ store.lastResponse?.classifier }}</p>
    <p>Номер заявки: {{ store.lastResponse?.applicationNumber }}</p>
    <p>Данные формы: {{ store.lastResponse?.data }}</p>
  </div>
  <div v-if="store.error">
    <p>Ошибка: {{ store.error }}</p>
  </div>
</template>

<script setup lang="ts">
  import FormA from '@/components/FormA.vue';
  import FormB from '@/components/FormB.vue';
  import { useFormStore } from '@/stores/formStore';

  const store = useFormStore();
</script>

