function convertirARutaKML(ruta) {
    let kml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    kml += `<kml xmlns="http://www.opengis.net/kml/2.2">\n`;
    kml += `  <Document>\n`;
    kml += `    <name>Ruta en Leaflet</name>\n`;
    kml += `    <Placemark>\n`;
    kml += `      <LineString>\n`;
    kml += `        <coordinates>\n`;
  
    ruta.forEach(punto => {
      kml += `          ${punto.lng},${punto.lat},0\n`;
    });
  
    kml += `        </coordinates>\n`;
    kml += `      </LineString>\n`;
    kml += `    </Placemark>\n`;
    kml += `  </Document>\n`;
    kml += `</kml>`;
  
    return kml;
  }
  
  const kmlData = convertirARutaKML(ruta);
  
  // Descargar el archivo KML
  const blob = new Blob([kmlData], { type: 'application/vnd.google-earth.kml+xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'ruta.kml';
  link.click();
  