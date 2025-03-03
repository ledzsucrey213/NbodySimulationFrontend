// src/components/Simulation.jsx
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Circle } from 'react-konva';

const Simulation = () => {
  const [bodies, setBodies] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données de simulation depuis l'API
    const fetchBodies = async () => {
      try {
        const response = await fetch('http://localhost:8080/simulate');
        const data = await response.json();
        setBodies(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des corps célestes', error);
      }
    };

    // Appel initial pour récupérer les corps
    fetchBodies();

    // Met à jour les positions à intervalles réguliers
    const intervalId = setInterval(fetchBodies, 100); // Mise à jour toutes les 100ms
    return () => clearInterval(intervalId); // Nettoyage de l'intervalle au démontage du composant
  }, []);

  return (
    <div className="simulation-container">
      <h1>Simulation N-Body</h1>
      <Stage width={700} height={700}>
        <Layer>
          {bodies.map((body, index) => (
            <Circle
              key={index}
              x={body.positionX + 350} // Décalage pour centrer l'espace de simulation
              y={body.positionY + 350} // Décalage pour centrer l'espace de simulation
              radius={5} // Taille des corps célestes
              fill="blue"
              stroke="black"
              strokeWidth={1}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Simulation;
