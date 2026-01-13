import { supabase } from './SupabaseClient';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

// Call Supabase Edge Function instead of Express API
const sendContactForm = async (params: ContactForm): Promise<void> => {
  try {
    const { data, error } = await supabase.functions.invoke('contact-form', {
      body: params
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || 'Failed to send contact form');
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    console.log('Contact form submitted successfully:', data);
  } catch (error: any) {
    console.error('Error sending contact form:', error);
    throw error;
  }
};

const contactService = {
  sendContactForm
};

export default contactService;