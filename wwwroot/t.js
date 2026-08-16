$(document).ready(function() {
    // Initialize DataTables for Tax Management
    var taxTable = $('#taxTable').DataTable({
        "dom": 'rt<"d-flex justify-content-between align-items-center mt-3"ip>',
        "pageLength": 10,
        "ordering": true,
        "columnDefs": [
            { "orderable": false, "targets": [6] } // Disable sorting on Actions column
        ],
        "language": {
            "info": "Showing _START_ to _END_ of _TOTAL_ records",
            "paginate": { "previous": "<", "next": ">" }
        }
    });

    // Custom Search Function
    $('#customSearch').on('keyup', function() {
        taxTable.search(this.value).draw();
    });

    // Custom Type Filter (Index 2 corresponds to the Tax Type column)
    $('#filterType').on('change', function() {
        taxTable.column(2).search(this.value).draw();
    });

    // Custom Status Filter (Index 5 corresponds to the Status column)
    $('#filterStatus').on('change', function() {
        taxTable.column(5).search(this.value).draw();
    });

    // Reset Filters Button
    $('#resetFilters').on('click', function() {
        $('#customSearch').val('');
        $('#filterType').val('');
        $('#filterStatus').val('');
        taxTable.search('').columns().search('').draw();
    });
});