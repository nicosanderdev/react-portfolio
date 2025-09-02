import './TronGrid.css';

interface TronGridProps {
  children: React.ReactNode;
}

/**
 * A full-page component that displays an animated Tron-style grid background.
 * Place your page content as children of this component.
 */
const TronGrid: React.FC<TronGridProps> = ({ children }) => {
  return (
    <div className="tron-grid-container">
      <div className="grid-background"></div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default TronGrid;