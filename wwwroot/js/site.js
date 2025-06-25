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

$('#header-search-input').keyup(function () {
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
    },
    "columnDefs": [{
        "targets": [0],
        "visible": false
    },
    {
        searchable: false,
        orderable: false,
        targets: [0]
    }]
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

$('#modal-searchbar-input').keyup(function () {
    tableITD.column(1).search($(this).val()).draw();
})

$('.btn-itdTeam').bind('click', function () {
    $("#inputITDTeam").val(tableITD.row('.selected').data()[1])
    $("#teamModal").modal("hide")
});

//Select ITD Team
function selTeam() {
    $('#teamModal').modal('show');
}


//Form Step
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "flex";
    $(".form-footer").removeClass("float-right");

    $("#nextBtn").removeClass("button-primary");

    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        $("#nextBtn").removeClass("button-primary")
        $(".form-footer").addClass("float-right");
        document.getElementById("prevBtn").style.display = "none";
    } else {
        $("#nextBtn").removeClass("button-primary")
        $("#nextBtn").addClass("button-secondary");
        document.getElementById("prevBtn").style.display = "flex";
    }
    if (n == (x.length - 1)) {
        $("#nextBtn").removeClass("button-secondary");
        $("#nextBtn").addClass("button-primary");
        document.getElementById("nextBtn").innerHTML = '<span class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M18 4V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H14L18 4ZM9 15C9.83333 15 10.5417 14.7083 11.125 14.125C11.7083 13.5417 12 12.8333 12 12C12 11.1667 11.7083 10.4583 11.125 9.875C10.5417 9.29167 9.83333 9 9 9C8.16667 9 7.45833 9.29167 6.875 9.875C6.29167 10.4583 6 11.1667 6 12C6 12.8333 6.29167 13.5417 6.875 14.125C7.45833 14.7083 8.16667 15 9 15ZM3 7H12V3H3V7Z" fill="white"/></svg></span><span class="button-text">Save Entry</span>';
    } else {
        $("#nextBtn").removeClass("button-primary")
        $("#nextBtn").addClass("button-secondary");
        document.getElementById("nextBtn").innerHTML = '<span class="button-text">Next</span><span class="button-icon"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.6024 9.9443L1.92021 17.5L0 15.6114L6.72209 9L0 2.38859L1.92021 0.5L9.6024 8.0557C9.85698 8.30617 10 8.64584 10 9C10 9.35416 9.85698 9.69383 9.6024 9.9443Z" fill="black"/></svg></span>';
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !$("#regForm").valid()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

//function validateForm() {
//    // This function deals with validation of the form fields
//    var x, y, i, valid = true;
//    x = document.getElementsByClassName("tab");
//    y = x[currentTab].getElementsByTagName("input");
//    // A loop that checks every input field in the current tab:
//    for (i = 0; i < y.length; i++) {
//        // If a field is empty...
//        if (y[i].value == "") {
//            // add an "invalid" class to the field:
//            y[i].className += " invalid";
//            // and set the current valid status to false:
//            valid = false;
//        }
//    }

//    valid = true
//    // If the valid status is true, mark the step as finished and valid:
//    if (valid) {
//        document.getElementsByClassName("step")[currentTab].className += " finish";
//        document.getElementsByClassName("form-step-item")[currentTab].className += " finish";
//        $(".form-step-item").eq(currentTab).removeClass("active");
//    }
//    return valid; // return the valid status
//}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
    $(".form-step-item").removeClass("active");
    $(".form-step-item").eq(n).addClass("active");
}

function goToAdd() {
    window.location.href = "/Add";
}

function openCat(n) {
    $(".cat" + n).show();
    $(".catB" + n).hide();
}

function closeCat(n) {
    $(".cat" + n).hide();
    $(".catB" + n).show();
}

function checkCat(sel,n) {
    var ischeck = $(sel).is(':checked');
    if (ischeck) {
        $(".cat" + n).hide();
        $(".catB" + n).hide();
        $(".catD" + n).hide();
        $(".ctI" + n).addClass("disabled");
        $(".ctT" + n).addClass("disabled");
    } else {
        $(".cat" + n).hide();
        $(".catB" + n).show();
        $(".catD" + n).show();
        $(".ctI" + n).removeClass("disabled");
        $(".ctT" + n).removeClass("disabled");
    }
}