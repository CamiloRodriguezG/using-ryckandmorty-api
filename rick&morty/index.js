let container = document.getElementById('main');
let content = '';
let fn = Math.floor(Math.random()*671);
const change = () =>{
    let numeroAzar = Math.floor(Math.random()*671);
    content = '';
    getInfFromApi(`https://rickandmortyapi.com/api/character/${numeroAzar}`);
}
const URL = `https://rickandmortyapi.com/api/character/${fn}`;
const getInfFromApi = (URL) =>{
    fetch(URL)
    .then( response => response.json())
    .then( response => {
        content+=`
            <img id="image" src="${response.image}" alt="${response.name}"/>
            <div id="inf">
                <div class="div">
                    <p class="iden">Name:</p>
                    <p class="info-ind"><b>${response.name}</b></p>
                    
                    <p class="iden">Current state:</p>
                    <p class="info-ind"><b>${response.status}</b></p>
                </div>
                <div class="div">
                    <p class="iden">Species:</p>
                    <p class="info-ind"><b>${response.species}</b></p>
                    
                    <p class="iden">Origin:</p>
                    <p class="info-ind"><b>${response.origin.name}</b></p>
                </div>
            </div>
        `
        container.innerHTML = content;
    })
}

getInfFromApi(URL);