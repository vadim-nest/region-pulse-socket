// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import { useSocket } from "./hooks/useSocket";
import { RegionPulseMsg } from "./types";

function App() {
  const msg = useSocket<RegionPulseMsg>("ws://localhost:3000/ws");
  return <pre>{JSON.stringify(msg, null, 2)}</pre>;
}

export default App;
