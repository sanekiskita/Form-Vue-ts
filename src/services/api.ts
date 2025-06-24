import type { FormDataA, FormDataB } from '@/interface/form';
import type { FormResponseDefault } from '@/interface/response';
import { useFormStore } from '@/stores/formStore';

export const submitForm = async (data: FormDataA | FormDataB, url: string): Promise<void> => {
  const store = useFormStore();
  
  try {
    const response = await mockApiCall(url, data);
    store.setResponse(response);
  } catch (error) {
    store.setError(error instanceof Error ? error.message : 'Ошибка отправки формы');
  }
};

// Имитация API запроса
const mockApiCall = async (url: string, data: FormDataA | FormDataB): Promise<FormResponseDefault> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.4) {
        resolve({
          url,
          data,
          applicationNumber: `${Date.now()}`,
          classifier: `CLASS-${Math.floor(Math.random() * 1000)}`,
        });
      } else {
        reject(new Error('Ошибка сервера'));
      }
    }, 1000);
  });
};