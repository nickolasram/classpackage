const returnApartments = async() =>{
    const api = await fetch ('https://data.mongodb-api.com/app/data-hejgp/endpoint/data/v1/action/find',
        { 
            method: 'POST',
            credentials: 'omit',
            headers: {
                "Content-Type": 'application/json',
                "Access-Control-Request-Headers": '*',
                "api-key": 'LbDURdvoaYeDAFSfYAqUraCyVFVN89I8SNMxb5BEhrBUIeGJZfI2bqlJz3jAxchw'
            },
            body: {
                "data-raw": {
                    "collection":"listingsAndReviews",
                    "database":"sample_airbnb",
                    "dataSource":"Cluster0",
                    "filter": {"property_type": "Apartment"},
                    "projection": {
                        "name": 1,
                        "listing_url": 1,
                        "summary": 1,
                        "property_type": 1,
                         "cancellation_policy": 1
                    }
                }
            }
        })
    .then((response) => response.json())
    .then((data) => console.log(data));
}
returnApartments();