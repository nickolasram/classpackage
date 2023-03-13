const $ = element => document.getElementById(element);

const setFact = async() =>{
    const api = await fetch ("https://dog-api.kinduff.com/api/facts")
    .then((response) => response.json())
    .then(data => $('factspace').innerHTML = data.facts);
}