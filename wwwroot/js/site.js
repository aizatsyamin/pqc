// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//dataTables
const tableMain = new DataTable('#tableMain', {
    layout: {
        topStart: null,
        topEnd: null,
    },
    scrollCollapse: true,
    scrollX: true,
    scrollY: "100%",
    search: false,
    "columnDefs": [{
        "targets": [4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18],
        "visible": false
    },
    {
        searchable: false,
        orderable: false,
        targets: [0, 19]
    }],
    order: [[1, 'asc']],
    fixedColumns: {
        start: 2,
        end: 0
    },
});

tableMain.on('order.dt search.dt', function () {
    let i = 1;

    tableMain
        .cells(null, 0, { search: 'applied', order: 'applied' })
        .every(function (cell) {
            this.data(i++);
        });
}).draw();

$('#myInputTextField').keyup(function () {
    tableMain.column(1).search($(this).val()).draw();
})

document.querySelectorAll('td.toggle-vis').forEach((el) => {
    el.addEventListener('click', function (e) {
        e.preventDefault();

        var columnIdxs = e.target.getAttribute('data-column').split(",");
        var column = tableMain.column(columnIdxs[0]);
        var columns = tableMain.columns(columnIdxs);
        // Toggle the visibility
        columns.visible(!column.visible());
    });
});


const tableITD = new DataTable('#tableITD', {
    responsive: true,
    layout: {
        topStart: null,
        topEnd: null,
    }
});

tableITD.on('click', 'tbody tr', (e) => {
    let classList = e.currentTarget.classList;

    if (classList.contains('selected')) {
        classList.remove('selected');
    }
    else {
        tableITD.rows('.selected').nodes().each((row) => row.classList.remove('selected'));
        classList.add('selected');
    }
});

$('.btn-itdTeam').bind('click', function () {
    console.log(tableITD.row('.selected').data());
});

//Select ITD Team
function selTeam() {
    $('#teamModal').modal('show');
}