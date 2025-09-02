import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import contactService, { ContactForm } from '../services/ContactService';
import { useTranslation } from 'react-i18next';

const initialFormData = {
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
};

const ContactPage = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(initialFormData);

  const mutation = useMutation<void, Error, ContactForm>({
    mutationFn: async (data: ContactForm): Promise<void> => {
      contactService.sendContactForm(data)
    },
    onSuccess: () => {
      console.log("Message sent successfully!");
      setFormData(initialFormData);
    },
    onError: (error: Error) => {
      console.error("Submission failed:", error.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const formattedMessage = `
      Message: ${formData.mensaje}
      ---
      Phone (optional): ${formData.telefono || 'Not provided'}
    `;

    const payload = {
      name: formData.nombre,
      email: formData.email,
      message: formattedMessage,
    };
    
    mutation.mutate(payload);
  };

  return (
    <div className="font-mono flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl border border-emerald-400 p-6 rounded">

        {/* Name Input */}
        <label className="block mb-4">
          <span className="text-gray-200">{t('contact.name_label')}:</span>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-transparent border border-emerald-400 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
            placeholder={t('contact.name_placeholder')}
            required
          />
        </label>
        
        {/* Email Input */}
        <label className="block mb-4">
          <span className="text-gray-200">{t('contact.email_label')}:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-transparent border border-emerald-400 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
            placeholder={t('contact.email_placeholder')}
            required
          />
        </label>

        {/* Phone Input */}
        <label className="block mb-4">
          <span className="text-gray-200">{t('contact.phone_label')}:</span>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-transparent border border-emerald-400 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
            placeholder={t('contact.phone_placeholder')}
          />
        </label>

        {/* Message Textarea */}
        <label className="block mb-6">
          <span className="text-gray-200">{t('contact.message_label')}:</span>
          <textarea
            name="mensaje"
            rows={5}
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-transparent border border-emerald-400 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
            placeholder={t('contact.message_placeholder')}
            required
          />
        </label>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full !bg-emerald-400 py-3 px-6 !rounded-sm text-gray-900 text-xl !font-bold hover:bg-emerald-300 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? t('contact.sending_text') : t('contact.send')}
        </button>

        {/* Status Messages */}
        {mutation.isSuccess && (
          <p className="mt-4 text-center text-emerald-400">{t('contact.success_message')}</p>
        )}
        {mutation.isError && (
          <p className="mt-4 text-center text-red-500">
            {mutation.error?.message || t('contact.error_generic')}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactPage;