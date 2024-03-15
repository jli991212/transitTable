
import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Read from "./component/Read";
import Form from './component/Form';
import Update from './component/Update';
function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update/:transitCricle/:firebaseId" element={ <Update/> } />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
