export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateInn = (inn: string): boolean => {
  const innRegex = /^\d{10}$|^\d{12}$/;
  return innRegex.test(inn);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validatePhoneUtil = (value: string): boolean => {
  const phoneRegex = /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/;
  return phoneRegex.test(value);
};