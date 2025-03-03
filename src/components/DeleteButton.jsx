// src/components/AddPlanetButton.jsx
import React from 'react';

const DeleteButton = ({ deletePlanets }) => {
  return (
    <button onClick={deletePlanets}>
      Reset
    </button>
  );
};

export default DeleteButton;
