import { Badge, TableWrapper, utils } from '@koyal-tech/editable-react-table';

import logo from './logo.svg';
import './App.css';

const {
  randomColor,
  shortId,
  makeData,
  ActionTypes,
  DataTypes,
} = utils;

function App() {
  const tableWrapperRandomInitState = makeData(100);
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
        <TableWrapper initialState={tableWrapperRandomInitState} />
      </div>
    </div>
  );
}

export default App;
