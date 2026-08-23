function navigateStep(targetStep) {
    // 1. If moving forward from step 1, validate inputs
    if (targetStep === 2) {
        var locationInput = $("#inventoryLocation").val().trim();
        if (!locationInput) {
            alert("Inventory Location field is required.");
            return;
        }

        // Fill review text tags
        $("#lblLocation").text(locationInput);
        $("#lblStatus").text($("#locationStatus").val());
        $("#lblDescription").text($("#locationDesc").val().trim() || "-");
    }

    // 2. If confirming on step 2, move text to success screen
    if (targetStep === 3) {
        $("#successLocation").text($("#inventoryLocation").val());
        $("#successStatus").text($("#locationStatus").val());
        $("#successDescription").text($("#locationDesc").val().trim() || "-");
    }

    // 3. Hide all tab view components and toggle visible panels
    $(".step-content-panel").addClass("d-none");
    $("#panel-step-" + targetStep).removeClass("d-none");

    // 4. Update tab headers color tracks dynamically
    updateTabHeaderStyles(targetStep);
}

function updateTabHeaderStyles(activeStep) {
    // Reset tabs to default styling
    for (var i = 1; i <= 3; i++) {
        var tab = $("#nav-step-" + i);
        var badge = tab.find(".step-badge");
        var text = tab.find(".step-title");

        tab.removeClass("border-danger border-success").css("border-color", "#ced4da");
        badge.removeClass("bg-danger bg-success bg-secondary").addClass("bg-secondary");
        text.removeClass("text-dark text-muted").addClass("text-muted");
    }

    // Apply color modifications dynamically based on the active step position
    if (activeStep === 1) {
        $("#nav-step-1").addClass("border-danger").css("border-color", "");
        $("#nav-step-1 .step-badge").removeClass("bg-secondary").addClass("bg-danger");
        $("#nav-step-1 .step-title").removeClass("text-muted").addClass("text-dark");
    } 
    else if (activeStep === 2) {
        // Step 1 Completed (Green)
        $("#nav-step-1").addClass("border-success");
        $("#nav-step-1 .step-badge").removeClass("bg-secondary").addClass("bg-success");
        $("#nav-step-1 .step-title").removeClass("text-muted").addClass("text-dark");

        // Step 2 Active (Red)
        $("#nav-step-2").addClass("border-danger");
        $("#nav-step-2 .step-badge").removeClass("bg-secondary").addClass("bg-danger");
        $("#nav-step-2 .step-title").removeClass("text-muted").addClass("text-dark");
    } 
    else if (activeStep === 3) {
        // Steps 1 & 2 Completed (Green)
        $("#nav-step-1, #nav-step-2").addClass("border-success");
        $("#nav-step-1 .step-badge, #nav-step-2 .step-badge").removeClass("bg-secondary").addClass("bg-success");
        $("#nav-step-1 .step-title, #nav-step-2 .step-title").removeClass("text-muted").addClass("text-dark");

        // Step 3 Active (Red Header Outline match)
        $("#nav-step-3").addClass("border-danger");
        $("#nav-step-3 .step-badge").removeClass("bg-secondary").addClass("bg-danger");
        $("#nav-step-3 .step-title").removeClass("text-muted").addClass("text-dark");
    }
}

function resetFormWizard() {
    $("#inventory-location-form")[0].reset();
    navigateStep(1);
}
