import { useTranslation } from "react-i18next";

type DirectoryItem = {
  name: string;
  type: 'file' | 'folder';
  url?: string;
  children?: DirectoryItem[];
};

type DirectoryItemsProps = {
  items: DirectoryItem[];
  indent: number;
};

// --- MAIN COMPONENT ---
export default function DirectoryListing() {
  
  const {t} = useTranslation();
  const files: DirectoryItem[] = [
    {
      name: "resume.pdf",
      type: "file",
      url: "/resume.pdf",
    },
    {
      name: t('projects'),
      type: "folder",
      children: [
        {
          name: "sdi_react.md",
          type: "file",
          url: "https://github.com/nicosanderdev/sdi_react",
        },
        {
          name: "SDI_api",
          type: "file",
          url: "https://github.com/nicosanderdev/SDI_api",
        },
        {
          name: "SDI_api",
          type: "file",
          url: "https://github.com/nicosanderdev/AppElecciones",
        },
      ],
    },
    {
      name: "linked-in.sh",
      type: "file",
      url: "https://linkedin.com/in/nicolás-sander",
    },
  ];

  return (
    <div className="p-4 ms-4 rounded-md w-full mx-auto flex flex-col items-start">
      <p className="font-mono text-white mb-2 text-xl">/portfolio/{t('files')}/</p>
      <DirectoryItems items={files} indent={16} />
    </div>
  );
}


// --- RECURSIVE RENDERING COMPONENT ---
function DirectoryItems({ items, indent }: DirectoryItemsProps) {
  return (
    <ul>
      {items.map((item, index) => {
        // Determine if the link is external (opens in new tab) or a local file (for download).
        const isExternal = item.url?.startsWith('http');
        const isDownloadable = item.url?.endsWith('.pdf'); // Or any other file extension you want to be downloadable

        return (
          <li key={index} style={{ marginLeft: `${indent}px` }}>
            <div className="flex items-center gap-2">
              {/* --- Icon Rendering (No changes here) --- */}
              {item.type === "folder" ? (
                <svg className="w-6 h-6 text-emerald-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-emerald-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" />
                </svg>
              )}

              {/* --- Conditional Link/Text Rendering --- */}
              {item.type === 'file' && item.url ? (
                <a
                  href={item.url}
                  // Enhanced className string with transition'
                  download={isDownloadable ? item.name : undefined}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  <span className='text-xl text-white hover:text-emerald-400 hover:underline cursor-pointer transition-colors'>
                  {item.name}
                  </span>
                </a>
              ) : (
                <span className="text-xl text-white">{item.name}</span>
              )}
            </div>
            {/* --- Recursive call for children (No changes here) --- */}
            {item.type === "folder" && item.children && (
              <DirectoryItems items={item.children} indent={indent + 4} />
            )}
          </li>
        );
      })}
    </ul>
  );
}