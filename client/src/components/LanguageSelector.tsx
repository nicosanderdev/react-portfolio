import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'pt', name: 'Portuguese' }
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false); // Close dropdown after selection
  };
  
  // Find the full name of the current language
  const currentLanguage = languages.find(lng => lng.code === i18n.language);

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <div className="relative inline-block text-left my-2" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between !rounded-none w-full border !border-emerald-400 shadow-sm px-4 py-2 text-sm font-mono text-white !bg-transparent"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          {currentLanguage ? `[lang: ${currentLanguage.name}]` : 'Select Language'}
          
          {/* Chevron Icon */}
          <svg className={`-mr-1 ml-2 h-5 w-5 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Dropdown panel*/}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded shadow-lg bg-gray-900 ring-1 ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {languages.map((lng) => (
              <button
                key={lng.code}
                onClick={() => changeLanguage(lng.code)}
                className={`group font-mono w-full text-left px-4 py-2 text-sm !hover:border-none`}
                role="menuitem"
              >
                <span
                  className={` ${i18n.language === lng.code 
                    ? 'text-emerald-400 font-bold' 
                    : 'text-gray-200 group-hover:text-emerald-400'
                  }`}
                >{lng.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;