import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import Badge from '../Badge';
import { grey } from '../colors';
import PlusIcon from '../img/Plus';
import { ActionTypes, randomColor } from '../utils';

export default function SelectCell({
  initialValue,
  options,
  columnId,
  rowIndex,
  dataDispatch,
}) {
  const [selectRef, setSelectRef] = useState(null);
  const [selectPop, setSelectPop] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addSelectRef, setAddSelectRef] = useState(null);
  const { styles, attributes } = usePopper(selectRef, selectPop, {
    placement: 'bottom-start',
    strategy: 'fixed',
  });
  const [value, setValue] = useState({ value: initialValue, update: false });

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
  }, [value, columnId, rowIndex]);

  useEffect(() => {
    if (addSelectRef && showAdd) {
      addSelectRef.focus();
    }
  }, [addSelectRef, showAdd]);

  function getColor() {
    let match = options.find(option => option.label === value.value);
    return (match && match.backgroundColor) || grey(200);
  }

  function handleAddOption(e) {
    setShowAdd(true);
  }

  function handleOptionKeyDown(e) {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        dataDispatch({
          type: ActionTypes.ADD_OPTION_TO_COLUMN,
          option: e.target.value,
          backgroundColor: randomColor(),
          columnId,
        });
      }
      setShowAdd(false);
    }
  }

  function handleOptionBlur(e) {
    if (e.target.value !== '') {
      dataDispatch({
        type: ActionTypes.ADD_OPTION_TO_COLUMN,
        option: e.target.value,
        backgroundColor: randomColor(),
        columnId,
      });
    }
    setShowAdd(false);
  }

  function handleOptionClick(option) {
    setValue({ value: option.label, update: true });
    setShowSelect(false);
  }

  useEffect(() => {
    if (addSelectRef && showAdd) {
      addSelectRef.focus();
    }
  }, [addSelectRef, showAdd]);

  return (
    <>
      <div
        ref={setSelectRef}
        className="cell-padding d-flex cursor-default align-items-center flex-1"
        onClick={() => setShowSelect(true)}
      >
        {value.value && (
          <Badge value={value.value} backgroundColor={getColor()} />
        )}
      </div>
      {showSelect && (
        <div className="overlay" onClick={() => setShowSelect(false)} />
      )}
      {showSelect &&
        createPortal(
          <div
            className="shadow-5 bg-white border-radius-md"
            ref={setSelectPop}
            {...attributes.popper}
            style={{
              ...styles.popper,
              zIndex: 4,
              minWidth: 200,
              maxWidth: 320,
              maxHeight: 400,
              padding: '0.75rem',
              overflow: 'auto',
            }}
          >
            <div
              className="d-flex flex-wrap-wrap"
              style={{ marginTop: '-0.5rem' }}
            >
              {options.map(option => (
                <div
                  className="cursor-pointer mr-5 mt-5"
                  onClick={() => handleOptionClick(option)}
                >
                  <Badge
                    value={option.label}
                    backgroundColor={option.backgroundColor}
                  />
                </div>
              ))}
              {showAdd && (
                <div
                  className="mr-5 mt-5 bg-grey-200 border-radius-sm"
                  style={{
                    width: 120,
                    padding: '2px 4px',
                  }}
                >
                  <input
                    type="text"
                    className="option-input"
                    onBlur={handleOptionBlur}
                    ref={setAddSelectRef}
                    onKeyDown={handleOptionKeyDown}
                  />
                </div>
              )}
              <div
                className="cursor-pointer mr-5 mt-5"
                onClick={handleAddOption}
              >
                <Badge
                  value={
                    <span className="svg-icon-sm svg-text">
                      <PlusIcon />
                    </span>
                  }
                  backgroundColor={grey(200)}
                />
              </div>
            </div>
          </div>,
          document.querySelector('#popper-portal')
        )}
    </>
  );
}
