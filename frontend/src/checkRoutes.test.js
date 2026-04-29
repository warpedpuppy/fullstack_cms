import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const originalError = console.error;
console.error = (...args) => {
  originalError(...args);
  process.exit(1);
};

const originalWarn = console.warn;
console.warn = (...args) => {
  originalWarn(...args);
};

try {
  render(
    <MemoryRouter initialEntries={['/', '/admin', '/events', '/event/1', '/creator/1', '/article/test/1']}>
      <App />
    </MemoryRouter>
  );
  console.log('No routing errors during render.');
} catch (e) {
  console.error("Caught error:", e);
  process.exit(1);
}
