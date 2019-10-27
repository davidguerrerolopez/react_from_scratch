import React from 'react';

export const Table = ({ tableDetails }) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <div className="row">
          {Object.keys(tableDetails.headers).map((header, index) => {
            return <div className="column" key={index}>{header}</div>
          })}
        </div>
      </div>
      <div className="table-body">
        {tableDetails.tableList.map((row, key) => {
          return (
            <div className="row" key={key}>
              {Object.keys(tableDetails.headers).map((column, columnKey) => {
                let columnValue = '';
                if (tableDetails.headers[column].isFixed) {
                  columnValue = tableDetails.headers[column].value || '';
                } else {
                  columnValue = row[tableDetails.headers[column]] || '';
                }
                return <div className="column" key={columnKey}>{columnValue}</div>
              })}
            </div>
          )
        })}

      </div>
    </div>
  )
}