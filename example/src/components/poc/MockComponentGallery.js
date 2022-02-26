import { Badge, TableWrapper, utils } from '@koyal-tech/editable-react-table';

import './MockComponentGallery.css';

const {
  makeData,
} = utils;

const MockComponentGallery = () => {
  const tableWrapperRandomInitState = makeData(5);
  return (
    <div className="gallery">
      <h3>Component Gallery</h3>
      <Badge value="Badge tag example" backgroundColor="#bdbdbd" />
      <TableWrapper initialState={tableWrapperRandomInitState} />
    </div>
  );
}

export default MockComponentGallery;
