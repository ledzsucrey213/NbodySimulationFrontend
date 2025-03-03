// src/components/AddPlanetButton.jsx
import React from 'react';

const SetupButton = ({ onSetupPlanet }) => {
  return (
    <button onClick={onSetupPlanet}>
      Setup
    </button>
  );
};

export default SetupButton;
