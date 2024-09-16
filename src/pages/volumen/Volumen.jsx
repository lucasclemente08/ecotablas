import React, { useState } from 'react';
import Home from '../home/Home';
import VolumenChart from '../../components/VolumenChart';
import VolumenIngresadoChart from '../../components/VolumenIngresadoChart';
import VolumenProcesadoChart from '../../components/VolumenProcesadoChart';
import VolumenTrituradoChart from '../../components/VolumenTrituradoChart';
import DateFilter from '../../components/DateFilter';

const Volumen = () => {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const handleFilter = (dates) => {
    setDateRange(dates);
  };

  return (
    <div className='md:flex flex-row bg-slate-900 p-4'>
      <Home />
      <div className="flex-1 flex flex-col gap-4 p-4">
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
      </div>
    </div>
  );
};

export default Volumen;
