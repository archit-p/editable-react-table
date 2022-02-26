// import logo from './logo.svg';
import './App.css';

import MockComponentGallery from './components/poc/MockComponentGallery';

function App() {
  return (
    <div className="App">
      
      <h1>Sample App</h1>
      <nav style={{ borderBottom: 'solid 1px', paddingBottom: '1rem' }}>
        <a href="https://github.com/koyal-tech/editable-react-table" target="_blank">Source</a> |{' '}
      </nav>
      <MockComponentGallery />
    </div>
  );
}

export default App;
