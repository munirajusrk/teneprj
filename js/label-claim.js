$(document).ready(function() {
    
    $('.claim-radio input[type="radio"]').change(function() {
        if ($(this).val() === "crop") {
            $('#crop-filter-form').show();
            $('#pesticide-filter-form').hide();
            $('.claim-filter').hide();
            $('#cards-inner').empty();
            $('#label-crop').val('');
            $('#label-crop-2').val('');
            $('#label-pesticide').val('');
            $('#label-pest').val('');
            populateCropDropdown();
        } else {
            $('#crop-filter-form').hide();
            $('#pesticide-filter-form').show();
            $('.claim-filter').hide();
            $('#cards-inner').empty();
            $('#label-crop').val('');
            $('#label-crop-2').val('');
            $('#label-pesticide').val('');
            $('#label-pest').val('');
            $('.card-pesticide-common-info').hide();
            populatePesticideDropdown();
        }
    });

    function populateCropDropdown() {
        const apicropUrl = 'https://devrootstockapi.tene.in/api/label-claims?pagination[page]=1&pagination[pageSize]=9999';
        $.ajax({
            url: apicropUrl,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                const cropDropdown = $('#label-crop');
                cropDropdown.empty();
                cropDropdown.append($('<option>', { value: '', text: 'Select the Crop', disabled: true, selected: true}));

                const uniqueCropNames = [];

                response.data.forEach(function(entry) {
                    const cropName = entry.attributes.Crop_name;
                    if (!uniqueCropNames.includes(cropName)) {
                        cropDropdown.append($('<option>', { value: cropName, text: cropName }));
                        uniqueCropNames.push(cropName);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching crop names:', status, error);
            }
        });
    }

    
    function populatePestDropdown(selectedCrop) {
        const apiPestUrl = `https://devrootstockapi.tene.in/api/label-claims?filters[Crop_name][$eq][0]=${selectedCrop}&pagination[page]=1&pagination[pageSize]=9999`;
        $.ajax({
            url: apiPestUrl,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                const pestDropdown = $('#label-pest');
                pestDropdown.empty();
                pestDropdown.append($('<option>', { value: '', text: 'Select the Pest', disabled: true, selected: true }));
                
                const uniquePestNames = [];
                
                response.data.forEach(function(entry) {
                    const pestName = entry.attributes.Pest_name;
                    const extractedPestName = pestName.split(' - ')[1]; 
                    if (!uniquePestNames.includes(extractedPestName)) {
                        pestDropdown.append($('<option>', { value: pestName, text: extractedPestName }));
                        uniquePestNames.push(extractedPestName);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching pest names:', status, error);
            }
        });
    }

    function populatePesticideDropdown() {
        const apiPesticideUrl = 'https://devrootstockapi.tene.in/api/label-claims?pagination[page]=1&pagination[pageSize]=9999';
        $.ajax({
            url: apiPesticideUrl,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                const pesticideDropdown = $('#label-pesticide');
                pesticideDropdown.empty().append($('<option>', { value: '', text: 'Select the Pesticide', disabled: true, selected: true }));
                const uniquePesticides = [];

                response.data.forEach(function(entry) {
                    const commercialInputName = entry.attributes.Commercial_input_name;
                    if (!uniquePesticides.includes(commercialInputName)) {
                        pesticideDropdown.append($('<option>', { value: commercialInputName, text: commercialInputName }));
                        uniquePesticides.push(commercialInputName);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching pesticide names:', status, error);
            }
        });
    }

    
    function populateCrop2Dropdown(selectedPesticide) {
        const apiCropUrl = `https://devrootstockapi.tene.in/api/label-claims?filters[Commercial_input_name][$eq][0]=${selectedPesticide}&pagination[page]=1&pagination[pageSize]=9999`;
        $.ajax({
            url: apiCropUrl,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                const cropDropdown = $('#label-crop-2');
                cropDropdown.empty().append($('<option>', { value: '', text: 'Select the Crop', disabled: true, selected: true }));
                const uniqueCrops = [];

                response.data.forEach(function(entry) {
                    const cropName = entry.attributes.Crop_name;
                    if (!uniqueCrops.includes(cropName)) {
                        cropDropdown.append($('<option>', { value: cropName, text: cropName }));
                        uniqueCrops.push(cropName);
                    }
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching crop names:', status, error);
            }
        });
    }

    function setHazardCategoryColor(hazardColor) {
        switch (hazardColor) {
            case "Green":
                return "bg-green";
            case "Red":
                return "bg-red";
            case "Blue":
                return "bg-blue";
            case "Yellow":
                return "bg-orange";
            default:
                return "bg-na";
        }
    }

    function populateCommonPesticideInfo(response) {
        $('.card-pesticide-common-info').show();
        const firstItem = response.data[0];
        const activeIngredients = firstItem.attributes.Active_ingredients;
        const level2Practices = firstItem.attributes.Level2_practices;
        const modeOfAction = firstItem.attributes.Mode_of_action_of_pesticides;
        const pesticideCategory = firstItem.attributes.Pesticide_category;
        const hazard_category = firstItem.attributes.Hazard_category;
        const hazard_color = firstItem.attributes.Hazard_Color;
        const formulation = firstItem.attributes.Formulation;
        const formulationAbbreviation = formulation.match(/\(([^\)]+)\)/)[1];
    
        const hazardCategoryColor = setHazardCategoryColor(hazard_color);

        let commonCardHtml = `<ul class="card-pesticide-common-info ${hazardCategoryColor}">
            <li id="activeIngredients">${activeIngredients}% (${formulationAbbreviation})</li>
            <li id="level2Practices">${level2Practices}</li>
            <li id="modeOfAction">${modeOfAction}</li>
            <li id="pesticideCategory">${pesticideCategory}</li>
        </ul>`
        $('#card-pesticide-common').empty().append(commonCardHtml);
    }

    const apiUrl = 'https://devrootstockapi.tene.in/api/label-claims';

    function fetchData(apiUrl) {
        $.ajax({
            url: apiUrl,
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                try {
                    $('#cards-inner').empty();

                    populateCommonPesticideInfo(response);

                    // const hazardCategoryOrder = ['Green (Unlikely harmful)', 'Blue (Slightly toxic)', 'Orange (Highly toxic)', 'Red (Extremely toxic)'];
                    const hazardCategoryOrder = ['Slightly toxic', 'Moderately toxic', 'Highly toxic', 'Extremly toxic'];

                    response.data.sort(function(a, b) {
                        // Get the index of hazard category for each entry
                        const indexA = hazardCategoryOrder.indexOf(a.attributes.Hazard_category);
                        const indexB = hazardCategoryOrder.indexOf(b.attributes.Hazard_category);

                        // Compare hazard categories using the custom order
                        if (indexA < indexB) return -1;
                        if (indexA > indexB) return 1;

                        // If hazard categories are the same, compare Commercial_input_name
                        if (a.attributes.Commercial_input_name < b.attributes.Commercial_input_name) return -1;
                        if (a.attributes.Commercial_input_name > b.attributes.Commercial_input_name) return 1;

                        return 0;
                    });

                    response.data.forEach(function(entry) {
                        const cropName = entry.attributes.Crop_name;
                        const pestName = entry.attributes.Pest_name;
                        const extractedPestName = pestName.split(' - ')[1];
                        const commercialInputName = entry.attributes.Commercial_input_name;
                        const activeIngredients = entry.attributes.Active_ingredients;
                        const formulation = entry.attributes.Formulation;
                        const formulationAbbreviation = formulation.match(/\(([^\)]+)\)/)[1];
                        const level2Practices = entry.attributes.Level2_practices;
                        const modeOfAction = entry.attributes.Mode_of_action_of_pesticides;
                        const pesticideCategory = entry.attributes.Pesticide_category;
                        const dosageMin = entry.attributes.Dosage_min;
                        const dosageMax = entry.attributes.Dosage_max;
                        const dosageUnit = entry.attributes.Dosage_unit;
                        const dilutionMin = entry.attributes.Dilution_min;
                        const dilutionMax = entry.attributes.Dilution_max;
                        const dilutionUnit = entry.attributes.Dilution_unit;
                        const waitingPeriodMin = entry.attributes.Waiting_period_min;
                        const waitingPeriodMax = entry.attributes.Waiting_period_max;
                        const waitingPeriodUnit = entry.attributes.Waiting_period_unit;
                        const ld50Values = entry.attributes.LD50_Values;
                        const Hazard_category = entry.attributes.Hazard_category;
                        const hazard_color = entry.attributes.Hazard_Color;

                        const hazardCategoryColor = setHazardCategoryColor(hazard_color);
                        const cardType = $('.claim-radio input[type="radio"]:checked').val();
                        let cardHtml = '';
                        if(cardType == 'crop'){
                            cardHtml = `
                            <div class="claim-card">
                                <div class="claim-card-title">
                                    <h6 class="pest-h6">${extractedPestName}</h6>
                                    <h5 class="${hazardCategoryColor}">${commercialInputName}</h5>
                                    <h6 class="formulation">${activeIngredients}% (${formulationAbbreviation})</h6>

                                </div>
                                <ul class="card-pesticide-info">
                                    <!--<li>${activeIngredients}% (${formulationAbbreviation})</li>-->
                                    <li>${level2Practices}</li>
                                    <li>${modeOfAction}</li>
                                    <li>${pesticideCategory}</li>
                                </ul>
                                <div class="claim-card-pesticide-details">
                                    <div>
                                        <span><img src="images/icons/label-claim/dosage.png" alt="icon"></span>
                                        <h6>Dosage</h6>
                                        <!--<div>${dosageMin} - ${dosageMax} ${dosageUnit}</div>-->
                                        ${dosageMax - dosageMin !== 0 ? `<div>${dosageMin} - ${dosageMax} ${dosageUnit}</div>` : `<div>${dosageMax} ${dosageUnit}</div>`}
                                    </div>
                                    <div>
                                        <span><img src="images/icons/label-claim/mix.png" alt="icon"></span>
                                        <h6>Dilution</h6>
                                        <!--<div>${dilutionMin} - ${dilutionMax} ${dilutionUnit}</div>-->
                                        ${dilutionMax - dilutionMin !== 0 ? `<div>${dilutionMin} - ${dilutionMax} ${dilutionUnit}</div>` : `<div>${dilutionMax} ${dilutionUnit}</div>`}
                                    </div>
                                    <div>
                                        <span><img src="images/icons/label-claim/hourglass.png" alt="icon"></span>
                                        <h6>Waiting Period</h6>
                                        <!--<div>${waitingPeriodMin} - ${waitingPeriodMax} ${waitingPeriodUnit}</div>-->
                                        ${waitingPeriodMax - waitingPeriodMin !== 0 ? `<div>${waitingPeriodMin} - ${waitingPeriodMax} ${waitingPeriodUnit}</div>` : `<div>${waitingPeriodMax} ${waitingPeriodUnit}</div>`}
                                    </div>
                                    <div>
                                        <span><img src="images/icons/label-claim/danger.png" alt="icon"></span>
                                        <h6>Hazard Category</h6>
                                        <div>${Hazard_category}</div>
                                        <!--<h6>LD50 (mg/kg body weight)</h6>
                                        <div>${ld50Values}</div>-->
                                    </div>
                                </div>
                            </div>
                        `;
                        }
                        else{
                            cardHtml = `
                            <div class="claim-card">
                                <div class="claim-card-title">
                                    <h6 class="pest-h6">${cropName}</h6>
                                    <h5 class="${hazardCategoryColor}">${extractedPestName}</h5>
                                </div>
                                <div class="claim-card-pesticide-details">
                                    <div>
                                        <span><img src="images/icons/label-claim/dosage.png" alt="icon"></span>
                                        <h6>Dosage</h6>
                                        <!--<div>${dosageMin} - ${dosageMax} ${dosageUnit}</div>-->
                                        ${dosageMax - dosageMin !== 0 ? `<div>${dosageMin} - ${dosageMax} ${dosageUnit}</div>` : `<div>${dosageMax} ${dosageUnit}</div>`}
                                    </div>
                                    <div>
                                        <span><img src="images/icons/label-claim/mix.png" alt="icon"></span>
                                        <h6>Dilution</h6>
                                        <!--<div>${dilutionMin} - ${dilutionMax} ${dilutionUnit}</div>-->
                                        ${dilutionMax - dilutionMin !== 0 ? `<div>${dilutionMin} - ${dilutionMax} ${dilutionUnit}</div>` : `<div>${dilutionMax} ${dilutionUnit}</div>`}
                                    </div>
                                    <div>
                                        <span><img src="images/icons/label-claim/hourglass.png" alt="icon"></span>
                                        <h6>Waiting Period</h6>
                                        <!--<div>${waitingPeriodMin} - ${waitingPeriodMax} ${waitingPeriodUnit}</div>-->
                                        ${waitingPeriodMax - waitingPeriodMin !== 0 ? `<div>${waitingPeriodMin} - ${waitingPeriodMax} ${waitingPeriodUnit}</div>` : `<div>${waitingPeriodMax} ${waitingPeriodUnit}</div>`}
                                    </div>
                                    <div>
                                        <span><img src="images/icons/label-claim/danger.png" alt="icon"></span>
                                        <h6>Hazard Category</h6>
                                        <div>${Hazard_category}</div>
                                        <!--<h6>LD50 (mg/kg body weight)</h6>
                                        <div>${ld50Values}</div>-->
                                    </div>
                                </div>
                            </div>
                        `;
                        }

                        $('#cards-inner').append(cardHtml);
                        $('.claim-filter').show();
                    });
                } catch (error) {
                    console.error('Error processing API response:', error);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX request failed:', status, error);
            }
        });
    }

    $('#label-crop').change(function() {
        const selectedCrop = $(this).val();
        let filterUrl = apiUrl + '?pagination[page]=1&pagination[pageSize]=9999';
        if (selectedCrop !== '') {
            filterUrl += `&filters[Crop_name][$eq][0]=${selectedCrop}`;
            populatePestDropdown(selectedCrop);
            fetchData(filterUrl);
        }else {
            $('#label-pest').empty().append($('<option>', { value: '', text: 'Select the Pest' }));
        }
    });

    $('#label-pesticide').change(function() {
        const selectedPesticide = $(this).val();
        const encodedCommercialInputName = encodeURIComponent(selectedPesticide);
        let filterUrl = apiUrl + '?pagination[page]=1&pagination[pageSize]=9999';
        if (selectedPesticide !== '') {
            filterUrl += `&filters[Commercial_input_name][$eq][0]=${encodedCommercialInputName}`;
            populateCrop2Dropdown(encodedCommercialInputName);
            fetchData(filterUrl);
        }else {
            $('#label-crop-2').empty().append($('<option>', { value: '', text: 'Select the Crop' }));
        }
    });

    $('#label-pest').change(function() {
        const pest = $('#label-pest').val();
        let filterUrl = apiUrl + '?pagination[page]=1&pagination[pageSize]=9999';
        if (pest !== '') {
            filterUrl += `&filters[Pest_name][$eq][1]=${pest}`;
        }
        fetchData(filterUrl);
    });

    $('#label-crop-2').change(function() {
        const selectedCrop = $(this).val();
        const selectedPesticide = $('#label-pesticide').val();
        
        if (selectedCrop !== '') {
            let filterUrl = apiUrl + '?pagination[page]=1&pagination[pageSize]=9999';
        
            filterUrl += `&filters[Crop_name][$eq][1]=${selectedCrop}`;

            if (selectedPesticide !== '') {
                const encodedCommercialInputName = encodeURIComponent(selectedPesticide);
                filterUrl += `&filters[Commercial_input_name][$eq][1]=${encodedCommercialInputName}`;
            }
        
            fetchData(filterUrl);
        }
    });

    $('input[name="filter-type"]:checked').trigger('change');
    
});