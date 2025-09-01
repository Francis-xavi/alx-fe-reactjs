import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from "./components/HomePage";
import './App.css'
import './index.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-100 min-h-screen">
      <HomePage />
    </div>
  );
}
export default App
