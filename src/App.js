import React, { useState } from 'react';

import Header from './composant/template/Header.js';
import Footer from './composant/template/Footer.js';
import Login from "./composant/Login";
import vente_billet from "./composant/billet/vente_billet.js";
import NbrBilletVenduParEtudiant from "./composant/billet/nbrBilletVenduParEtudiant.js";
import Csv from "./composant/billet/Csv.js";

import './App.css';

export default function App(params) {
  const [currentComponent, setCurrentComponent] = useState('login');

  const [isConnected, setIsConnected] = useState(false);

  const components = {
    vente_billet: vente_billet,
  };

  const renderComponent = () => {
      const ComponentToRender = components[currentComponent];
      switch (currentComponent) {
        case 'vente_billet':
          return <ComponentToRender/>;
        case 'nbrBilletVenduParEtudiant':
          return <NbrBilletVenduParEtudiant/>;
        case 'csv':
            return <Csv/>;
        default:
          return <Login setIsConnected={setIsConnected} setCurrentComponent={setCurrentComponent}/>;
      }
  };

  return (
    <div>
      { 
        isConnected &&
        (
          <div>
            <Header setCurrentComponent={setCurrentComponent} setIsConnected={setIsConnected}/>
          </div>
        )
      }

      {renderComponent()}

      { 
        isConnected &&
        (
          <div>
            <Footer />
          </div>
        )
      }
    </div>
  );
}