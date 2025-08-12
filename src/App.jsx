import { useState } from 'react'
import React from 'react';
import './App.css';
import CustomRoutes from './routes/CustomRoutes.jsx';
import { Link } from 'react-router-dom';

// import Pokedex from './components/pokedex/pokedex.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='outer-pokedex'>
        <h1 className="heading"><Link to ="/">Pokedex</Link></h1>
      <CustomRoutes/>
      </div>
      
   
    </>
  )
}

export default App
