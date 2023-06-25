// function exportTableToExcel(tableId, filename = 'table') {
//     const table = document.getElementById(tableId);
//     const rows = table.querySelectorAll('tr');
//
//     let csvContent = "data:text/csv;charset=utf-8,";
//
//     rows.forEach((row) => {
//         const rowData = [];
//         row.querySelectorAll('td, th').forEach((cell) => {
//             rowData.push(cell.innerText);
//         });
//         csvContent += rowData.join(",") + "\n";
//     });
//
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.setAttribute('href', encodedUri);
//     link.setAttribute('download', `${filename}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }
//
// exportTableToExcel('myTable', 'exported_table');
document.getElementById('exportButton').addEventListener('click', function() {
    exportTableToExcel('myTable', 'exported_table');
});

function exportTableToExcel(tableId, filename = 'table') {
    const table = document.getElementById(tableId);

    // Convert table to workbook
    const workbook = XLSX.utils.table_to_book(table);

    // Convert workbook to Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the buffer
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.xlsx`;

    // Add the link to the document
    document.body.appendChild(link);

    // Simulate a click on the link to trigger the download
    link.click();

    // Clean up the link element
    document.body.removeChild(link);
}