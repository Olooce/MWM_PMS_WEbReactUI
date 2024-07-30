import React from 'react';
import Table from '../../components/Table';

export default function ExportsTable(exports, page, size) {
    console.log(exports);
    const columns = [
        { header: '#', accessor: (row, index) => (page - 1) * size + index + 1 },
        { header: 'File Name', key: 'fileName' },
        { header: 'Total Records', key: 'total_rows' },
        { header: 'File Size', key: 'file_size' },
        { header: 'Status', key: 'status' },
        { header: 'Time Initiated', key: 'time_initiated' },
        { headr: 'Time Completed', key: 'time_completed' },
        // {
        //     header: 'Download', render: (value, item, index) => (
        //         <button className="cell-btn" onClick={() => handleDownload(item.fileId)}>
        //         </button>
        //     ),
        // }
    ];

    const handleDownload = (item) => {
        console.log(item);
    }

    return (
        <>
            <Table
                data={exports}
                columns={columns}
                onRowClick={handleDownload}
                page={page}
                size={size}
            />
        </>
    );
};