const returnDog = async() =>{
    const api = await fetch ("http://dog-api.kinduff.com/api/facts")
    .then((response) => response.json())
    .then((data) => console.log(data.facts));
}
returnDog();