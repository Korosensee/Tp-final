import React, { useState, useEffect } from 'react';
import { getEdificios } from '../../services/edificios';

interface Props {
  onBuildClick: (id: string, x: number, y: number, buildingType: string, ancho: number, largo: number, costo:number) => void;
}

const MenuDesplegable: React.FC<Props> = ({ onBuildClick }) => {
  const [edificios, setEdificios] = useState<any[]>([]);
  


  useEffect(() => {
    fetchBuildingData();
  }, []);

  async function fetchBuildingData() {
    try {
      // Obtener los datos de los edificios desde la base de datos
    
       
      const edificiosData = await getEdificios();
      setEdificios(edificiosData);
    } catch (error) {
      console.error("Error al obtener datos de edificios:", error);
    }
  };







  // Función para llamar a la función onBuildClick con el tipo de edificio seleccionado
  const handleBuildSelection = (buildingType: string) => {
    const selectedEdificio = edificios.find(edificio => edificio.name === buildingType);
    if (selectedEdificio) {
      // Aquí puedes definir las coordenadas x, y donde quieres construir el edificio
      const x = 100; // Por ejemplo, 100px desde el borde izquierdo del cuadro verde
      const y = 100; // Por ejemplo, 100px desde el borde superior del cuadro verde
      const ancho = selectedEdificio.ancho || 20; // Usar ancho predeterminado si no está definido en la base de datos
      const largo = selectedEdificio.largo || 20; // Usar largo predeterminado si no está definido en la base de datos
      const costo = selectedEdificio.costo ; // Usar costo predeterminado si no está definido en la base de datos
      onBuildClick(selectedEdificio.id, x, y, buildingType, ancho, largo, costo);
    } else {
      console.error(`No se encontró el edificio con el nombre "${buildingType}"`);
    }
  };

  return (
    <div className="absolute top-0 right-0 p-4 bg-red-500 hover:bg-blue-700 text-blue font-bold py-2 px-4 rounded">
      <h3>Crear edificios</h3>
      {/* Renderizar los botones para seleccionar el tipo de edificio */}
      {edificios.map((edificio, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <button onClick={() => handleBuildSelection(edificio.name)}>{edificio.name}</button>
        </div>
      ))}
    </div>
  );
};

export default MenuDesplegable;
