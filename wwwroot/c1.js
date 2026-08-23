$(document).ready(function () {
    // 1. Mock Data for Stock Movement History
    const mockMovementList = [
        {
            referenceNo: "PO-2026-001",
            companyOrLocation: "Fresh Fields Sdn Bhd",
            sku: "SKU-001",
            productName: "Tropicana Orange Juice 1L",
            quantity: 600,
            purpose: "Purchase Order",
            movementType: "Stock In",
            category: "Beverages",
            status: "In Stock",
            breakBulk: false,
            date: "15-Mar-2026",
            companyName: "Fresh Fields Sdn Bhd",
            performedBy: "Ahmad Razlan",
            remarks: "Initial warehouse stock arrival"
        },
        {
            referenceNo: "PO-2026-002",
            companyOrLocation: "FoodServe Holdings Bhd",
            sku: "SKU-002",
            productName: "Dutch Lady Full Cream Milk 1L",
            quantity: 480,
            purpose: "Purchase Order",
            movementType: "Stock In",
            category: "Dairy",
            status: "In Stock",
            breakBulk: false,
            date: "24-Aug-2026",
            companyName: "FoodServe Holdings Bhd",
            performedBy: "Siti Sarah",
            remarks: "Scheduled bulk delivery"
        },
        {
            referenceNo: "PO-2026-003",
            companyOrLocation: "Snack World Distributors",
            sku: "SKU-003",
            productName: "Mister Potato Chips Original 150g",
            quantity: 480,
            purpose: "Purchase Order",
            movementType: "Stock In",
            category: "Snacks",
            status: "In Stock",
            breakBulk: false,
            date: "10-Mar-2026",
            companyName: "Snack World Distributors",
            performedBy: "Chong Wei",
            remarks: "Restock for Central Hub"
        },
        {
            referenceNo: "PO-2026-004",
            companyOrLocation: "Culinary Essentials Bhd",
            sku: "SKU-004",
            productName: "Knife Pure Cooking Oil 5L",
            quantity: 250,
            purpose: "Purchase Order",
            movementType: "Stock In",
            category: "Cooking Ingredients",
            status: "In Stock",
            breakBulk: false,
            date: "05-Mar-2026",
            companyName: "Culinary Essentials Bhd",
            performedBy: "Razlan Nordin",
            remarks: "Bulk oil supply to JB Distribution Hub"
        },
        {
            referenceNo: "PO-2026-005",
            companyOrLocation: "Umami Trading Co.",
            sku: "SKU-005",
            productName: "Kikkoman Soy Sauce 500ml",
            quantity: 288,
            purpose: "Purchase Order",
            movementType: "Stock In",
            category: "Sauces & Condiments",
            status: "In Stock",
            breakBulk: false,
            date: "08-Mar-2026",
            companyName: "Umami Trading Co.",
            performedBy: "Farid Kamil",
            remarks: "Standard import restocking"
        },
        {
            referenceNo: "PO-2026-006",
            companyOrLocation: "Aqua Pacific Distributors",
            sku: "SKU-006",
            productName: "Spritzer Mineral Water 600ml",
            quantity: 624,
            purpose: "Purchase Order",
            movementType: "Stock In",
            category: "Beverages",
            status: "In Stock",
            breakBulk: false,
            date: "28-Mar-2026",
            companyName: "Aqua Pacific Distributors",
            performedBy: "Siti Sarah",
            remarks: "High demand beverage supply"
        },
        {
            referenceNo: "PO-2026-007",
            companyOrLocation: "Nestle Malaysia Sdn Bhd",
            sku: "SKU-007",
            productName: "Maggi Chicken Instant Noodles 75g",
            quantity: 800,
            purpose: "Purchase Order",
            movementType: "Stock In",
            category: "Snacks & Confectionery",
            status: "In Stock",
            breakBulk: false,
            date: "15-Mar-2026",
            companyName: "Nestle Malaysia Sdn Bhd",
            performedBy: "Razlan Nordin",
            remarks: "Carton bulk batch"
        },
        {
            referenceNo: "PO-2026-008",
            companyOrLocation: "Tradewinds Sugar Mill Sdn Bhd",
            sku: "SKU-008",
            productName: "Cap Buruh White Sugar 1kg",
            quantity: 200,
            purpose: "Purchase Order",
            movementType: "Stock In",
            category: "Cooking Ingredients",
            status: "In Stock",
            breakBulk: false,
            date: "25-Mar-2026",
            companyName: "Tradewinds Sugar Mill Sdn Bhd",
            performedBy: "Chong Wei",
            remarks: "Standard reorder"
        },
        {
            referenceNo: "SO-2026-010",
            companyOrLocation: "Freshmart Superstore",
            sku: "SKU-001",
            productName: "Tropicana Orange Juice 1L",
            quantity: -120,
            purpose: "Sales Order",
            movementType: "Stock Out",
            category: "Beverages",
            status: "In Stock",
            breakBulk: false,
            date: "16-Mar-2026",
            companyName: "Freshmart Superstore",
            performedBy: "Ahmad Razlan",
            remarks: "Fulfillment for outlet branch"
        },
        {
            referenceNo: "SO-2026-015",
            companyOrLocation: "Jaya Grocer Sdn Bhd",
            sku: "SKU-002",
            productName: "Dutch Lady Full Cream Milk 1L",
            quantity: -120,
            purpose: "Sales Order",
            movementType: "Stock Out",
            category: "Dairy",
            status: "In Stock",
            breakBulk: false,
            date: "25-Aug-2026",
            companyName: "Jaya Grocer Sdn Bhd",
            performedBy: "Farid Kamil",
            remarks: "Store dispatch"
        },
        {
            referenceNo: "SO-2026-020",
            companyOrLocation: "Hotel Grand Millennium",
            sku: "SKU-004",
            productName: "Knife Pure Cooking Oil 5L",
            quantity: -50,
            purpose: "Sales Order",
            movementType: "Stock Out",
            category: "Cooking Ingredients",
            status: "In Stock",
            breakBulk: false,
            date: "06-Mar-2026",
            companyName: "Hotel Grand Millennium",
            performedBy: "Razlan Nordin",
            remarks: "Monthly commercial contract delivery"
        },
        {
            referenceNo: "IU-2026-001",
            companyOrLocation: "-",
            sku: "SKU-006",
            productName: "Spritzer Mineral Water 600ml",
            quantity: -48,
            purpose: "Internal Usage",
            movementType: "Stock Out",
            category: "Beverages",
            status: "In Stock",
            breakBulk: false,
            date: "30-Mar-2026",
            companyName: "HQ Pantry",
            performedBy: "Admin Staff",
            remarks: "Internal corporate townhall supplies"
        },
        {
            referenceNo: "IU-2026-002",
            companyOrLocation: "-",
            sku: "SKU-008",
            productName: "Cap Buruh White Sugar 1kg",
            quantity: -15,
            purpose: "Internal Usage",
            movementType: "Stock Out",
            category: "Cooking Ingredients",
            status: "In Stock",
            breakBulk: false,
            date: "26-Mar-2026",
            companyName: "Cafeteria Service",
            performedBy: "Admin Staff",
            remarks: "Kitchen usage replenishment"
        },
        {
            referenceNo: "TRF-2026-001",
            companyOrLocation: "JB Distribution Hub → KL Main Warehouse",
            sku: "SKU-004",
            productName: "Knife Pure Cooking Oil 5L",
            quantity: -30,
            purpose: "Stock Transfer Out",
            movementType: "Transfer Out",
            category: "Cooking Ingredients",
            status: "In Stock",
            breakBulk: false,
            date: "12-Mar-2026",
            companyName: "KL Main Warehouse",
            performedBy: "Razlan Nordin",
            remarks: "Inter-branch transfer to balance regional stock"
        },
        {
            referenceNo: "TRF-2026-002",
            companyOrLocation: "JB Distribution Hub → KL Main Warehouse",
            sku: "SKU-004",
            productName: "Knife Pure Cooking Oil 5L",
            quantity: 30,
            purpose: "Stock Transfer In",
            movementType: "Transfer In",
            category: "Cooking Ingredients",
            status: "In Stock",
            breakBulk: false,
            date: "13-Mar-2026",
            companyName: "JB Distribution Hub",
            performedBy: "Chong Wei",
            remarks: "Received inter-branch transfer delivery"
        }
    ];

    // 2. Populate SKU Dropdown dynamically from Mock Data
    const uniqueSkus = [...new Set(mockMovementList.map(item => item.sku))];
    uniqueSkus.forEach(sku => {
        $('#filterSku').append(new Option(sku, sku));
    });

    // 3. Initialize DataTable with Mock Dataset
    const table = $('#stockMovementTable').DataTable({
        data: mockMovementList,
        dom: 't<"d-flex justify-content-between align-items-center mt-3"p>',
        pageLength: 10,
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
        ],
        drawCallback: function () {
            const info = this.api().page.info();
            $('#recordCount').text(info.recordsDisplay + ' records');
        }
    });

    // 4. Custom Filters Binding
    $('#customSearch').on('keyup', function () {
        table.search(this.value).draw();
    });

    $('#filterMovementType').on('change', function () {
        table.column(6).search(this.value).draw();
    });

    $('#filterSku').on('change', function () {
        table.column(2).search(this.value).draw();
    });

    // 5. Open Offcanvas & Populate Details from Mock Data
    $('#stockMovementTable').on('click', '.btn-view-movement', function () {
        const refNo = $(this).data('ref');
        const record = mockMovementList.find(item => item.referenceNo === refNo);

        if (record) {
            // Stock Details
            $('#dtlSku').val(record.sku || '-');
            $('#dtlProductName').val(record.productName || '-');
            $('#dtlCategory').val(record.category || '-');
            $('#dtlStatus').val(record.status || '-');
            $('#dtlBreakBulk').val(record.breakBulk ? 'Yes' : 'No');

            // Movement Details
            $('#dtlMovementType').val(record.movementType || '-');
            $('#dtlDate').val(record.date || '-');
            $('#dtlRefNo').val(record.referenceNo || '-');
            $('#dtlCompanyName').val(record.companyName || '-');
            $('#dtlQty').val(record.quantity > 0 ? '+' + record.quantity + ' units' : record.quantity + ' units');
            $('#dtlPurpose').val(record.purpose || '-');
            $('#dtlPerformedBy').val(record.performedBy || '-');
            $('#dtlRemarks').val(record.remarks || '-');

            // Set badge/text accent color dynamically
            if (record.movementType === 'Stock In') {
                $('#dtlMovementType').attr('class', 'form-control form-control-sm bg-light text-success fw-bold');
            } else if (record.movementType === 'Stock Out') {
                $('#dtlMovementType').attr('class', 'form-control form-control-sm bg-light text-danger fw-bold');
            } else {
                $('#dtlMovementType').attr('class', 'form-control form-control-sm bg-light text-warning fw-bold');
            }

            // Show Offcanvas
            const offcanvasEl = document.getElementById('movementDetailOffcanvas');
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
            bsOffcanvas.show();
        }
    });
});
