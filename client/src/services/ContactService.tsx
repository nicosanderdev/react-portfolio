import apiClient from './AxiosClient';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const ENDPOINTS = {
  CONTACT: '/contact',
};

//const sendContactForm = async (params: ContactForm): Promise<void> => {
const sendContactForm = async (params: ContactForm): Promise<void> => {
  try {
    await apiClient.post<ContactForm>(ENDPOINTS.CONTACT, params);
  } catch (error: any) {
    console.error('Error fetching messages:', error.response?.data?.message || error.message);
    throw error;
  }
};

const contactService = {
  sendContactForm
};

export default contactService;