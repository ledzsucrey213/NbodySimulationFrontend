import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Simulation from "./components/Simulation";
import CorpsList from './components/CorpsList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Simulation />
      <CorpsList />
    </div>
  );
}

export default App;
