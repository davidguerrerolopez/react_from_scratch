

import 'babel-polyfill';
import React from 'react';
import './App.css';
import Api from './Api';
import { ManufacturerDetailsContainer } from './Containers/ManufacturerDetails';

function App() {
  return (
    <div className="App">
      <ManufacturerDetailsContainer />

    </div>
  );
}

export default App;
