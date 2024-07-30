import React from 'react';
import Table from '../../components/Table';
import { downloadExport } from '../../api';

export default function ExportsTable({exports, page, size}) {
    console.log(exports);
    const columns = [
        { header: '#', accessor: (row, index) => (page - 1) * size + index + 1 },
        { header: 'File Name', key: 'fileName' },
        { header: 'Total Records', key: 'total_rows' },
        { header: 'File Size', key: 'file_size' },
        { header: 'Status', key: 'status' },
        { header: 'Time Initiated', key: 'time_initiated' },
        { headr: 'Time Completed', key: 'time_completed' },
        {
            header: 'Download', render: (value, item, index) => (
                <button className="cell-btn" onClick={() => handleDownload(item)}>
                </button>
            ),
        }
    ];

    const handleDownload = async (item) => {
        try {
            const response = await downloadExport(item.fileId);
            
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
                link.setAttribute('download', `${fileId}.ext`); // Adjust the filename and extension as needed
                
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