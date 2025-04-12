import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import PdfGenerator from "../../components/buttons/PdfGenerator";
import SectionLayout from "../../layout/SectionLayout";
import TableComponent from "../../components/TableComponent";

function Material() {
  const [plasticos, setPlasticos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState(null);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://www.ecotablasapi.somee.com/api/TiposPlastico/ListarTodo"
      );
      setPlasticos(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setError("Error al cargar los plásticos");
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

  // Definir las columnas de la tabla
  const tableColumns = useMemo(() => [
    {
      key: 'TipoPlastico',
      label: 'Tipo de Plástico',
      type: 'text',
      sortable: true
    }
  ], []);

  const pdfColumns = useMemo(() => [
    {
      title: 'Tipo de Plástico',
      dataKey: 'TipoPlastico'
    }
  ], []);

  // Ordenar datos si es necesario
  const sortedData = useMemo(() => {
    if (!sortConfig) return plasticos;
    
    return [...plasticos].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [plasticos, sortConfig]);


  const pdfData = useMemo(() => {
    return plasticos.map(item => ({
      TipoPlastico: item.TipoPlastico || 'N/A'
    }));
  }, [plasticos]);

  return (
    <SectionLayout title="Plásticos">

<PdfGenerator
          columns={pdfColumns}
          data={pdfData}
          title="Listado de Plásticos"
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
}

export default Material;