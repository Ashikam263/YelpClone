import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Find the element you want to attach your React app to.
const container = document.getElementById('root');

// Create a root.
const root = createRoot(container);

// Initial render: Render your app to the root.
root.render(<App />);
