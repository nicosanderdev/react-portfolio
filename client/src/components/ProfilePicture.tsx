// src/components/ProfilePicture.tsx

type ProfilePictureProps = {
  filename?: string;
  className?: string;
};

const ProfilePicture = ({ 
  filename = "profile.jpg", 
  className = "" 
}: ProfilePictureProps) => {
  return (
    // The main frame. We merge any incoming className for layout control.
    <div className={`border-2 border-emerald-400 p-1 font-mono ${className}`}>
      
      {/* The "Title Bar" with more details */}
      <div className="bg-emerald-400 text-gray-900 text-sm flex justify-between items-center p-1">
        <span>[IMG] {filename}</span>
        <span className="text-xs opacity-75">144kb</span>
      </div>

      {/* Container for the image and its overlays */}
      <div className="relative group cursor-pointer mt-1">
        
        {/* The actual image */}
        <img 
          className="transition-all duration-300 filter grayscale group-hover:grayscale-0 w-full"
          src="/profile-picture.jpg" 
          alt="Profile picture" 
        />
        
        {/* Overlay 1: The green monochrome tint */}
        <div className="absolute top-0 left-0 w-full h-full bg-emerald-900 opacity-40 mix-blend-hard-light transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>

        {/* Overlay 2: The CRT Scanlines Effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.3),rgba(0,0,0,0.3)_1px,transparent_1px,transparent_3px)] opacity-60 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>

      </div>
    </div>
  );
}

export default ProfilePicture;