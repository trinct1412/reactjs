import React from 'react';
import './App.css';
import { Routes ,Route } from 'react-router-dom';
import ToDo from './features/todo/pages/ToDo';
import { NotFound } from './components/common';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/todo" element={<ToDo/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
