const poem = async() =>{
    const poems = await fetch ("https://poetrydb.org/title")
    .then((response) => response.json())
    .then((data) => console.log(data.titles[Math.floor(Math.random()*data.titles.length)]));
}
poem();