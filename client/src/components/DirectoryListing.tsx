import { useTranslation } from "react-i18next";
import "./DirectoryListing.css";

type DirectoryItem = {
  name: string;
  type: "file" | "folder";
  url?: string;
  children?: DirectoryItem[];
};

type DirectoryItemsProps = {
  items: DirectoryItem[];
};

function FileIcon() {
  return (
    <svg className="dir-icon dir-icon-file" viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="outline"
        d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
      />
      <path className="lines" pathLength="100" d="M9 13h6M9 16h4" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="dir-icon dir-icon-folder" viewBox="0 0 24 24" aria-hidden="true">
      <path className="body" d="M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" />
      <path className="sheet" d="M5 11h14v7H5z" />
      <path
        className="lid"
        d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Z"
      />
    </svg>
  );
}

function RowContents({ name, type }: { name: string; type: DirectoryItem["type"] }) {
  return (
    <>
      {type === "folder" ? <FolderIcon /> : <FileIcon />}
      <span className="dir-caret" aria-hidden="true">
        &gt;
      </span>
      <span className="dir-name">{name}</span>
    </>
  );
}

export default function DirectoryListing() {
  const { t } = useTranslation();
  const files: DirectoryItem[] = [
    {
      name: "resume.pdf",
      type: "file",
      url: "/resume.pdf",
    },
    {
      name: t("projects"),
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
      <p className="font-mono text-white mb-2 text-xl">/portfolio/{t("files")}/</p>
      <DirectoryItems items={files} />
    </div>
  );
}

function DirectoryItems({ items }: DirectoryItemsProps) {
  return (
    <ul className="dir-tree">
      {items.map((item, index) => {
        const isExternal = item.url?.startsWith("http");
        const isDownloadable = item.url?.endsWith(".pdf");

        return (
          <li key={index}>
            {item.type === "file" && item.url ? (
              <a
                className="dir-row dir-file"
                href={item.url}
                download={isDownloadable ? item.name : undefined}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <RowContents name={item.name} type={item.type} />
              </a>
            ) : (
              <div className="dir-row dir-folder">
                <RowContents name={item.name} type={item.type} />
              </div>
            )}
            {item.type === "folder" && item.children && (
              <DirectoryItems items={item.children} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
