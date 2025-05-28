export default function DirectoryListing() {
  const files: DirectoryItem[] = [
  { name: "resume.pdf", type: "file" },
  {
    name: "projects",
    type: "folder",
    children: [
      { name: "project-alpha.md", type: "file" },
      { name: "project-beta.md", type: "file" },
    ],
  },
  { name: "linked-in.sh", type: "file" },
];

  return (
    <div className="bg-gray-900 p-4 ms-4 rounded-md w-full mx-auto flex flex-col items-start">
      <p className="font-mono text-white mb-2 text-xl">/portfolio/files/</p>
      <DirectoryItems items={files} indent={16} />
    </div>
  );
}

function DirectoryItems({ items, indent }: DirectoryItemsProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} style={{ marginLeft: `${indent}px` }}>
          <span className="flex items-center gap-2">
            {item.type === "folder" ? (
              <svg className="w-6 h-6 text-emerald-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-emerald-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                />
              </svg>
            )}
            <span className="text-xl hover:underline cursor-pointer">{item.name}</span>
          </span>
          {item.type === "folder" && (
            <DirectoryItems items={item.children || []} indent={indent + 4} />
          )}
        </li>
      ))}
    </ul>
  );

}

type DirectoryItem = {
  name: string;
  type: 'file' | 'folder';
  children?: DirectoryItem[];
};

type DirectoryItemsProps = {
  items: DirectoryItem[];
  indent: number;
};