$(document).ready(function () {
    // 1. Hook into your project's existing Metronic stepper engine instance
    var stepperElement = document.querySelector("#main-stepper");
    var stepper = KTStepper.getInstance(stepperElement);
    if (!stepper) {
        stepper = new KTStepper(stepperElement);
    }

    // 2. Handle NEXT button logic (Step 1 -> Step 2 transition)
    stepper.on("kt.stepper.next", function (stepperObj) {
        var currentStep = stepperObj.getCurrentStepIndex();

        if (currentStep === 1) {
            // Field validation checks
            var locationName = $("#inventoryLocation").val().trim();
            var statusVal = $("#locationStatus-select").val();
            var descriptionVal = $("#locationDesc").val().trim();

            if (!locationName) {
                alert("Inventory Location field is required.");
                return;
            }

            // Bind values across to Step 2 Review block elements
            $("#reviewLocation").text(locationName);
            $("#reviewStatus").text(statusVal);
            $("#reviewDescription").text(descriptionVal || "-");
        }

        // Programmatically push to Step 2 Panel
        stepperObj.goNext();
    });

    // 3. Handle BACK button logic (Step 2 -> Step 1 transition)
    stepper.on("kt.stepper.previous", function (stepperObj) {
        stepperObj.goPrevious();
    });

    // 4. Handle CONFIRM & SUBMIT button logic (Step 2 -> Step 3 transition)
    stepper.on("kt.stepper.submit", function (stepperObj) {
        // Bind values across to the final Step 3 Acknowledgement elements
        $("#finalLocation").text($("#inventoryLocation").val());
        $("#finalStatus").text($("#locationStatus-select").val());
        $("#finalDescription").text($("#locationDesc").val() || "-");

        // NOTE: If you need to make an AJAX payload request to your controller servlet layer 
        // to persist the record in your database, execute it here before advancing.
        
        // Progress form directly into Step 3 success panel view
        stepperObj.goNext();
    });

    // 5. Handle DONE button logic (Step 3 Reset transition)
    $("#btnDone").on("click", function() {
        // Reset raw HTML input tags
        $("#inventory-location-form")[0].reset();
        
        // Reset custom Select2 framework elements cleanly back to Active default state
        $("#locationStatus-select").val('Active').trigger('change');
        
        // Route wizard panel context back to Step 1 interface view window
        stepper.goTo(1);
    });
});
