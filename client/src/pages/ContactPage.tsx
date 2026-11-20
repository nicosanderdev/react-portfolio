import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import contactService, { ContactForm } from '../services/ContactService';
import { useTranslation } from 'react-i18next';
import './ContactPage.css';

const initialFormData = {
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
};

const RESULT_EXIT_MS = 650;

const ContactPage = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(initialFormData);
  const [leaving, setLeaving] = useState(false);
  const continueRef = useRef<HTMLButtonElement>(null);

  const mutation = useMutation<void, Error, ContactForm>({
    mutationFn: (data: ContactForm) => contactService.sendContactForm(data),
    onError: (error: Error) => {
      console.error("Submission failed:", error.message);
    },
  });
  const mutationRef = useRef(mutation);
  mutationRef.current = mutation;

  const resultOpen = mutation.isSuccess || mutation.isError;

  useEffect(() => {
    if (!resultOpen) return;
    const focusTimer = window.setTimeout(() => {
      continueRef.current?.focus();
    }, 500);
    return () => window.clearTimeout(focusTimer);
  }, [resultOpen]);

  useEffect(() => {
    if (!leaving) return;
    const succeeded = mutationRef.current.isSuccess;
    const exitTimer = window.setTimeout(() => {
      if (succeeded) setFormData(initialFormData);
      mutationRef.current.reset();
      setLeaving(false);
    }, RESULT_EXIT_MS);
    return () => window.clearTimeout(exitTimer);
  }, [leaving]);

  const handleContinue = () => {
    if (leaving) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (mutation.isSuccess) setFormData(initialFormData);
      mutation.reset();
      return;
    }
    setLeaving(true);
  };

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
      <div className="contact-form-shell w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="w-full border border-emerald-400 p-6 rounded">

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
      </form>

      {resultOpen && (
        <div
          className={`contact-result${mutation.isSuccess ? ' is-success' : ' is-error'}${leaving ? ' is-leaving' : ''}`}
          role="status"
        >
          <div className="contact-result-card">
            <div className="contact-result-flag">
              <span aria-hidden="true">[!]</span>
              <span>
                {mutation.isSuccess
                  ? t('contact.result_success_label')
                  : t('contact.result_error_label')}
              </span>
            </div>
            <p className="contact-result-title">
              {mutation.isSuccess
                ? t('contact.result_success_message')
                : mutation.error?.message || t('contact.result_error_generic')}
            </p>
            <button
              ref={continueRef}
              type="button"
              className="contact-result-continue"
              onClick={handleContinue}
            >
              <span aria-hidden="true">&gt;</span>
              <span>{t('contact.result_continue')}</span>
              <span className="contact-result-caret" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ContactPage;