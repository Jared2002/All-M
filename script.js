const aplication = document.querySelector(".container");
const requestTarget = document.querySelector("#request-target");
const intersectionOptions = {
    threshold: 1
}
let loading = false;
let offSet = 0;
let contentHTML = "";
const urlComplement = "?ts=1&apikey=09e5833439f0e0873b1b7573045265a9&hash=46df8db5392d8e536f7b453780f1750f"

const url = "https://gateway.marvel.com:443/v1/public/characters" + urlComplement;

const onIntersect = ([entry]) =>{
    if (url && !loading && entry.isIntersecting){
        makeRequest();
    }
}

const makeRequest = () =>{
    let urlOff = url + "&offset=" + offSet;
    loading = true;
    fetch(urlOff)
    .then(response => response.json())
    .then((json) =>{
        console.log(json, "RESPONSE.JSON");
        for (const hero of json.data.results){
            let urlHero = hero.urls[0].url;
            contentHTML += `
                <div class="card">
                    <div class="img--container">
                        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}"/>
                    </div>
                    <div class="img--text">
                        <a href="${urlHero}" target="_blank">
                            <h3>${hero.name}</h3>
                            <p>${hero.description}</p>
                        </a>
                    </div>
                </div>`;
            loading = false;
        }
        aplication.innerHTML = contentHTML;
    })
    offSet += 20;
}

let observer = new IntersectionObserver (onIntersect, intersectionOptions);
observer.observe(requestTarget);