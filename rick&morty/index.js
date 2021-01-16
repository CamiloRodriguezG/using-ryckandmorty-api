let container = document.getElementById('main');
let mainButton = document.getElementById('boton');
let content = '';
let myNonWhitespaceRegex = /\S/gi;
let mySpaceRegex = /\s+/g;
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

const getCharacterBysearch = (URLSEARCH) =>{
    content = '';
    fetch(URLSEARCH)
    .then( response => response.json())
    .then( response => {
        if(response.error == "There is nothing here"){
            content+=`
                <h2>Opps! seems the character you searched doesn't exit</h2>
            `;
            container.innerHTML = content;
        }else{
            content += `
                <div id="cards-container">
            `
            for(let i=0; i<response.results.length; i++){
                content+=`
                    <div class="character-card">
                        <button class="come-btn" onclick="goToCharacter(${response.results[i].id})"><img class="card-img" src="${response.results[i].image}" alt="${response.results[i].name}"/></button>
                        <div id="card-inf">
                            <p class="card-data"><b>${response.results[i].name}</b> 
                            <p class="card-data">${response.results[i].species} - ${response.results[i].status}</p>
                            <p class="card-data">Origin: ${response.results[i].origin.name}</p>
                        </div>
                    </div>
                `
            }
            content += `
                </div>
            `
            container.style.background = 'rgb(228,167,136)';
            container.innerHTML = content;
        }
    })
    mainButton.hidden = 'true';
}

const goToCharacter = id =>{
    container.style.boxShadow = '0 5px 20px -10px rgba(0,0,0,.75)';
    content = '';
    const URL = `https://rickandmortyapi.com/api/character/${id}`
    container.style.background = '#ddd';
    getInfFromApi(URL);
}

const searchCharacter = () => {
    container.style.boxShadow = 'none';
    let content = '';
    let URLSEARCH ='https://rickandmortyapi.com/api/character/';
    let name = document.getElementById('name-field').value;
    let species = document.getElementById('species-dropdown').value;
    let status = document.getElementById('status-dropdown').value;
    if(myNonWhitespaceRegex.test(name)){
        if(mySpaceRegex.test(name)){
            name = name.replace(mySpaceRegex, "%20");
        }
        URLSEARCH += `?name=${name}`;
        if(status != 'none'){
            URLSEARCH += `&status=${status}`
        }
        if(species != 'none'){
            URLSEARCH += `&species=${species}`
        }
        getCharacterBysearch(URLSEARCH);
    }else{
        content+=`
            <h2>Please enter a name before click seacrh</h2>
        `;
        container.innerHTML = content;
    }
}
getInfFromApi(URL);
