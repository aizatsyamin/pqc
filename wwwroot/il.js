$(document).ready(function() {
    // 1. Initialize DataTable
    var table = $('#inventoryListTable').DataTable({
        "dom": 'rt<"d-flex justify-content-between align-items-center mt-3"ip>',
        "pageLength": 10,
        "ordering": true,
        "columnDefs": [
            { "orderable": false, "targets": [0] } // Disable sorting on Image
        ],
        "language": {
            "info": "Showing _START_ to _END_ of _TOTAL_ records",
            "paginate": { "previous": "<", "next": ">" }
        }
    });

    // 2. Custom Filters logic
    $('#customSearch').on('keyup', function() { table.search(this.value).draw(); });
    $('#filterCategory').on('change', function() { table.column(3).search(this.value).draw(); });
    $('#filterLocation').on('change', function() { table.column(4).search(this.value).draw(); });
    
    $('#resetFilters').on('click', function() {
        $('#customSearch').val('');
        $('#filterCategory').val('');
        $('#filterLocation').val('');
        table.search('').columns().search('').draw();
    });

    // 3. Logic for "Adjust Stock" Drawer Calculator
    const currentAdjustStock = 2403; // In a real app, populate this dynamically per row clicked

    function calculateAdjustment() {
        let adjValue = parseInt($('#adjQuantity').val()) || 0;
        let isIncrease = $('#adjIncrease').is(':checked');
        let newStock = isIncrease ? (currentAdjustStock + adjValue) : (currentAdjustStock - adjValue);
        
        // Prevent negative stock visually
        if (newStock < 0) newStock = 0; 
        
        // Format with comma
        $('#afterAdjStockDisplay').text(newStock.toLocaleString());
    }

    $('#adjQuantity').on('input', calculateAdjustment);
    $('input[name="adjType"]').on('change', calculateAdjustment);

    // 4. Logic for "Transfer Stock" Drawer Calculator
    const currentTransferAvailable = 2403; // In a real app, populate dynamically

    $('#transQuantity').on('input', function() {
        let transferValue = parseInt($(this).val()) || 0;
        let remaining = currentTransferAvailable - transferValue;
        
        if (remaining < 0) remaining = 0;
        
        $('#remainingStockDisplay').text(remaining.toLocaleString());
    });
});