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

            // Check if the response is okay
            if (response.status === 200) {
                // Create a new Blob object using the response data
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                // Create a link element
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');

                // Set the link's href to the blob URL
                link.href = url;

                // Set the download attribute with a filename
                link.setAttribute('download', `${fileId}.xlsx`); // Adjust the filename and extension as needed

                // Append the link to the body
                document.body.appendChild(link);

                // Trigger the download
                link.click();

                // Clean up
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
