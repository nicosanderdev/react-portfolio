import { supabase } from './SupabaseClient';

export interface ContactForm {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

/** Long enough for the sending state to be visible while testing the form animation. */
const DEV_SEND_DELAY_MS = 800;

// In development, resolve locally so the form animation can be tested
// without writing to the database or sending email. Production builds
// (including `vite preview`) still call the contact-form Edge Function.
const sendContactForm = async (params: ContactForm): Promise<void> => {
  if (import.meta.env.DEV) {
    console.info('[contact] development: message not sent', params);
    await new Promise((resolve) => setTimeout(resolve, DEV_SEND_DELAY_MS));
    return;
  }

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