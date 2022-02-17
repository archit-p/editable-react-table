import logo from './logo.svg';
import './App.css';
import { Badge } from '@koyal-tech/editable-react-table';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <div>
        <h2>Component Gallery</h2>
        <Badge value="Badge tag example" backgroundColor="#bdbdbd" />
        
      </div>
    </div>
  );
}

export default App;
