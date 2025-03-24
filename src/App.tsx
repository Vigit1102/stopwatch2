import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from '@mui/material';
import { Stopwatch } from './Components/Stopwatch';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App">
          <Container sx={{backgroundColor:"rgb(86, 114, 146)"}}>
            <Stopwatch/>
            <br/>
            <br/>
            <br/>
          </Container>
        </div>
      </div>
    </Provider>
  );
}

export default App;
