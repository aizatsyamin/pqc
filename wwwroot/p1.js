$(document).ready(function() {
    // Initialize DataTable
    var table = $('#productTable').DataTable({
        "dom": 'rt<"d-flex justify-content-between mt-3"ip>', // Removes default search (f), keeps processing, table, info, pagination
        "pageLength": 10,
        "ordering": true,
        "columnDefs": [
            { "orderable": false, "targets": [0, 1, 8] } // Disables sorting on Checkbox, Image, and Actions columns
        ],
        "language": {
            "paginate": {
                "previous": "Previous",
                "next": "Next"
            }
        }
    });

    // Custom Search Input functionality
    $('#customSearch').on('keyup', function() {
        table.search(this.value).draw();
    });

    // Custom Dropdown Filters
    $('#filterCategory').on('change', function() {
        table.column(4).search(this.value).draw(); // Column index 4 is Category
    });

    $('#filterStatus').on('change', function() {
        table.column(6).search(this.value).draw(); // Column index 6 is Status
    });

    // Reset Filters Button
    $('#resetFilters').on('click', function() {
        $('#customSearch').val('');
        $('#filterCategory').val('');
        $('#filterStatus').val('');
        $('#filterSupplier').val('');
        table.search('').columns().search('').draw();
    });

    // Select All Checkbox logic
    $('#selectAll').on('click', function() {
        var isChecked = $(this).prop('checked');
        $('.row-check').prop('checked', isChecked);
    });
});