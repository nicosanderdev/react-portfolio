import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-900 font-mono flex items-center justify-center p-4">
      <form className="w-full max-w-2xl bg-gray-900 border border-emerald-400 p-6 rounded">
        <label className="block mb-4">
          <span className="text-gray-200 hidden sm:block">Nombre:</span>
          <input
            type="text"
            name="nombre"
            className="w-full mt-1 p-2 bg-gray-900 border border-emerald-400 text-gray-200 placeholder-gray-500 focus:outline-none"
            placeholder="Tu nombre"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-200 hidden sm:block">Correo electrónico:</span>
          <input
            type="email"
            name="email"
            className="w-full mt-1 p-2 bg-gray-900 border border-emerald-400 text-gray-200 placeholder-gray-500 focus:outline-none"
            placeholder="ejemplo@correo.com"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-200 hidden sm:block">Teléfono (opcional):</span>
          <input
            type="tel"
            name="telefono"
            className="w-full mt-1 p-2 bg-gray-900 border border-emerald-400 text-gray-200 placeholder-gray-500 focus:outline-none"
            placeholder="+52..."
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-200 hidden sm:block">Mensaje:</span>
          <textarea
            name="consulta"
            rows={5}
            className="w-full mt-1 p-2 bg-gray-900 border border-emerald-400 text-gray-200 placeholder-gray-500 focus:outline-none"
            placeholder="Escribe tu mensaje aquí..."
            required
          />
        </label>

        <a
          className="w-full bg-emerald-400 py-3 px-6 hover:bg-emerald-300 transition-colors group"
        >
            <span className='text-gray-900 text-xl font-bold group-hover:text-gray-800'>Enviar</span>
        </a>
      </form>
    </div>
  );
};

export default ContactPage;