import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ data, columns, onRowClick, page, size }) => (
    <div className="table-wrapper">
        <table className="fl-table">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key || col.label}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                    <tr key={item.id} onClick={() => onRowClick && onRowClick(item)}>
                        {columns.map((col, colIndex) => (
                            <td key={col.key || col.label}>
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
        label: PropTypes.string.isRequired,
        render: PropTypes.func,
        accessor: PropTypes.func,
    })).isRequired,
    onRowClick: PropTypes.func,
    page: PropTypes.number,
    size: PropTypes.number,
};

Table.defaultProps = {
    onRowClick: null,
    page: 1,
    size: 1,
};

export default Table;
