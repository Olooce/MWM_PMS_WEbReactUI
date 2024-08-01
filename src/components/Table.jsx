import React from 'react';
import PropTypes from 'prop-types';
import '../styles/tableStyling.css'

const Table = ({ data = [], columns = [], onRowClick = null }) => (
  <div className="table-wrapper">
    <table className="fl-table">
      <thead>
        <tr className="fl-table-header">
          {columns.map((col) => (
            <th key={col.key || col.header}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={item.id} onClick={() => onRowClick && onRowClick(item)}>
            {columns.map((col) => (
              <td key={col.key || col.header}>
                {col.render
                  ? col.render(item[col.key], item, rowIndex)
                  : col.accessor
                    ? col.accessor(item, rowIndex)
                    : item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    header: PropTypes.string.isRequired,
    render: PropTypes.func,
    accessor: PropTypes.func,
  })).isRequired,
  onRowClick: PropTypes.func,
};

export default Table;
