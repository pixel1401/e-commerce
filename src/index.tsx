import * as React from 'react';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { StateProvider } from './context/StateContext';
import { createRoot } from 'react-dom/client';


const rootNode = document.getElementById('app');
if (rootNode) {
  createRoot(rootNode)
    .render(
      <StateProvider>
        <App />
      </StateProvider>
    );
}