$(document).ready(function () {
    // 1. Mock Summary Dataset
    const mockSummaryList = [
        { location: "KL Main Warehouse", totalQty: 1686 },
        { location: "JB Distribution Hub", totalQty: 1090 },
        { location: "Penang Cold Room", totalQty: 373 },
        { location: "KL Cold Room", totalQty: 120 }
    ];

    // 2. Mock Detail Dataset
    const mockDetailList = [
        {
            location: "KL Main Warehouse",
            sku: "SKU-001",
            productName: "Tropicana Orange Juice 1L",
            batchLotNo: "BATCH-TJ-2026-03",
            expiryDate: "30-Sep-2026",
            barcode: "9556068001000",
            batchQty: 100
        },
        {
            location: "KL Main Warehouse",
            sku: "SKU-001",
            productName: "Tropicana Orange Juice 1L",
            batchLotNo: "BATCH-TJ-2026-04",
            expiryDate: "31-Oct-2026",
            barcode: "9556068001001",
            batchQty: 200
        },
        {
            location: "JB Distribution Hub",
            sku: "SKU-001",
            productName: "Tropicana Orange Juice 1L",
            batchLotNo: "BATCH-TJ-2026-05",
            expiryDate: "30-Nov-2026",
            barcode: "9556068001002",
            batchQty: 180
        },
        {
            location: "Penang Cold Room",
            sku: "SKU-002",
            productName: "Dutch Lady Full Cream Milk 1L",
            batchLotNo: "BATCH-DL-2026-03",
            expiryDate: "30-Jun-2026",
            barcode: "9556789002000",
            batchQty: 80
        },
        {
            location: "Penang Cold Room",
            sku: "SKU-002",
            productName: "Dutch Lady Full Cream Milk 1L",
            batchLotNo: "BATCH-DL-2026-04",
            expiryDate: "15-Jul-2026",
            barcode: "9556789002001",
            batchQty: 160
        },
        {
            location: "KL Cold Room",
            sku: "SKU-002",
            productName: "Dutch Lady Full Cream Milk 1L",
            batchLotNo: "BATCH-DL-2026-05",
            expiryDate: "01-Aug-2026",
            barcode: "9556789002002",
            batchQty: 120
        },
        {
            location: "KL Main Warehouse",
            sku: "SKU-003",
            productName: "Mister Potato Chips Original 60g",
            batchLotNo: "BATCH-MP-2026-03",
            expiryDate: "31-Mar-2027",
            barcode: "9556012003001",
            batchQty: 300
        },
        {
            location: "JB Distribution Hub",
            sku: "SKU-003",
            productName: "Mister Potato Chips Original 60g",
            batchLotNo: "BATCH-MP-2026-04",
            expiryDate: "30-Jun-2027",
            barcode: "9556012003002",
            batchQty: 180
        }
    ];

    // 3. Render Summary Table
    let grandTotal = 0;
    let summaryHtml = '';
    mockSummaryList.forEach(item => {
        grandTotal += item.totalQty;
        summaryHtml += `
            <tr>
                <td class="ps-3 py-2 text-dark">
                    <i class="bi bi-geo-alt-fill text-danger me-2"></i>\${item.location}
                </td>
                <td class="text-end pe-3 py-2 fw-semibold">\${item.totalQty.toLocaleString()}</td>
            </tr>
        `;
    });
    $('#summaryTableBody').html(summaryHtml);
    $('#grandTotalQty').text(grandTotal.toLocaleString());

    // 4. Populate Dropdowns dynamically
    const locations = [...new Set(mockDetailList.map(item => item.location))];
    locations.forEach(loc => $('#filterLocation').append(new Option(loc, loc)));

    const skus = [...new Set(mockDetailList.map(item => item.sku))];
    skus.forEach(sku => $('#filterSku').append(new Option(sku, sku)));

    const expiries = [...new Set(mockDetailList.map(item => item.expiryDate))];
    expiries.forEach(exp => $('#filterExpiry').append(new Option(exp, exp)));

    // 5. Initialize DataTable
    const table = $('#stockLocationDetailTable').DataTable({
        data: mockDetailList,
        dom: 't<"d-flex justify-content-between align-items-center mt-3"ip>',
        pageLength: 8,
        language: {
            info: "Showing _START_-_END_ of _TOTAL_ records",
            paginate: {
                previous: '<i class="bi bi-chevron-left"></i>',
                next: '<i class="bi bi-chevron-right"></i>'
            }
        },
        columns: [
            {
                data: 'location',
                render: function (data) {
                    return `<i class="bi bi-geo-alt-fill text-danger me-1"></i>\${data}`;
                }
            },
            { data: 'sku' },
            { data: 'productName' },
            { data: 'batchLotNo' },
            { data: 'expiryDate' },
            { data: 'barcode' },
            {
                data: 'batchQty',
                className: 'text-end fw-semibold',
                render: function (data) {
                    return data.toLocaleString();
                }
            }
        ]
    });

    // 6. Custom Filters
    $('#customSearch').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#filterLocation').on('change', function () {
        table.column(0).search(this.value ? '^' + this.value + '$' : '', true, false).draw();
    });

    $('#filterSku').on('change', function () {
        table.column(1).search(this.value ? '^' + this.value + '$' : '', true, false).draw();
    });

    $('#filterExpiry').on('change', function () {
        table.column(4).search(this.value ? '^' + this.value + '$' : '', true, false).draw();
    });

    $('#btnExport').on('click', function () {
        alert('Export triggered for Inventory Stock Location.');
    });
});
