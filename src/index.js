import React from 'react';
import App from './App';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// TODO: Error appears in console about react-dom and React 18
// SOLVED: React 18 does not support .render, switched it to createRoot
// ReactDOM.render(<App />, document.getElementById('root'));
