import React, { useState } from "react";
import Home from "../home/Home";
import VolumenChart from "../../components/VolumenChart";
import VolumenIngresadoChart from "../../components/VolumenIngresadoChart";
import VolumenProcesadoChart from "../../components/VolumenProcesadoChart";
import VolumenTrituradoChart from "../../components/VolumenTrituradoChart";
import DateFilter from "../../components/DateFilter";
import SectionLayout from "../../layout/SectionLayout";

const Volumen = () => {
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const handleFilter = (dates) => {
    setDateRange(dates);
  };

  return (
<SectionLayout title="Volúmen">
  
        <DateFilter onFilter={handleFilter} />
        <div className="flex-1 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <VolumenChart dateRange={dateRange} />
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <VolumenIngresadoChart dateRange={dateRange} />
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <VolumenProcesadoChart dateRange={dateRange} />
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <VolumenTrituradoChart dateRange={dateRange} />
          </div>
        </div>
</SectionLayout>
      
    
  );
};

export default Volumen;
