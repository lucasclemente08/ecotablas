const ChartCard = ({ title, children }) => (
  <div className="flex-1 min-w-[300px] max-w-[500px] p-4 bg-gray-800 shadow-md rounded-md">
    <h2 className="text-lg font-medium text-white text-center mb-4">{title}</h2>
    <div className="h-[400px]">{children}</div>
  </div>
);
export default ChartCard;
