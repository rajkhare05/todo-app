import React from 'react';
import Home from './components/Home';

function App() {
  const style_ = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
  return (
    <div>
      <h1 style={style_} >ToDo App</h1>
      <Home />
    </div>
  );
}

export default App;
