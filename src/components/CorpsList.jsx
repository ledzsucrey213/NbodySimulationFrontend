// src/components/CorpsList.jsx
import React, { useState, useEffect } from 'react';
import AddPlanetButton from './AddPlanetButton';  // Importer le nouveau composant
import DeleteButton from './DeleteButton';
import SetupButton from './SetupButton';

const CorpsList = () => {
  const [bodies, setBodies] = useState([]);

  // Fonction pour récupérer les données de la simulation
  const fetchBodies = async () => {
    try {
      const response = await fetch('http://localhost:8080/simulate');
      const data = await response.json();
      setBodies(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des corps célestes', error);
    }
  };

  // Fonction pour ajouter une planète via une requête POST
  const addPlanet = async () => {
    try {
      const response = await fetch('http://localhost:8080/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),  // Corps vide, car la logique est côté backend pour la génération aléatoire
      });

      if (response.ok) {
        const data = await response.json();
        setBodies(data);  // Met à jour la liste des planètes avec la réponse du backend
      } else {
        console.error("Erreur lors de l'ajout de la planète");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // Fonction pour ajouter 30 planètes d'un coup
  const setupPlanets = async () => {
    for (let i = 0; i < 30; i++) {
      await addPlanet();  // Attendre chaque appel pour ajouter une planète
    }
  };



  // Fonction pour supprimer toutes les planètes via une requête DELETE
const deletePlanets = async () => {
  try {
    const response = await fetch('http://localhost:8080/simulate', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      setBodies(data);  // Met à jour la liste des planètes avec la réponse vide du backend
    } else {
      console.error("Erreur lors de la suppression des planètes");
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
};


  // Utilisation de useEffect pour récupérer les données et mettre à jour l'état
  useEffect(() => {
    // Appel initial pour récupérer les corps
    fetchBodies();

    // Met à jour les positions à intervalles réguliers
    const intervalId = setInterval(fetchBodies, 100); // Mise à jour toutes les 100ms
    return () => clearInterval(intervalId); // Nettoyage de l'intervalle au démontage du composant
  }, []);

  return (
    <div className="simulation-sidebar">
      {/* Utilisation du composant AddPlanetButton et passage de la fonction addPlanet comme prop */}
      <AddPlanetButton onAddPlanet={addPlanet} />
      <SetupButton onSetupPlanet={setupPlanets} />
      <DeleteButton deletePlanets={deletePlanets} />

      <h2>Liste des Planètes</h2>
      <ul className="planet-list">
        {bodies.map((body, index) => (
          <li key={index}>
            Planète {index + 1}: X={body.positionX.toFixed(2)} Y={body.positionY.toFixed(2)}
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default CorpsList;
