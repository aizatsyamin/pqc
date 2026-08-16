$(document).ready(function() {
    // 1. Initialize DataTable
    var table = $('#categoryTable').DataTable({
        // 'rt' = table, 'i' = info (Showing 1 to 10...), 'p' = pagination
        "dom": 'rt<"d-flex justify-content-between align-items-center mt-3"ip>',
        "pageLength": 10,
        "ordering": true,
        "columnDefs": [
            { "orderable": false, "targets": [0, 7] } // Disable sorting on Checkbox and Actions
        ],
        "language": {
            // Customize info text to match Figma exactly
            "info": "Showing _START_ to _END_ of _TOTAL_ records",
            "paginate": {
                "previous": "<", // You can use icons here if preferred
                "next": ">"
            }
        }
    });

    // 2. Custom Search Input functionality
    $('#customSearch').on('keyup', function() {
        table.search(this.value).draw();
    });

    // 3. Custom Dropdown Filters
    $('#filterCategory').on('change', function() {
        table.column(3).search(this.value).draw(); // Parent Category column
    });

    $('#filterStatus').on('change', function() {
        table.column(5).search(this.value).draw(); // Status column
    });

    // 4. Reset Filters Button
    $('#resetFilters').on('click', function() {
        $('#customSearch').val('');
        $('#filterCategory').val('');
        $('#filterStatus').val('');
        table.search('').columns().search('').draw();
    });

    // 5. Select All Checkbox logic
    $('#selectAll').on('click', function() {
        var isChecked = $(this).prop('checked');
        $('.row-check').prop('checked', isChecked);
    });

    // 6. Handle the "Add category" button click inside the drawer
    $('#saveCategoryBtn').on('click', function() {
        // Find the offcanvas element
        var myOffcanvas = document.getElementById('addCategoryDrawer');
        // Get the Bootstrap offcanvas instance
        var bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);
        
        // Hide the side drawer
        bsOffcanvas.hide();

        // Wait a tiny bit for the drawer animation to finish, then show the success modal
        setTimeout(function() {
            var myModal = new bootstrap.Modal(document.getElementById('successModal'));
            myModal.show();
        }, 400); // 400ms delay feels natural
    });
});