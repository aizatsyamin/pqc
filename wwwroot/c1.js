$(document).ready(function () {
    var stepperElement = document.querySelector("#main-stepper");
    if (stepperElement) {
        var stepper = new KTStepper(stepperElement);

        // Step navigation forwarding transition rules
        stepper.on("kt.stepper.next", function (stepperObj) {
            var current = stepperObj.getCurrentStepIndex();
            if (current === 1) {
                var locName = $("#inventoryLocation").val().trim();
                if (!locName) {
                    alert("Inventory Location field is required.");
                    return;
                }
                $("#reviewLocation").text(locName);
                $("#reviewStatus").text($("#locationStatus-select").val());
                $("#reviewDescription").text($("#locationDesc").val().trim() || "-");
            }
            stepperObj.goNext();
        });

        // Step navigation back tracking rules
        stepper.on("kt.stepper.previous", function (stepperObj) {
            stepperObj.goPrevious();
        });

        // Form submission panel triggers
        stepper.on("kt.stepper.submit", function (stepperObj) {
            $("#finalLocation").text($("#inventoryLocation").val());
            $("#finalStatus").text($("#locationStatus-select").val());
            $("#finalDescription").text($("#locationDesc").val().trim() || "-");
            stepperObj.goNext();
        });

        $("#btnDone").on("click", function() {
            $("#inventory-location-form")[0].reset();
            $("#locationStatus-select").val('Active').trigger('change');
            stepper.goTo(1);
        });
    }
});
