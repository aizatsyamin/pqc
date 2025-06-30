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
        //document.getElementById("regForm").submit();
        regFormSubmit();
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
    $(".cat" + n).css('display', 'flex');
    $(".catB" + n).hide();
}

function closeCat(n) {
    $(".cat" + n).hide();
    $(".catB" + n).show();
}

function checkCat(sel, n) {
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

//Cat1

function openCat1() {
    $(".catB1").hide();

    var rLength = $(".catF1").length;
    var l = rLength + 1;

    var contentCat = `<div class="category-form catF1 cat1-` + l + `">
                                <div class="form-field">
                                    <label class="form-text-label">
                                        Purpose / Use
                                    </label>
                                    <div class="form-group-radio">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC1Use-` + l + `" id="radioC1Use1" value="Encryption" required>
                                            <label class="form-check-label" for="radioC1Use1">
                                                Encryption
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC1Use-` + l + `" id="radioC1Use2" value="Message Authentication" required>
                                            <label class="form-check-label" for="radioC1Use2">
                                                Message Authentication
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC1Use-` + l + `" id="radioC1Use3" value="Others" required>
                                            <label class="form-check-label" for="radioC1Use3">
                                                Others
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-field">
                                    <label class="form-text-label">
                                        Modes
                                    </label>
                                    <select class="form-select" name="selectC1Modes-` + l + `" required> 
                                        <option value="">Select</option>
                                        <option value="AES">AES</option>
                                        <option value="3DEA/TDEA">3DEA/TDEA</option>
                                        <option value="ECB">ECB</option>
                                        <option value="CBC">CBC</option>
                                        <option value="CFB">CFB</option>
                                        <option value="OFB">OFB</option>
                                        <option value="CTR">CTR</option>
                                        <option value="GCM">GCM</option>
                                        <option value="CCM">CCM</option>
                                        <option value="XTS">XTS</option>
                                    </select>
                                </div>

                                <div class="form-field">
                                    <label class="form-text-label">
                                        Key Length
                                    </label>
                                    <div class="form-group-radio">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC1KeyLength-` + l + `" id="radioC1KeyLength1" value="128 bit" required>
                                            <label class="form-check-label" for="radioC1KeyLength1">
                                                128 bit
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC1KeyLength-` + l + `" id="radioC1KeyLength2" value="256 bit" required>
                                            <label class="form-check-label" for="radioC1KeyLength2">
                                                256 bit
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC1KeyLength-` + l + `" id="radioC1KeyLength3" value="Others"" required>
                                            <label class="form-check-label" for="radioC1KeyLength3">
                                                Others
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <button type="button" class="button button-secondary btn-closeCat1-` + l + `" onclick="closeCat1(` + l + `)">
                                        <span class="button-text">Cancel</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-secondary btn-closeCatE1-` + l + `" onclick="closeCatE1(` + l + `)" style="display:none;">
                                        <span class="button-text">Delete</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-primary btn-saveCat1-` + l + `" onclick="saveCat1(` + l + `)">
                                        <span class="button-text">Save</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M18 4V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H14L18 4ZM9 15C9.83333 15 10.5417 14.7083 11.125 14.125C11.7083 13.5417 12 12.8333 12 12C12 11.1667 11.7083 10.4583 11.125 9.875C10.5417 9.29167 9.83333 9 9 9C8.16667 9 7.45833 9.29167 6.875 9.875C6.29167 10.4583 6 11.1667 6 12C6 12.8333 6.29167 13.5417 6.875 14.125C7.45833 14.7083 8.16667 15 9 15ZM3 7H12V3H3V7Z" fill="white" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-secondary btn-editCat1-` + l + `" onclick="editCat1(` + l + `)" style="display:none;">
                                        <span class="button-text">Edit</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M0.5 15.5V11.9583L11.5 0.979167C11.6667 0.826389 11.8508 0.708333 12.0525 0.625C12.2542 0.541667 12.4658 0.5 12.6875 0.5C12.9092 0.5 13.1244 0.541667 13.3333 0.625C13.5422 0.708333 13.7228 0.833333 13.875 1L15.0208 2.16667C15.1875 2.31944 15.3092 2.5 15.3858 2.70833C15.4625 2.91667 15.5006 3.125 15.5 3.33333C15.5 3.55556 15.4619 3.7675 15.3858 3.96917C15.3097 4.17083 15.1881 4.35472 15.0208 4.52083L4.04167 15.5H0.5ZM12.6667 4.5L13.8333 3.33333L12.6667 2.16667L11.5 3.33333L12.6667 4.5Z" fill="black"/>
                                            </svg>
                                            </span>
                                   </button>
                                </div>
                            </div>`

    $(".category-add-cat1").append(contentCat);
}

function saveCat1(l) {
    if (!$("#regForm").valid()) return false;

    $(".cat1-" + l).addClass("rOnly");
    $(".cat1-" + l + " input").prop("disabled", true);
    $(".cat1-" + l + " select").prop("disabled", true);
    $(".catB1").show();

    $(".btn-saveCat1-" + l).hide()
    $(".btn-closeCat1-" + l).hide()
    $(".btn-editCat1-" + l).show()
    $(".btn-closeCatE1-" + l).hide()
}

function closeCat1(l) {
    $(".cat1-" + l).remove();
    $(".catB1").show();
}

function editCat1(l) {
    $(".cat1-" + l + " input").prop("disabled", false);
    $(".cat1-" + l + " select").prop("disabled", false);

    $(".btn-saveCat1-" + l).show()
    $(".btn-closeCat1-" + l).hide()
    $(".btn-closeCatE1-" + l).show()
    $(".btn-editCat1-" + l).hide()
}

function closeCatE1(l) {
    $(".cat1-" + l).hide();
    $(".cat1-" + l).addClass("cat-R");
}

//Cat2
function openCat2() {
    $(".catB2").hide();

    var rLength = $(".catF2").length;
    var l = rLength + 1;

    var contentCat = `<div class="category-form catF2 cat2-` + l + `">
                                <div class="form-field">
                                    <label class="form-text-label">
                                        Purpose / Use
                                    </label>
                                    <div class="form-group-radio">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC2Use-` + l + `" id="radioC2Use1" value="Encryption" required>
                                            <label class="form-check-label" for="radioC2Use1">
                                                Encryption
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC2Use-` + l + `" id="radioC2Use2" value="Message Authentication" required>
                                            <label class="form-check-label" for="radioC2Use2">
                                                Message Authentication
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC2Use-` + l + `" id="radioC2Use3" value="Others" required>
                                            <label class="form-check-label" for="radioC2Use3">
                                                Others
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-field">
                                    <label class="form-text-label">
                                        Standards
                                    </label>
                                    <select class="form-select" name="selectC2Modes-` + l + `" required>
                                        <option value="">Select</option>
                                        <option value="RSA">RSA</option>
                                        <option value="ECDSA">ECDSA</option>
                                        <option value="EdDSA">EdDSA</option>
                                        <option value="ECDH">ECDH</option>
                                        <option value="DH">DH</option>
                                    </select>
                                </div>

                                <div class="form-field">
                                    <label class="form-text-label">
                                        Key Size
                                    </label>
                                    <div class="form-group-radio">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC2KeyLength-` + l + `" id="radioC2KeyLength1" value="1" required>
                                            <label class="form-check-label" for="radioC2KeyLength1">
                                                &ge; 2048-bits
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="radioC2KeyLength-` + l + `" id="radioC2KeyLength2" value="2" required>
                                            <label class="form-check-label" for="radioC2KeyLength2">
                                                &lt; 2048-bits
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="footer">
                                    <button type="button" class="button button-secondary btn-closeCat2-` + l + `" onclick="closeCat2(` + l + `)">
                                        <span class="button-text">Cancel</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-secondary btn-closeCatE2-` + l + `" onclick="closeCatE2(` + l + `)" style="display:none;">
                                        <span class="button-text">Delete</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-primary btn-saveCat2-` + l + `" onclick="saveCat2(` + l + `)">
                                        <span class="button-text">Save</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M18 4V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H14L18 4ZM9 15C9.83333 15 10.5417 14.7083 11.125 14.125C11.7083 13.5417 12 12.8333 12 12C12 11.1667 11.7083 10.4583 11.125 9.875C10.5417 9.29167 9.83333 9 9 9C8.16667 9 7.45833 9.29167 6.875 9.875C6.29167 10.4583 6 11.1667 6 12C6 12.8333 6.29167 13.5417 6.875 14.125C7.45833 14.7083 8.16667 15 9 15ZM3 7H12V3H3V7Z" fill="white" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-secondary btn-editCat2-` + l + `" onclick="editCat2(` + l + `)" style="display:none;">
                                        <span class="button-text">Edit</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M0.5 15.5V11.9583L11.5 0.979167C11.6667 0.826389 11.8508 0.708333 12.0525 0.625C12.2542 0.541667 12.4658 0.5 12.6875 0.5C12.9092 0.5 13.1244 0.541667 13.3333 0.625C13.5422 0.708333 13.7228 0.833333 13.875 1L15.0208 2.16667C15.1875 2.31944 15.3092 2.5 15.3858 2.70833C15.4625 2.91667 15.5006 3.125 15.5 3.33333C15.5 3.55556 15.4619 3.7675 15.3858 3.96917C15.3097 4.17083 15.1881 4.35472 15.0208 4.52083L4.04167 15.5H0.5ZM12.6667 4.5L13.8333 3.33333L12.6667 2.16667L11.5 3.33333L12.6667 4.5Z" fill="black"/>
                                            </svg>
                                            </span>
                                   </button>
                                </div>
                            </div>`
    $(".category-add-cat2").append(contentCat);
}

function saveCat2(l) {
    if (!$("#regForm").valid()) return false;

    $(".cat2-" + l).addClass("rOnly");
    $(".cat2-" + l + " input").prop("disabled", true);
    $(".cat2-" + l + " select").prop("disabled", true);
    $(".catB2").show();

    $(".btn-saveCat2-" + l).hide()
    $(".btn-closeCat2-" + l).hide()
    $(".btn-editCat2-" + l).show()
    $(".btn-closeCatE2-" + l).hide()
}

function closeCat2(l) {
    $(".cat2-" + l).remove();
    $(".catB2").show();
}

function editCat2(l) {
    $(".cat2-" + l + " input").prop("disabled", false);
    $(".cat2-" + l + " select").prop("disabled", false);

    $(".btn-saveCat2-" + l).show()
    $(".btn-closeCat2-" + l).hide()
    $(".btn-closeCatE2-" + l).show()
    $(".btn-editCat2-" + l).hide()
}

function closeCatE2(l) {
    $(".cat2-" + l).hide();
    $(".cat2-" + l).addClass("cat-R");
}

//Cat3
function openCat3() {
    $(".catB3").hide();

    var rLength = $(".catF3").length;
    var l = rLength + 1;

    var contentCat = `<div class="category-form catF3 cat3-` + l + `">
                                    <div class="form-field">
                                        <label class="form-text-label">
                                            Purpose / Use
                                        </label>
                                        <div class="form-group-radio">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="radioC3Use-` + l + `" id="radioC3Use1" value="Data Integrity" required>
                                                <label class="form-check-label" for="radioC3Use1">
                                                    Data Integrity
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="radioC3Use-` + l + `" id="radioC3Use2" value="Key Derivation" required>
                                                <label class="form-check-label" for="radioC3Use2">
                                                    Key Derivation
                                                </label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="radioC3Use-` + l + `" id="radioC3Use3" value="Others" required>
                                                <label class="form-check-label" for="radioC3Use3">
                                                    Others
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-field">
                                        <label class="form-text-label">
                                            Core Hash Algorithm
                                        </label>
                                        <select class="form-select" name="selectC3Hash-` + l + `">
                                            <option value="">Select</option>
                                            <option value="SHA-2">SHA-2</option>
                                            <option value="SHA-2">SHA-3</option>
                                            <option value="SHA-1">SHA-1</option>
                                            <option value="MD5">MD5</option>
                                        </select>
                                    </div>
                                    <div class="form-field">
                                        <label class="form-text-label">
                                            Variants
                                        </label>
                                        <select class="form-select" name="selectC3Variants-` + l + `">
                                            <option value="">Select</option>
                                            <option value="128-bit">128-bit</option>
                                            <option value="160-bit">160-bit</option>
                                            <option value="256-bit">256-bit</option>
                                            <option value="224-bit">224-bit</option>
                                            <option value="512-bit">512-bit</option>
                                            <option value="384-bit">384-bit</option>
                                            <option value="512/224-bit">512/224-bit</option>
                                            <option value="512/256-bit">512/256-bit</option>
                                        </select>
                                    </div>
                                    <div class="footer">
                                    <button type="button" class="button button-secondary btn-closeCat3-` + l + `" onclick="closeCat3(` + l + `)">
                                        <span class="button-text">Cancel</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-secondary btn-closeCatE3-` + l + `" onclick="closeCatE3(` + l + `)" style="display:none;">
                                        <span class="button-text">Delete</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-primary btn-saveCat3-` + l + `" onclick="saveCat3(` + l + `)">
                                        <span class="button-text">Save</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M18 4V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H14L18 4ZM9 15C9.83333 15 10.5417 14.7083 11.125 14.125C11.7083 13.5417 12 12.8333 12 12C12 11.1667 11.7083 10.4583 11.125 9.875C10.5417 9.29167 9.83333 9 9 9C8.16667 9 7.45833 9.29167 6.875 9.875C6.29167 10.4583 6 11.1667 6 12C6 12.8333 6.29167 13.5417 6.875 14.125C7.45833 14.7083 8.16667 15 9 15ZM3 7H12V3H3V7Z" fill="white" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-secondary btn-editCat3-` + l + `" onclick="editCat3(` + l + `)" style="display:none;">
                                        <span class="button-text">Edit</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M0.5 15.5V11.9583L11.5 0.979167C11.6667 0.826389 11.8508 0.708333 12.0525 0.625C12.2542 0.541667 12.4658 0.5 12.6875 0.5C12.9092 0.5 13.1244 0.541667 13.3333 0.625C13.5422 0.708333 13.7228 0.833333 13.875 1L15.0208 2.16667C15.1875 2.31944 15.3092 2.5 15.3858 2.70833C15.4625 2.91667 15.5006 3.125 15.5 3.33333C15.5 3.55556 15.4619 3.7675 15.3858 3.96917C15.3097 4.17083 15.1881 4.35472 15.0208 4.52083L4.04167 15.5H0.5ZM12.6667 4.5L13.8333 3.33333L12.6667 2.16667L11.5 3.33333L12.6667 4.5Z" fill="black"/>
                                            </svg>
                                            </span>
                                   </button>
                                </div>
                            </div>`
    $(".category-add-cat3").append(contentCat);
}

function saveCat3(l) {
    if (!$("#regForm").valid()) return false;

    $(".cat3-" + l).addClass("rOnly");
    $(".cat3-" + l + " input").prop("disabled", true);
    $(".cat3-" + l + " select").prop("disabled", true);
    $(".catB3").show();

    $(".btn-saveCat3-" + l).hide()
    $(".btn-closeCat3-" + l).hide()
    $(".btn-editCat3-" + l).show()
    $(".btn-closeCatE3-" + l).hide()
}

function closeCat3(l) {
    $(".cat3-" + l).remove();
    $(".catB3").show();
}

function editCat3(l) {
    $(".cat3-" + l + " input").prop("disabled", false);
    $(".cat3-" + l + " select").prop("disabled", false);

    $(".btn-saveCat3-" + l).show()
    $(".btn-closeCat3-" + l).hide()
    $(".btn-closeCatE3-" + l).show()
    $(".btn-editCat3-" + l).hide()
}

function closeCatE3(l) {
    $(".cat3-" + l).hide();
    $(".cat3-" + l).addClass("cat-R");
}

//Cat4
function openCat4() {
    $(".catB4").hide();

    var rLength = $(".catF4").length;
    var l = rLength + 1;

    var contentCat = `<div class="category-form catF4 cat4-` + l + `">
                            <div class="form-field">
                                <label class="form-text-label">
                                    Purpose / Use
                                </label>
                                <div class="from-group-radio">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioC4Use-` + l + `" id="radioC4Use1" value="Data Integrity" required>
                                        <label class="form-check-label" for="radioC4Use1">
                                            Data Integrity
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioC4Use-` + l + `" id="radioC4Use2" value="Data Authentication" required>
                                        <label class="form-check-label" for="radioC4Use2">
                                            Data Authentication
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioC4Use-` + l + `" id="radioC4Use3" value="Selection" required>
                                        <label class="form-check-label" for="radioC4Use3">
                                            Selection
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="radioC4Use-` + l + `" id="radioC4Use4" value="Others" required>
                                        <label class="form-check-label" for="radioC4Use4">
                                            Others
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-field">
                                <label class="form-text-label">
                                    Construction Type
                                </label>
                                <select class="form-select" name="selectC4type-` + l + `" required>
                                    <option value="">Select</option>
                                    <option value="HMAC">HMAC</option>
                                    <option value="HMAC">CMAC</option>
                                    <option value="HMAC">GMAC</option>
                                </select>
                            </div>

                            <div class="footer">
                                    <button type="button" class="button button-secondary btn-closeCat4-` + l + `" onclick="closeCat4(` + l + `)">
                                        <span class="button-text">Cancel</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-secondary btn-closeCatE4-` + l + `" onclick="closeCat4(` + l + `)" style="display:none;">
                                        <span class="button-text">Delete</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
                                                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="black" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-primary btn-saveCat4-` + l + `" onclick="saveCat4(` + l + `)">
                                        <span class="button-text">Save</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M18 4V16C18 16.55 17.8043 17.021 17.413 17.413C17.0217 17.805 16.5507 18.0007 16 18H2C1.45 18 0.979333 17.8043 0.588 17.413C0.196667 17.0217 0.000666667 16.5507 0 16V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196667 1.45067 0.000666667 2 0H14L18 4ZM9 15C9.83333 15 10.5417 14.7083 11.125 14.125C11.7083 13.5417 12 12.8333 12 12C12 11.1667 11.7083 10.4583 11.125 9.875C10.5417 9.29167 9.83333 9 9 9C8.16667 9 7.45833 9.29167 6.875 9.875C6.29167 10.4583 6 11.1667 6 12C6 12.8333 6.29167 13.5417 6.875 14.125C7.45833 14.7083 8.16667 15 9 15ZM3 7H12V3H3V7Z" fill="white" />
                                            </svg>
                                        </span>
                                    </button>
                                    <button type="button" class="button button-secondary btn-editCat4-` + l + `" onclick="editCat4(` + l + `)" style="display:none;">
                                        <span class="button-text">Edit</span>
                                        <span class="button-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M0.5 15.5V11.9583L11.5 0.979167C11.6667 0.826389 11.8508 0.708333 12.0525 0.625C12.2542 0.541667 12.4658 0.5 12.6875 0.5C12.9092 0.5 13.1244 0.541667 13.3333 0.625C13.5422 0.708333 13.7228 0.833333 13.875 1L15.0208 2.16667C15.1875 2.31944 15.3092 2.5 15.3858 2.70833C15.4625 2.91667 15.5006 3.125 15.5 3.33333C15.5 3.55556 15.4619 3.7675 15.3858 3.96917C15.3097 4.17083 15.1881 4.35472 15.0208 4.52083L4.04167 15.5H0.5ZM12.6667 4.5L13.8333 3.33333L12.6667 2.16667L11.5 3.33333L12.6667 4.5Z" fill="black"/>
                                            </svg>
                                            </span>
                                   </button>
                                </div>
                            </div>`
    $(".category-add-cat4").append(contentCat);
}

function saveCat4(l) {
    if (!$("#regForm").valid()) return false;

    $(".cat4-" + l).addClass("rOnly");
    $(".cat4-" + l + " input").prop("disabled", true);
    $(".cat4-" + l + " select").prop("disabled", true);
    $(".catB4").show();

    $(".btn-saveCat4-" + l).hide()
    $(".btn-closeCat4-" + l).hide()
    $(".btn-editCat4-" + l).show()
    $(".btn-closeCatE4-" + l).hide()
}

function closeCat4(l) {
    $(".cat4-" + l).remove();
    $(".catB4").show();
}

function editCat4(l) {
    $(".cat4-" + l + " input").prop("disabled", false);
    $(".cat4-" + l + " select").prop("disabled", false);

    $(".btn-saveCat4-" + l).show()
    $(".btn-closeCat4-" + l).hide()
    $(".btn-closeCatE4-" + l).show()
    $(".btn-editCat4-" + l).hide()
}

function closeCatE4(l) {
    $(".cat4-" + l).hide();
    $(".cat4-" + l).addClass("cat-R");
}

//Form Submit
function regFormSubmit() {

    var conArr = [];
    var infraArr = [];
    var pqcArr = [];

    $('input[name=inputConn]:checked').each(function () {
        conArr.push($(this).val());
    })

    $('input[name=inputInfraTeam]:checked').each(function () {
        infraArr.push($(this).val());
    })

    $('input[name=inputRoadmapAlgorithm]:checked').each(function () {
        pqcArr.push($(this).val());
    })

    var c1Data = cat1Data();
    var c2Data = cat2Data();
    var c3Data = cat3Data();
    var c4Data = cat4Data();

    var regJson = {
        "regForm": {
            "appName": $('input[name=inputApp]').val(),
            "appBusinessUnit": $('input[name=radioOwner]').val(),
            "appBusinessUnitRemarks": $('input[name=radioOwnerRemarks]').val(),
            "appItdTeam": $('input[name=inputITDTeam]').val(),
            "appCritical": $('input[name=inputCritical]').val(),
            "appConnection": conArr,
            "appDeveloper": $('input[name=inputDeveloper]').val(),
            "appDeveloperRemarks": $('input[name=inputDeveloperRemarks]').val(),
            "appInfra": infraArr,
            "appDataYears": $('input[name=inputPeriodData]').val(),
            "appDataServer": $('input[name=inputDataStore]').val(),
            "appDataDatabase": $('input[name=inputDBType]').val(),
            "appProtocol": $('input[name=inputProtocol]').val(),
            "appProtocolRemarks": $('input[name=inputProtocolRemarks]').val(),
            "appImplementation": $('input[name=inputImpType]').val(),
            "appImplementationRemarks": $('input[name=inputImpTypeRemarks]').val(),
            "appPqcRoadmap": $('input[name=inputRoadmap]').val(),
            "appPqcRoadmapAlgorithm": pqcArr,
            "appPqcRoadmapAlgorithmRemarks": $('input[name=inputRoadmapAlgorithmRemarks]').val(),
            "appPqcRoadmapYear": $('select[name=inputRoadmapYear]').val(),
            "appPqcRoadmapQuater": $('select[name=inputRoadmapQuater]').val(),
            "appPqcRoadmapCost": $('input[name=inputRoadmapCost]').val(),
            "appPqcRoadmapRegulators": $('input[name=inputRoadmapRegulators]').val(),
            "c1Data": c1Data,
            "c2Data": c2Data,
            "c3Data": c3Data,
            "c4Data": c4Data
        }
    }
    console.log(regJson)

    alert("submit")
}


//Roadmap on change

$('input[name=inputRoadmap]').on("change", function () {
    var tVal = $(this).val();

    if (tVal == "Yes") {
        $(".rmYes").show();
        $(".rmIp").hide();
        $(".rmAll").show();
        $(".rmYesIp").show();
    } else if (tVal == "In Progress") {
        $(".rmYes").hide();
        $(".rmIp").show();
        $(".rmAll").show();
        $(".rmYesIp").show();
    } else {
        $(".rmYes").hide();
        $(".rmIp").hide();
        $(".rmAll").show();
        $(".rmYesIp").hide();
    }
});

$('input[name=inputProtocol]').on("change", function () {
    var tVal = $(this).val();

    if (tVal == "Others") {
        $(".inputProtocolRemarks").show();
    } else {
        $(".inputProtocolRemarks").hide();
        $(".inputProtocolRemarks").val("");
    }
})

$('input[name=inputImpType]').on("change", function () {
    var tVal = $(this).val();

    if (tVal == "Others") {
        $(".inputImpTypeRemarks").show();
    } else {
        $(".inputImpTypeRemarks").hide();
        $(".inputImpTypeRemarks").val("");
    }
})

$('#inputRoadmapAlgorithm5').on("change", function () {
    if ($(this).prop('checked') == true) {
        $(".inputRoadmapAlgorithmRemarks").show();
    } else {
        $(".inputRoadmapAlgorithmRemarks").hide();
        $(".inputRoadmapAlgorithmRemarks").val("");
    }
})

$('input[name=inputDeveloper]').on("change", function () {
    var tVal = $(this).val();

    if (tVal == "External") {
        $(".inputDeveloperRemarks").show();
    } else {
        $(".inputDeveloperRemarks").hide();
        $(".inputDeveloperRemarks").val("");
    }
})

$('input[name=radioOwner]').on("change", function () {
    $(".radioOwnerRemarks").show();
})

//validate

$('#regForm').validate({
    errorPlacement: function (error, element) {
        if (element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
            error.appendTo(element.closest('.form-field'));
        } else {
            error.insertAfter(element);
        }
    },
})

//cat1 data
function cat1Data() {
    var cArray = [];
    var numItems = $(".catF1").length
    var countStop = 0;

    if (numItems > 0) {
        for (x = 1; x < 100; x++) {
            if (countStop == numItems) { break; }

            var tCat = $(".cat1-" + x);
            if (tCat[0] && !tCat.hasClass("cat-R")) {
                cArray.push({
                    "cUse": $('input[name=radioC1Use-' + x + ']').val(),
                    "cMode": $('select[name=selectC1Modes-' + x + ']').val(),
                    "cKey": $('input[name=radioC1KeyLength-' + x + ']').val()
                });

            } else {
                continue;
            }


        }
    }

    return cArray;
}

//cat2 data
function cat2Data() {
    var cArray = [];
    var numItems = $(".catF2").length
    var countStop = 0;

    if (numItems > 0) {
        for (x = 1; x < 100; x++) {
            if (countStop == numItems) { break; }

            var tCat = $(".cat2-" + x);
            if (tCat[0] && !tCat.hasClass("cat-R")) {
                cArray.push({
                    "cUse": $('input[name=radioC2Use-' + x + ']').val(),
                    "cMode": $('select[name=selectC2Modes-' + x + ']').val(),
                    "cKey": $('input[name=radioC2KeyLength-' + x + ']').val()
                });

            } else {
                continue;
            }


        }
    }

    return cArray;
}

//cat3 data
function cat3Data() {
    var cArray = [];
    var numItems = $(".catF3").length
    var countStop = 0;

    if (numItems > 0) {
        for (x = 1; x < 100; x++) {
            if (countStop == numItems) { break; }

            var tCat = $(".cat3-" + x);
            if (tCat[0] && !tCat.hasClass("cat-R")) {
                cArray.push({
                    "cUse": $('input[name=radioC3Use-' + x + ']').val(),
                    "cMode": $('select[name=selectC3Hash-' + x + ']').val(),
                    "cKey": $('select[name=selectC3Variants-' + x + ']').val()
                });

            } else {
                continue;
            }
        }
    }

    return cArray;
}

//cat4 data
function cat4Data() {
    var cArray = [];
    var numItems = $(".catF4").length
    var countStop = 0;

    if (numItems > 0) {
        for (x = 1; x < 100; x++) {
            if (countStop == numItems) { break; }

            var tCat = $(".cat4-" + x);
            if (tCat[0] && !tCat.hasClass("cat-R")) {
                cArray.push({
                    "cUse": $('input[name=radioC4Use-' + x + ']').val(),
                    "cMode": $('select[name=selectC4type-' + x + ']').val()
                });

            } else {
                continue;
            }


        }
    }

    return cArray;
}