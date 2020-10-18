import React from 'react';
// import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import TodoApp from './components/todo/TodoApp';

function App() {
  return (
    <div className="App">
      {/*<Counter/>*/}
      <TodoApp></TodoApp>
    </div>
  );
}

export default App;
