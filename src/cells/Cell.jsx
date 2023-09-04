import React from 'react';
import { DataTypes } from '../utils';
import TextCell from './TextCell';
import NumberCell from './NumberCell';
import SelectCell from './SelectCell';
import MediaCell from './MediaCell';

export default function Cell({
  value: initialValue,
  row: { index },
  column: { id, dataType, options },
  dataDispatch,
}) {
  function getCellElement() {
    switch (dataType) {
      case DataTypes.TEXT:
        return (
          <TextCell
            initialValue={initialValue}
            rowIndex={index}
            columnId={id}
            dataDispatch={dataDispatch}
          />
        );
      case DataTypes.NUMBER:
        return (
          <NumberCell
            initialValue={initialValue}
            rowIndex={index}
            columnId={id}
            dataDispatch={dataDispatch}
          />
        );
      case DataTypes.SELECT:
        return (
          <SelectCell
            initialValue={initialValue}
            options={options}
            rowIndex={index}
            columnId={id}
            dataDispatch={dataDispatch}
          />
        );
      case DataTypes.MEDIA:
        return (
          <MediaCell
            initialValue={initialValue}
            rowIndex={index}
            columnId={id}
            dataDispatch={dataDispatch}
            onMediaUpload={handleMediaUpload}
          />
        );
      default:
        return <span></span>;
    }
  }
  function handleMediaUpload(uploadedMedia) {
    // Update your table data with the details of the uploaded media.
    // This could involve setting a new state or updating a data array.
    // For now, we'll just log the uploaded media.
    console.log("Uploaded media:", uploadedMedia);
  }

  return getCellElement();
}
