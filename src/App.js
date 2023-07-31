import { Container } from 'react-bootstrap';
import { PageRoutes } from './Routes';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export const App = () => {
  return (
    <Container fluid className='App'>
      <PageRoutes />
    </Container>

  );
};

export default App;

