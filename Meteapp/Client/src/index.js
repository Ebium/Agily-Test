import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import  Home  from "./Home.js";
const root = ReactDOM.createRoot(document.getElementById('root'));

// rend la page principale lors de l'arrivée sur l'application
root.render(<Home rootprop={root}/>);