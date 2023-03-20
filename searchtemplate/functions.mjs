$("#colllbl").hide()
$("#coll").hide()
$("#db").change(function(){
    $("#colllbl").show()
    $("#coll").show()
    let selection = collections[$("#db").val()]
    options(selection);
    getKeys();
});

var collections = {
    sample_mflix: ['comments', 'movies', 'sessions', 'theaters', 'users'],
    sample_weatherdata: ['data'],
    sample_restaurants: ['neighborhoods', 'restaurants']
}

function genOption(value){
    return `<option value="${value}">${value}</option>`
}

function options(values){
    $('#coll').empty();
    $.each(values, function( index, value ) {
        $('#coll').append(genOption(value));
      });
}

$('#coll').change(function(){
    getKeys();
})

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

function getKeys(){
    $('#giveonspace').empty();
    let db = $("#db").val();
    let coll = $("#coll").val();
    let url = `http://localhost:3000/findOne/?fields=any&database=${db}&collection=${coll}`
    console.log(url);
    $.ajax({
        url: url,
        method: "GET",
        success: function(data){
            popFields(Object.keys(JSON.parse(data.result)))
        }  
    })
}

function oneField(value){
    return `<input type="text" name="${value}" id="${value}" placeholder="${value}"></input>`
}

function popFields(values){
    $('#fields').empty();
    $.each(values, function( index, value ) {
        $('#fields').append(oneField(value));
      });
}

