$(document).ready(function() {
    let currentStep = 1;
    const totalSteps = 5; // Adjust this if you implement all 5 steps

    function updateWizard(step) {
        // Hide all steps
        $('.wizard-step').hide();
        // Show target step
        $('#step-' + step).show();
        
        // Update top navigation UI
        $('.wizard-nav .step-indicator').removeClass('active');
        $('.wizard-nav .step-indicator[data-step="' + step + '"]').addClass('active');
    }

    // Next Button Click
    $('.next-btn').on('click', function() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateWizard(currentStep);
        }
    });

    // Previous Button Click
    $('.prev-btn').on('click', function() {
        if (currentStep > 1) {
            currentStep--;
            updateWizard(currentStep);
        }
    });
});