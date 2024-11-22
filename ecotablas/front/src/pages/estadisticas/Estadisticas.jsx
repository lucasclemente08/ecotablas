import React from 'react'
import SectionLayout from '../../layout/SectionLayout'
import MaquinariaChart from '../../components/graficos/MaquinariaChart'
import DonantesChart from '../../components/graficos/donantesChart'

const Estadisticas = () => {
  return (
 <SectionLayout title="Estadísticas Generales">
      <div className="flex flex-row  items-center content-center gap-2">
     
        <div className="p-3 bg-gray-800 shadow-sm rounded-md">
          <h2 className="text-md font-medium text-white text-center mb-2"></h2>
          <div className="">
            <MaquinariaChart />
          </div>
        </div>

        <div className="p-3 shadow-sm rounded-md">

          <div className="h-24 p-2">
            <DonantesChart />
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default Estadisticas
