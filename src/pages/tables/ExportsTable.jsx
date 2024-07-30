import React from 'react';
import Table from '../../components/Table';
import { downloadExport } from '../../api';

import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function ExportsTable({ exports, page, size }) {
    const columns = [
        { header: '#', accessor: (row, index) => (page - 1) * size + index + 1 },
        { header: 'File Name', key: 'fileName' },
        { header: 'Total Records', key: 'totalRows' },
        { header: 'File Size', key: 'fileSize' },
        { header: 'Status', key: 'status' },
        { header: 'Time Initiated', key: 'timeInitiated' },
        { header: 'Time Completed', key: 'timeCompleted' },
        {
            header: 'Download', render: (value, item, index) => (
                <button className="cell-btn" onClick={() => handleDownload(item)}>
                    <FileDownloadIcon />
                </button>
            ),
        }
    ];

    const handleDownload = async (item) => {
        const fileId = item.fileId; // Ensure fileId is defined here
        try {
            const response = await downloadExport(fileId);

    
            if (response.status === 200) {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${fileId}.xlsx`); 
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
            } else {
                console.error(`Download failed: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Failed to download file ${fileId}: ${error.message}`);
        }
    };

    return (
        <Table
            data={exports}
            columns={columns}
            onRowClick={() => { }}
            page={page}
            size={size}
        />
    );
}
