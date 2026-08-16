$(document).ready(function() {
    // Initialize DataTables
    var table = $('#warehouseTable').DataTable({
        "dom": 'rt<"d-flex justify-content-between align-items-center mt-3"ip>',
        "pageLength": 10,
        "ordering": true,
        "language": {
            "info": "Showing _START_ to _END_ of _TOTAL_ records",
            "paginate": { "previous": "<", "next": ">" }
        }
    });

    // Custom Search Function
    $('#customSearch').on('keyup', function() {
        table.search(this.value).draw();
    });

    // Custom Status Filter Function (Index 5 corresponds to the Status column)
    $('#filterStatus').on('change', function() {
        table.column(5).search(this.value).draw();
    });

    // Reset Filters Button
    $('#resetFilters').on('click', function() {
        $('#customSearch').val('');
        $('#filterStatus').val('');
        table.search('').columns().search('').draw();
    });
});