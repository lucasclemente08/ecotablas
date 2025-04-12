import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import SectionLayout from "../../layout/SectionLayout";
import TableComponent from "../../components/TableComponent"; // Asegúrate de importar el componente

const Areas = () => {
  const [area, setArea] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState(null);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://www.ecotablasapi.somee.com/api/Roles/ListarTodo"
      );
      setArea(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setError("Error al cargar las áreas");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Definir las columnas para la tabla
  const tableColumns = useMemo(() => [
    {
      key: 'NombreRol',
      label: 'Nombre del Rol',
      type: 'text',
      sortable: true
    }
  ], []);

  // Columnas para el PDF
  const pdfColumns = useMemo(() => [
    {
      title: 'Nombre del Rol',
      dataKey: 'NombreRol'
    }
  ], []);

  // Ordenar datos si es necesario
  const sortedData = useMemo(() => {
    if (!sortConfig) return area;
    
    return [...area].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [area, sortConfig]);

  // Formatear datos para el PDF
  const pdfData = useMemo(() => {
    return area.map(item => ({
      NombreRol: item.NombreRol || 'N/A'
    }));
  }, [area]);

  return (
    <SectionLayout title="Áreas">
        <PdfGenerator
          columns={pdfColumns}
          data={pdfData}
          title="Listado de Roles"
          fileName="roles_listado"
        />

      <TableComponent
        data={sortedData}
        titles={tableColumns}
        sortConfig={sortConfig}
        onSort={handleSort}
        isLoading={loading}
        itemsPerPage={10}
        hasMaterial={false}
      />
    </SectionLayout>
  );
};

export default Areas;