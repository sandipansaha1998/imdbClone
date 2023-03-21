console.log("hello");
let id = window.location.href.split('?')[1].split('=')[1];

// Fetches movie details from API
const getMovie = async function (id){  
    let movieJSON = await fetch(`https://www.omdbapi.com/?apikey=8934479c&i=${id}&plot=full`)
    .then((response) => {return response.json();})
    .then((data) => {return data;})
    return movieJSON;
};
// Gobal details object to retreive information from API and store here
const details = {
    Title:'',
    Year:'',
    Rated:'',
    Released:'',
    Genre:'',
    Writer:'',
    Actors:'',
    Plot:'',
    Language:'',
    Awards:''
}
// PosterURL
let posterUrl='';

async function  updateDetials(){
    
        let movie  = await getMovie(id);
        console.log(movie)
        for(let key of Object.keys(details))
        {
            details[`${key}`] = movie[`${key}`];
        }
        posterUrl = movie.Poster;
    }
// Sets values into the DOM
async function setValues(){
    await updateDetials();
    document.querySelector("#details").style.display='block';

    document.querySelector("#loader").style.display='none';
    for(let key of Object.keys(details))
    {

        let targetDiv = document.querySelector(`#${key}`);
        console.log(targetDiv);
            targetDiv.innerHTML = details[`${key}`];
    }
    let img = document.querySelector('#Poster');
    img.src = posterUrl;
}


setValues();