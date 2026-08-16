$(document).ready(function() {
    // Initialize DataTables for Supplier Management
    var supplierTable = $('#supplierTable').DataTable({
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
        supplierTable.search(this.value).draw();
    });

    // Custom Status Filter Function (If you had a status column, it would go here. 
    // Since there isn't a status column in s1.png, we can filter using a hidden column or leave it for backend)
    
    // Reset Filters Button
    $('#resetFilters').on('click', function() {
        $('#customSearch').val('');
        $('#filterStatus').val('');
        supplierTable.search('').columns().search('').draw();
    });
});