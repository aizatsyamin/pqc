$(document).ready(function() {

    // Helper to switch visual wizard steps
    function switchItemStep(stepNumber) {
        $('.wizard-step').addClass('d-none');
        $('#panel-step-' + stepNumber).removeClass('d-none');

        // Reset step header indicators
        for (var i = 1; i <= 3; i++) {
            var $badge = $('#step-badge-' + i);
            var $circle = $badge.find('.step-circle');
            var $text = $badge.find('.step-text');

            if (i < stepNumber) {
                // Completed Step: Green border/badge
                $badge.removeClass('border-danger border-secondary opacity-75').addClass('border-success');
                $circle.removeClass('bg-danger bg-secondary').addClass('bg-success');
                $text.removeClass('text-danger text-secondary').addClass('text-success');
            } else if (i === stepNumber) {
                // Active Step: Red border/badge
                $badge.removeClass('border-success border-secondary opacity-75').addClass('border-danger');
                $circle.removeClass('bg-success bg-secondary').addClass('bg-danger');
                $text.removeClass('text-success text-secondary').addClass('text-danger');
            } else {
                // Future Step: Gray border/badge
                $badge.removeClass('border-danger border-success').addClass('border-secondary opacity-75');
                $circle.removeClass('bg-danger bg-success').addClass('bg-secondary');
                $text.removeClass('text-danger text-success').addClass('text-secondary');
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Step 1 -> Step 2: Validate and populate confirmation screen
    $('#btnGoToConfirm').on('click', function(e) {
        e.preventDefault();

        // Basic required field validation
        if (!$('#skuCode').val() || !$('#productName').val() || !$('#catId').val() || !$('#uom').val() || !$('#unitCost').val() || !$('#sellingPrice').val()) {
            alert('Please fill in all required fields marked with *');
            return;
        }

        // Populate Step 2 Review labels
        $('#rev-skuCode').text($('#skuCode').val());
        $('#rev-productName').text($('#productName').val());
        $('#rev-catName').text($('#catId option:selected').text());
        $('#rev-uom').text($('#uom').val());
        $('#rev-unitCost').text($('#unitCost').val());
        $('#rev-minRetailPrice').text($('#minRetailPrice').val() || '-');
        $('#rev-sellingPrice').text($('#sellingPrice').val());
        $('#rev-reorderPoint').text($('#reorderPoint').val() || '-');
        $('#rev-breakBulk').text($('#breakBulk').val());
        $('#rev-conversionQty').text($('#conversionQty').val() || '1');
        $('#rev-status').text($('#status').val() === '1' ? 'Active' : 'Inactive');

        switchItemStep(2);
    });

    // Step 2 -> Step 1: Back Button
    $('#btnBackToInitiate').on('click', function(e) {
        e.preventDefault();
        switchItemStep(1);
    });

    // Step 2 -> Step 3: AJAX Submit
    $('#btnConfirmSubmit').on('click', function(e) {
        e.preventDefault();

        var formData = $('#item-wizard-form').serialize();

        $.ajax({
            url: (typeof contextPath !== 'undefined' ? contextPath : '') + '/inventory/item/insert',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                var res = (typeof response === 'string') ? JSON.parse(response) : response;

                if (res.status === 'SUCCESS') {
                    // Populate Step 3 Acknowledge cards
                    $('#ack-skuCode').text($('#skuCode').val());
                    $('#ack-productName').text($('#productName').val());
                    $('#ack-catName').text($('#catId option:selected').text());
                    $('#ack-unitCost').text('MYR ' + $('#unitCost').val());
                    $('#ack-minRetailPrice').text($('#minRetailPrice').val() ? 'MYR ' + $('#minRetailPrice').val() : '-');
                    $('#ack-reorderPoint').text($('#reorderPoint').val() || '-');
                    $('#ack-breakBulk').text($('#breakBulk').val());
                    $('#ack-conversionQty').text($('#conversionQty').val() || '1');
                    $('#ack-status').text($('#status').val() === '1' ? 'Active' : 'Inactive');

                    switchItemStep(3);
                } else {
                    alert('Submission failed: ' + (res.message || 'Unable to save item.'));
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', xhr.responseText);
                alert('Server error occurred during submission.');
            }
        });
    });

    // Cancel Button
    $('#btnCancel').on('click', function() {
        if (confirm('Are you sure you want to cancel? All unsaved inputs will be lost.')) {
            window.location.href = (typeof contextPath !== 'undefined' ? contextPath : '') + '/inventory/masterlist';
        }
    });
});
