import React from 'react';
import Home from '../home/Home';
import SectionLayout from '../../layout/SectionLayout'; // Ajusta la ruta según sea necesario
import ReportButton from '../../components/buttons/ReportButton';

const LavadoMaterial = () => {
  return (
    <SectionLayout title="Lavado de materiales">
      <ReportButton />
    </SectionLayout>
  );
};

export default LavadoMaterial;
