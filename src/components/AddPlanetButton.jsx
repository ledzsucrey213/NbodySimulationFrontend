// src/components/AddPlanetButton.jsx
import React from 'react';

const AddPlanetButton = ({ onAddPlanet }) => {
  return (
    <button onClick={onAddPlanet}>
      Ajouter une planète
    </button>
  );
};

export default AddPlanetButton;
