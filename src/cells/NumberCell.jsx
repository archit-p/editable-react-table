import React, { useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { ActionTypes } from '../utils';

export default function NumberCell({
  initialValue,
  columnId,
  rowIndex,
  dataDispatch,
}) {
  const [value, setValue] = useState({ value: initialValue, update: false });

  function onChange(e) {
    setValue({ value: e.target.value, update: false });
  }

  function onBlur(e) {
    setValue(old => ({ value: old.value, update: true }));
  }

  useEffect(() => {
    setValue({ value: initialValue, update: false });
  }, [initialValue]);

  useEffect(() => {
    if (value.update) {
      dataDispatch({
        type: ActionTypes.UPDATE_CELL,
        columnId,
        rowIndex,
        value: value.value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.update, columnId, rowIndex]);

  return (
    <ContentEditable
      html={(value.value && value.value.toString()) || ''}
      onChange={onChange}
      onBlur={onBlur}
      className="data-input text-align-right"
    />
  );
}
