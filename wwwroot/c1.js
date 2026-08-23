function goToStep(stepNumber) {
    // 1. Hide all form step view sections
    $('.form-step-section').addClass('d-none');
    
    // 2. Show the target view section
    $(`#step-content-${stepNumber}`).removeClass('d-none');

    // 3. Sync and structure the Step Progress Cards
    if (stepNumber === 1) {
        updateHeader(1, 'active');
        updateHeader(2, 'disabled');
        updateHeader(3, 'disabled');
    } 
    else if (stepNumber === 2) {
        // Pop input value strings over into view labels dynamically
        $('#reviewLocation').text($('#inputLocation').val());
        $('#reviewStatus').text($('#inputStatus').val());
        $('#reviewDescription').text($('#inputDescription').val());

        updateHeader(1, 'completed');
        updateHeader(2, 'active');
        updateHeader(3, 'disabled');
    } 
    else if (stepNumber === 3) {
        // Move confirmed items into final summary list view block
        $('#finalLocation').text($('#inputLocation').val());
        $('#finalStatus').text($('#inputStatus').val());
        $('#finalDescription').text($('#inputDescription').val());

        updateHeader(1, 'completed');
        updateHeader(2, 'completed');
        updateHeader(3, 'active');
    }
}

// Utility function handling header css mutations smoothly
function updateHeader(id, state) {
    let header = $(`#step-header-${id}`);
    header.removeClass('step-active step-completed step-disabled');
    
    if (state === 'active') {
        header.addClass('step-active');
    } else if (state === 'completed') {
        header.addClass('step-completed');
    } else {
        header.addClass('step-disabled');
    }
}

// Clean reset configuration function 
function resetWizard() {
    $('#wizardForm')[0].reset();
    goToStep(1);
}
