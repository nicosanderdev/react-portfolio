type HowIBuildPageProps = {
  isExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
};

function HowIBuildPage(_props: HowIBuildPageProps) {
  return (
    <article className="p-4 px-6 md:px-8 text-left font-mono text-gray-200 overflow-x-hidden" />
  );
}

export default HowIBuildPage;
