import React from 'react';
import Column from './components/Column.jsx';
import Details from './components/Details.jsx';

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Star Wars Explorer</h1>
      </header>

      <main className="grid-container">
        <Column type="people" title="Characters" />
        <Column type="planets" title="Planets" />
        <Column type="starships" title="Starships" />
      </main>

      <Details />
    </div>
  );
}
