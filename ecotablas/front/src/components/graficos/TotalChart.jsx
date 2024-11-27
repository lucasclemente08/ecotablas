const TotalCard = ({ title, value, icon, iconStyle = "",bgColor = "bg-gray-800"  }) => (


    <div
    className={`${bgColor} flex-1 min-w-[300px] max-w-[500px] p-4 shadow-md rounded-md`}
  >
      <div className="flex justify-center items-center mb-4">
        {icon && (
          <div className={`mr-2 ${iconStyle}`}>
            {icon}
          </div>
        )}
        <h2 className="text-lg font-medium text-white text-center">{title}</h2>
      </div>
      <div className="text-white text-center">
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
  
  export default TotalCard;
  