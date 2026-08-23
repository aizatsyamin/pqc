$(document).ready(function () {
    const table = $('#stockMovementTable').DataTable({
        processing: true,
        serverSide: false,
        dom: 't<"d-flex justify-content-between align-items-center mt-3"p>',
        ajax: {
            url: window.contextPath + '/getStockMovementHistory',
            type: 'GET',
            dataSrc: function (json) {
                $('#recordCount').text((json.data ? json.data.length : 0) + ' records');
                return json.data || [];
            }
        },
        columns: [
            {
                data: 'referenceNo',
                render: function (data) {
                    return '<a href="javascript:void(0);" class="text-decoration-none text-primary fw-bold btn-view-movement" data-ref="' + data + '">' + data + '</a>';
                }
            },
            { data: 'companyOrLocation' },
            { data: 'sku' },
            { data: 'productName' },
            {
                data: 'quantity',
                className: 'text-center fw-bold',
                render: function (data) {
                    const val = parseInt(data, 10);
                    const colorClass = val > 0 ? 'text-success' : 'text-danger';
                    const prefix = val > 0 ? '+' : '';
                    return '<span class="' + colorClass + '">' + prefix + data + '</span>';
                }
            },
            { data: 'purpose' },
            {
                data: 'movementType',
                className: 'text-center',
                render: function (data) {
                    let badgeClass = 'bg-secondary-subtle text-secondary';
                    if (data === 'Stock In') badgeClass = 'bg-success-subtle text-success border border-success-subtle';
                    else if (data === 'Stock Out') badgeClass = 'bg-danger-subtle text-danger border border-danger-subtle';
                    else if (data.includes('Transfer')) badgeClass = 'bg-warning-subtle text-warning border border-warning-subtle';
                    
                    return '<span class="badge rounded-pill ' + badgeClass + ' px-2 py-1">' + data + '</span>';
                }
            }
        ]
    });

    // Custom Filters
    $('#customSearch').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#filterMovementType').on('change', function () {
        table.column(6).search(this.value).draw();
    });

    $('#filterSku').on('change', function () {
        table.column(2).search(this.value).draw();
    });

    // Open Offcanvas & Load Details
    $('#stockMovementTable').on('click', '.btn-view-movement', function () {
        const refNo = $(this).data('ref');
        
        $.ajax({
            url: window.contextPath + '/getStockMovementDetail',
            type: 'GET',
            data: { referenceNo: refNo },
            success: function (res) {
                // Stock Details Section
                $('#dtlSku').val(res.sku || '-');
                $('#dtlProductName').val(res.productName || '-');
                $('#dtlCategory').val(res.category || '-');
                $('#dtlStatus').val(res.status || '-');
                $('#dtlBreakBulk').val(res.breakBulk ? 'Yes' : 'No');

                // Movement Details Section
                $('#dtlMovementType').val(res.movementType || '-');
                $('#dtlDate').val(res.date || '-');
                $('#dtlRefNo').val(res.referenceNo || '-');
                $('#dtlCompanyName').val(res.companyName || '-');
                $('#dtlQty').val(res.quantity ? (res.quantity > 0 ? '+' + res.quantity + ' units' : res.quantity + ' units') : '-');
                $('#dtlPurpose').val(res.purpose || '-');
                $('#dtlPerformedBy').val(res.performedBy || '-');
                $('#dtlRemarks').val(res.remarks || '-');

                // Show Offcanvas
                const offcanvasEl = document.getElementById('movementDetailOffcanvas');
                const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
                bsOffcanvas.show();
            }
        });
    });
});
