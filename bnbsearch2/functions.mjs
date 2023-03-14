$("#bnbbtn").click(function(){
    let bmsinput = $('#bedrooms').val();
    const bedrooms = bmsinput == "" ? 1 : bmsinput;
    let bedinput = $('#beds').val();
    const beds = bedinput == "" ? 1 : bedinput;
    let proinput = $('#property_type').val();
    const property = proinput == "" ? "Apartment" : proinput;
    let url = `http://localhost:3000/findOne/?beds=${beds}&property_type=${property}&bedrooms=${bedrooms}`
    $.ajax({
        url: url,
        method: "GET",
        success: function(data){
            read(data.result);
        }
        
    })
});

function read(data) {
    $('#bnbspace').empty();
    var res = Object.entries(data).map(([k, v]) => ({name: k, value: v}));
    $.each(res, function(index, value) {
        $('#bnbspace').append(`<li><b>${value.name}:</b> ${value.value}</li>`);
    });
}