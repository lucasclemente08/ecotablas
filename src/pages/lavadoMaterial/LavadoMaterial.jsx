import React from 'react'
import Home from '../home/Home'
import ReportButton from '../../components/ReportButton'
const LavadoMaterial = () => {
  return (
    <>
  <section className="md:flex flex-row bg-slate-900 min-h-screen">
        <Home />
        <div className="p-4 w-full">
          <h2 className="text-2xl font-bold text-white mb-4">
            Lavado de materiales
          </h2>

        <ReportButton />

        </div>
      </section>

    </>
  )
}

export default LavadoMaterial