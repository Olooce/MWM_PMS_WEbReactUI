import React from 'react';
import Table from '../conponents/Table';
import { GiHealthDecrease } from 'react-icons/gi';

export default function ExportsTable (exports, page, size) {
    const columns = [
        { header: '#', accessor: (row, index) => (page - 1) * size + index + 1 },
        {header: 'File Name', key: 'fileName'},
        {header: 'Total Records', key: 'total_rows'},
        {header: 'File Size', key: 'file_size'},
        {header: 'Status', key: 'status'},
    {header: 'Time Initiated', key: 'time_initiated'},
    {headr: 'Time Completed', key, 'time_completed'},
    {header: 'Download', rendor: handleDownload}
    ];
}