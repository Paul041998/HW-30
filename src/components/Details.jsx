import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelected } from '../features/swapiSlice.js';

function renderValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object' && value !== null) return JSON.stringify(value);
  return String(value);
}

export default function Details() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.swapi.selected);
  if (!selected) return null;

  const { item, type } = selected;
  const entries = Object.entries(item).map(([k, v]) => (
    <p key={k}><strong>{k}:</strong> {renderValue(v)}</p>
  ));

  return (
    <div className="details">
      <div className="details-header">
        <div>
          <h3>{item.name || item.title}</h3>
          <p className="category">Category: {type}</p>
        </div>
        <button onClick={() => dispatch(clearSelected())}>Close</button>
      </div>

      <div className="details-content">{entries}</div>
    </div>
  );
}
