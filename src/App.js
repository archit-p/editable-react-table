import React, {useEffect, useReducer} from "react";
import "./style.css";
import makeData from "./makeData";
import Table from "./Table";
import {randomColor, shortId} from "./utils";

function reducer(state, action) {
  switch (action.type) {
    case "add_option_to_column":
      const optionIndex = state.columns.findIndex((column) => column.id === action.columnId);
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, optionIndex),
          {
            ...state.columns[optionIndex],
            options: [
              ...state.columns[optionIndex].options,
              {label: action.option, backgroundColor: action.backgroundColor}
            ]
          },
          ...state.columns.slice(optionIndex + 1, state.columns.length)
        ]
      };
    case "add_row":
      return {
        ...state,
        skipReset: true,
        data: [...state.data, {}]
      };
    case "update_column_type":
      const typeIndex = state.columns.findIndex((column) => column.id === action.columnId);
      switch (action.dataType) {
        case "number":
          if (state.columns[typeIndex].dataType === "number") {
            return state;
          } else {
            return {
              ...state,
              columns: [
                ...state.columns.slice(0, typeIndex),
                {...state.columns[typeIndex], dataType: action.dataType},
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              data: state.data.map((row) => ({
                ...row,
                [action.columnId]: isNaN(row[action.columnId]) ? "" : Number.parseInt(row[action.columnId])
              }))
            };
          }
        case "select":
          if (state.columns[typeIndex].dataType === "select") {
            return {
              ...state,
              columns: [
                ...state.columns.slice(0, typeIndex),
                {...state.columns[typeIndex], dataType: action.dataType},
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              skipReset: true
            };
          } else {
            let options = [];
            state.data.forEach((row) => {
              if (row[action.columnId]) {
                options.push({label: row[action.columnId], backgroundColor: randomColor()});
              }
            });
            return {
              ...state,
              columns: [
                ...state.columns.slice(0, typeIndex),
                {
                  ...state.columns[typeIndex],
                  dataType: action.dataType,
                  options: [...state.columns[typeIndex].options, ...options]
                },
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              skipReset: true
            };
          }
        case "text":
          if (state.columns[typeIndex].dataType === "text") {
            return state;
          } else if (state.columns[typeIndex].dataType === "select") {
            return {
              ...state,
              skipReset: true,
              columns: [
                ...state.columns.slice(0, typeIndex),
                {...state.columns[typeIndex], dataType: action.dataType},
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ]
            };
          } else {
            return {
              ...state,
              skipReset: true,
              columns: [
                ...state.columns.slice(0, typeIndex),
                {...state.columns[typeIndex], dataType: action.dataType},
                ...state.columns.slice(typeIndex + 1, state.columns.length)
              ],
              data: state.data.map((row) => ({...row, [action.columnId]: row[action.columnId] + ""}))
            };
          }
        default:
          return state;
      }
    case "update_column_header":
      const index = state.columns.findIndex((column) => column.id === action.columnId);
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, index),
          {...state.columns[index], label: action.label},
          ...state.columns.slice(index + 1, state.columns.length)
        ]
      };
    case "update_cell":
      return {
        ...state,
        skipReset: true,
        data: state.data.map((row, index) => {
          if (index === action.rowIndex) {
            return {
              ...state.data[action.rowIndex],
              [action.columnId]: action.value
            };
          }
          return row;
        })
      };
    case "add_column_to_left":
      const leftIndex = state.columns.findIndex((column) => column.id === action.columnId);
      let leftId = shortId();
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, leftIndex),
          {
            id: leftId,
            label: "Column",
            accessor: leftId,
            dataType: "text",
            created: action.focus && true,
            options: []
          },
          ...state.columns.slice(leftIndex, state.columns.length)
        ]
      };
    case "add_column_to_right":
      const rightIndex = state.columns.findIndex((column) => column.id === action.columnId);
      const rightId = shortId();
      return {
        ...state,
        skipReset: true,
        columns: [
          ...state.columns.slice(0, rightIndex + 1),
          {
            id: rightId,
            label: "Column",
            accessor: rightId,
            dataType: "text",
            created: action.focus && true,
            options: []
          },
          ...state.columns.slice(rightIndex + 1, state.columns.length)
        ]
      };
    case "delete_column":
      const deleteIndex = state.columns.findIndex((column) => column.id === action.columnId);
      return {
        ...state,
        skipReset: true,
        columns: [...state.columns.slice(0, deleteIndex), ...state.columns.slice(deleteIndex + 1, state.columns.length)]
      };
    case "enable_reset":
      return {
        ...state,
        skipReset: false
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, makeData(10));

  useEffect(() => {
    dispatch({type: "enable_reset"});
  }, [state.data, state.columns]);

  return (
    <div
      className='overflow-x-hidden'
      style={{
        width: "100vw",
        height: "100vh"
      }}>
      <div className='d-flex justify-content-center flex-column align-items-center' style={{height: 120}}>
        <h1 className="color-grey-800">Editable React Table</h1>
      </div>
      <div className='d-flex overflow-auto'>
        <div className='cell-padding ml-auto mr-auto' style={{flex: "1 1 auto", maxWidth: 1000}}>
          <Table columns={state.columns} data={state.data} dispatch={dispatch} skipReset={state.skipReset} />
        </div>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center' style={{height: 140}}>
        <p className='font-weight-600 color-grey-600'>
          Built by{" "}
          <a href='https://twitter.com/thesysarch' className="color-grey-600">
            @thesysarch
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
