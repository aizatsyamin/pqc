$(document).ready(function () {
    // 1. Initial Mock Dataset Array structured exactly from your layout screen
    var stockData = [
        { sku: "SKU-001", name: "Tropicana Orange Juice 1L", category: "Beverages", qty: 480, reorder: 100, cost: "RM 4.50", value: "RM 2,160.00", movement: "15-Mar-2026", type: "down", status: "In Stock" },
        { sku: "SKU-002", name: "Dutch Lady Full Cream Milk 1L", category: "Dairy & Chilled", qty: 360, reorder: 120, cost: "RM 3.20", value: "RM 1,152.00", movement: "20-Mar-2026", type: "down", status: "In Stock" },
        { sku: "SKU-003", name: "Mister Potato Chips Original 60g", category: "Snacks & Confectionery", qty: 480, reorder: 240, cost: "RM 1.80", value: "RM 864.00", movement: "10-Mar-2026", type: "up", status: "In Stock" },
        { sku: "SKU-004", name: "Knife Pure Cooking Oil 5L", category: "Cooking Ingredients", qty: 200, reorder: 50, cost: "RM 22.90", value: "RM 4,580.00", movement: "22-Mar-2026", type: "down", status: "In Stock" },
        { sku: "SKU-005", name: "Kikkoman Soy Sauce 500ml", category: "Condiments & Sauces", qty: 288, reorder: 144, cost: "RM 5.90", value: "RM 1,699.20", movement: "08-Mar-2026", type: "up", status: "In Stock" },
        { sku: "SKU-006", name: "Spritzer Mineral Water 600ml", category: "Beverages", qty: 576, reorder: 240, cost: "RM 0.75", value: "RM 432.00", movement: "28-Mar-2026", type: "down", status: "In Stock" },
        { sku: "SKU-007", name: "Maggi Chicken Instant Noodles 75g", category: "Snacks & Confectionery", qty: 800, reorder: 400, cost: "RM 0.60", value: "RM 480.00", movement: "15-Mar-2026", type: "up", status: "In Stock" },
        { sku: "SKU-008", name: "Cap Buruh White Sugar 1kg", category: "Cooking Ingredients", qty: 85, reorder: 100, cost: "RM 2.90", value: "RM 246.50", movement: "25-Mar-2026", type: "down", status: "Low Stock" }
    ];

    // 2. Initialize DataTable Engine Instance
    var table = $('#stockMovementTable').DataTable({
        data: stockData,
        dom: 'tpi', // Hide default entry dropdown search bar layout
        pageLength: 10,
        ordering: true,
        columns: [
            { data: 'sku', className: 'ps-4 text-primary fw-bold' },
            { data: 'name', className: 'text-dark' },
            { data: 'category' },
            { data: 'qty' },
            { data: 'reorder' },
            { data: 'cost' },
            { data: 'value' },
            { 
                data: 'movement',
                render: function(data, type, row) {
                    // Injecting visual movement directional arrows matching your table screen
                    var colorClass = row.type === 'up' ? 'text-success' : 'text-danger';
                    var arrow = row.type === 'up' ? '&uarr;' : '&darr;';
                    return `<span class="${colorClass} me-1 fw-bold">${arrow}</span> <span class="text-muted small">${data}</span>`;
                }
            },
            { 
                data: 'status',
                className: 'pe-4',
                render: function(data) {
                    // Conditional Badge Class injection logic with FORCED text override color rules
                    if (data === 'In Stock') {
                        return `<span class="badge bg-success" style="color: #000000 !important; font-weight: 600; min-width: 80px; display:inline-block;">In Stock</span>`;
                    } else if (data === 'Low Stock') {
                        return `<span class="badge bg-warning" style="color: #000000 !important; font-weight: 600; min-width: 80px; display:inline-block;">Low Stock</span>`;
                    }
                    return `<span class="badge bg-secondary" style="color: #000000 !important;">${data}</span>`;
                }
            }
        ]
    });

    // 3. Bind External Input Triggers into custom filtering queries
    $('#customSearchInput').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#filterStatus').on('change', function () {
        table.column(8).search(this.value).draw();
    });

    $('#filterCategory').on('change', function () {
        table.column(2).search(this.value).draw();
    });
});
