import { defineStore } from 'pinia';
import type { FormResponseDefault } from '@/interface/response';


export const useFormStore = defineStore('form', {
  state: () => ({
    lastResponse: null as FormResponseDefault | null,
    error: null as string | null,
  }),
  
  actions: {
    setResponse(response: FormResponseDefault) {
      this.lastResponse = response;
      this.error = null;
    },
    
    setError(error: string) {
      this.error = error;
      this.lastResponse = null;
    },
    
    clearResponse() {
      this.lastResponse = null;
      this.error = null;
    }
  }
});