function switchCategoryStep(targetStep) {
    // 1. Enforce strict input checks before transitioning out of Step 1
    if (targetStep === 2) {
        var catNameValue = $("#categoryName").val().trim();
        if (!catNameValue) {
            alert("Category Name field is required.");
            return;
        }

        // Map parameter values straight down onto the Step 2 View block
        $("#reviewCatName").text(catNameValue);
        $("#reviewCatDesc").text($("#categoryDesc").val().trim() || "-");
    }

    // 2. Map structural values over onto the final Step 3 success screen container
    if (targetStep === 3) {
        $("#finalCatName").text($("#categoryName").val().trim());
        $("#finalCatDesc").text($("#categoryDesc").val().trim() || "-");
        
        // NOTE: If you need to make an AJAX POST request to your database, place it here.
    }

    // 3. Clear visibility states across panel components and open targeted screen
    $(".cat-step-panel").addClass("d-none");
    $("#panel-cat-" + targetStep).removeClass("d-none");

    // 4. Update the visual states of the horizontal header trackers
    updateCategoryHeaderUI(targetStep);
}

function updateCategoryHeaderUI(activeStep) {
    // Clear styles back to baseline defaults
    for (var i = 1; i <= 3; i++) {
        $("#nav-cat-" + i).css("border-color", "#ced4da");
        $("#badge-cat-" + i).removeClass("bg-danger bg-success bg-secondary").addClass("bg-secondary");
        $("#title-cat-" + i).removeClass("text-dark text-muted").addClass("text-muted");
    }

    // Evaluate step index context configurations dynamically
    if (activeStep === 1) {
        $("#nav-cat-1").css("border-color", "#dc3545");
        $("#badge-cat-1").removeClass("bg-secondary").addClass("bg-danger");
        $("#title-cat-1").removeClass("text-muted").addClass("text-dark");
    } 
    else if (activeStep === 2) {
        // Step 1 Completed -> Green State Layout
        $("#nav-cat-1").css("border-color", "#198754");
        $("#badge-cat-1").removeClass("bg-secondary").addClass("bg-success");
        $("#title-cat-1").removeClass("text-muted").addClass("text-dark");

        // Step 2 Active -> Red State Layout
        $("#nav-cat-2").css("border-color", "#dc3545");
        $("#badge-cat-2").removeClass("bg-secondary").addClass("bg-danger");
        $("#title-cat-2").removeClass("text-muted").addClass("text-dark");
    } 
    else if (activeStep === 3) {
        // Steps 1 & 2 Completed -> Green State Layout
        $("#nav-cat-1, #nav-cat-2").css("border-color", "#198754");
        $("#badge-cat-1, #badge-cat-2").removeClass("bg-secondary").addClass("bg-success");
        $("#title-cat-1, #title-cat-2").removeClass("text-muted").addClass("text-dark");

        // Step 3 Active -> Red Outline Tracker
        $("#nav-cat-3").css("border-color", "#dc3545");
        $("#badge-cat-3").removeClass("bg-secondary").addClass("bg-danger");
        $("#title-cat-3").removeClass("text-muted").addClass("text-dark");
    }
}

function resetCategoryWizard() {
    // Standard form reset execution handler
    document.getElementById("category-masterlist-form").reset();
    switchCategoryStep(1);
}
