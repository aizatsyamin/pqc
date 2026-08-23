/**
 * Manages the step-to-step navigation for the Manage Stocks wizard form.
 * Handles validation, mathematical calculations, and value assignment dynamically.
 */
function switchStockStep(targetStep) {
    
    // ==========================================================
    // STEP 1 -> STEP 2: VALIDATION & DATA SYNCHRONIZATION
    // ==========================================================
    if (targetStep === 2) {
        var txQty = parseInt($("#txQuantity").val()) || 0;
        var perfBy = $("#performedBy").val().trim();

        // Enforce basic required input verification rules
        if (txQty <= 0 || !perfBy) {
            alert("Please fill in all mandatory fields marked with *");
            return;
        }

        // Extract transaction properties from active form elements
        var movementType = $("input[name='actionType']:checked").val();
        var currentAvailQty = parseInt($("#infoAvailQty").text()) || 0;
        
        // Calculate the hypothetical new inventory value dynamically based on operation type
        var calculatedNewStock = (movementType === "Stock In") ? (currentAvailQty + txQty) : (currentAvailQty - txQty);

        // Map values directly across to Step 2 Review plain text grid
        $("#revMovement").text(movementType);
        $("#revSku").text($("#skuSelect").val());
        $("#revProdName").text($("#previewProdName").text());
        $("#revCurrentStock").text(currentAvailQty + " units");
        $("#revQtyAdd").text(txQty + " units");
        $("#revNewStock").text(calculatedNewStock + " units");
        $("#revPurpose").text($("#purposeSelect").val());
        $("#revRefNo").text($("#referenceNo").val() || "-");
        $("#revCompName").text($("#companyName").val() || "-");
        $("#revPerfBy").text(perfBy);
        $("#revRemarks").text($("#remarks").val() || "-");
        $("#revLoc").text($("#locationSelect").val());
        $("#revBatch").text($("#batchLot").val() || "-");
        $("#revExpiry").text($("#expiryDate").val() || "-");
        $("#revBarcode").text($("#barcode").val() || "-");
    }

    // ==========================================================
    // STEP 2 -> STEP 3: FINAL CONFIRMATION AND SUMMARY VALUES
    // ==========================================================
    if (targetStep === 3) {
        $("#ackType").text($("input[name='actionType']:checked").val());
        $("#ackSku").text($("#skuSelect").val());
        $("#ackProd").text($("#previewProdName").text());
        $("#ackQty").text($("#txQuantity").val());
        $("#ackPurpose").text($("#purposeSelect").val());
        $("#ackRefNo").text($("#referenceNo").val() || "-");
    }

    // ==========================================================
    // UI CORE: PANEL LAYER TOGGLING & VIEW SWITCHING
    // ==========================================================
    // Hide all step layout windows simultaneously
    $(".mstock-step-panel").addClass("d-none");
    
    // Reveal the targeted step container module smoothly
    $("#panel-mstock-" + targetStep).removeClass("d-none");

    // Recalculate visual progress and paint color tracks on top navigation tabs
    updateStockHeaderUI(targetStep);
}

/**
 * Handles the responsive UI header classes (Red for Active, Green for Completed, Gray for Pending).
 */
function updateStockHeaderUI(activeStep) {
    // Reset all tabs to standard gray baseline configs
    for (var i = 1; i <= 3; i++) {
        $("#nav-mstock-" + i).css("border-color", "#ced4da");
        $("#badge-mstock-" + i).removeClass("bg-danger bg-success bg-secondary").addClass("bg-secondary");
        $("#title-mstock-" + i).removeClass("text-dark text-muted").addClass("text-muted");
    }

    // Apply color modifications dynamically based on active progress
    if (activeStep === 1) {
        // Step 1 Active (Red Profile)
        $("#nav-mstock-1").css("border-color", "#dc3545");
        $("#badge-mstock-1").removeClass("bg-secondary").addClass("bg-danger");
        $("#title-mstock-1").removeClass("text-muted").addClass("text-dark");
    } 
    else if (activeStep === 2) {
        // Step 1 Completed (Green Profile)
        $("#nav-mstock-1").css("border-color", "#198754");
        $("#badge-mstock-1").removeClass("bg-secondary").addClass("bg-success");
        $("#title-mstock-1").removeClass("text-muted").addClass("text-dark");

        // Step 2 Active (Red Profile)
        $("#nav-mstock-2").css("border-color", "#dc3545");
        $("#badge-mstock-2").removeClass("bg-secondary").addClass("bg-danger");
        $("#title-mstock-2").removeClass("text-muted").addClass("text-dark");
    } 
    else if (activeStep === 3) {
        // Steps 1 & 2 Completed (Green Profile Track)
        $("#nav-mstock-1, #nav-mstock-2").css("border-color", "#198754");
        $("#badge-mstock-1, #badge-mstock-2").removeClass("bg-secondary").addClass("bg-success");
        $("#title-mstock-1, #title-mstock-2").removeClass("text-muted").addClass("text-dark");

        // Step 3 Active (Red Header Profile)
        $("#nav-mstock-3").css("border-color", "#dc3545");
        $("#badge-mstock-3").removeClass("bg-secondary").addClass("bg-danger");
        $("#title-mstock-3").removeClass("text-muted").addClass("text-dark");
    }
}

/**
 * Resets all underlying input variables and drops application state back to step 1 cleanly.
 */
function resetStockWizard() {
    // Reset standard plain inputs
    document.getElementById("manage-stocks-wizard-form").reset();
    
    // Jump wizard stack context directly back to step 1 interface layout
    switchStockStep(1);
}
