<template>
  <form @submit.prevent="handleSubmit" class="base-form">
    <slot></slot>
    <div class="form-actions">
      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
    interface Props {
        isSubmitting?: boolean
    }

    defineProps<Props>()

    const emit = defineEmits<{
        submit: []
    }>()

    const handleSubmit = () => {
        emit('submit')
    }
</script> 