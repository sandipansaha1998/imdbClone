// All variable names are semantic
const searchDisplayDynamic = document.querySelector("#search-display");
const searchDisplay = document.querySelector("#searched-result");
// Capture user Input
const search = document.querySelector("#search input");
const favorites = document.querySelector('#favorites');

// Favourite Movies
let favMovies = {};

// Using Local Storage to store liked movies
if (localStorage.hasOwnProperty('movies'))
{
    favMovies = JSON.parse(localStorage.getItem('movies'));
}
else
{
    localStorage.setItem('movies',JSON.stringify(favMovies));
}


/* Talks to the API 
        params: title of the movie
        returns: JSON response object
*/
const fetchMovies = async function (title){
    let moviesJSON = await fetch(`https://www.omdbapi.com/?apikey=8934479c&s=${title}`)
    .then((response) => {return response.json()})
    .then((data) => {return data;})
    return moviesJSON;
    
};
/* Talks to the API 
        params: id of the movie
        returns: JSON response object
*/
const searchMovie = async function (id){  
    let movieJSON = await fetch(`https://www.omdbapi.com/?apikey=8934479c&i=${id}`)
    .then((response) => {{console.log(response.ok);return response.json()}})
    .then((data) => {return data;})
    return movieJSON;
};

/* param: JSON response object
   returns: Array of JSON objects with 'response':true
*/
const getMoviesArray = async function(response){
    movies = await fetchMovies(response).then(data => {
        if( data.Response == 'True')
        {
            return data.Search;
        }
    });
  
    return movies;
}
// Adds to Favorite
const addToFav =  function(event){
    console.log("add to fav")
    let movieObject = JSON.parse(event.currentTarget.id);// id of the album to be added to fav
    // //  Step to check if the movie is already included
    // //  if false:then added to fav list
    if(!favMovies.hasOwnProperty(movieObject.imdbID))    {
        let key = movieObject.imdbID;
        console.log(key);
       favMovies[key] = movieObject;
    localStorage.setItem("movies",JSON.stringify(favMovies));
    favorites.append(create.tab(movieObject,true));
    removeLikeListner();
    }
}




// Removes From Favorite
const removeFromFav =  function(event){
    event.stopPropagation();
    let movieObjectID = JSON.parse(event.currentTarget.id).imdbID;// id of the album to be added to fav
    delete favMovies[movieObjectID];
    localStorage.setItem("movies",JSON.stringify(favMovies));
   renderFavorites(Object.keys(favMovies));
}
// Adds Listner to Add to Favorite Button
const addLikeListner = function(){
    console.log("Added")
    const likes = document.querySelectorAll('.like');
    for(let like of likes)
    {
    like.addEventListener('click',addToFav);
    }
}

// Adds Listner to Remove from Favorite button
const removeLikeListner = function(){
    const deletes = document.querySelectorAll('.delete');
    for(let div of deletes)
    {
    div.addEventListener('click',removeFromFav);
    }
}

// Adds click listner
// Single click for relocating to details page
// Double click for adding to favorite 
const addTapListner = function(){
    
    const albums = document.querySelectorAll('.album');
    for(let album of albums)
    {
        let prevent=false;
        album.addEventListener('dblclick',event=>{
            event.currentTarget.classList.add('liked');
            prevent=true;
            dehighlight();
            addToFav(event);
        })
        album.addEventListener('click',(event)=>{
            let currentTarget = event.currentTarget;
            setTimeout(function (currentTarget){
                if(!prevent)
                {
                    // get data id
            window.location.href=`detail.html?id=${currentTarget.getAttribute('data-id')}`;
                }
            },200,currentTarget);
        });
        
    }
}

// Renders Favorite marked albums from Local Storage
const renderFavorites = async function (favMovieIDs)
{
    console.log("Rendered");
    favorites.innerHTML='';
    
    let movies = JSON.parse(localStorage.getItem('movies'));

    for (let movieID of Object.keys(movies))
    {
        console.log(movies[movieID])
        favorites.append(create.tab(movies[movieID],true));
    }
    removeLikeListner();
    addTapListner();
}


// Dynamic Display of input searched in input box
async function  displayDynamic(event){
    let movies = [];
    searchDisplayDynamic.innerHTML='';
    let inputString = event.currentTarget.value;
    movies = await getMoviesArray(inputString).then(data =>{return data});
    
    if(movies)
    {
        for(let movie of movies)
        {
            movieCard = create.tab(movie,false);
            searchDisplayDynamic.append(movieCard); 
        }
    }  
    addLikeListner();
}

// Displays in card format
async function  display(event){
    let movies = new Array();
    searchDisplay.innerHTML='';
    let inputString = event.currentTarget.value;
    movies = await getMoviesArray(inputString).then(data =>{return data});
    console.log(movies);
    if(movies)
    {
        for(let movie of movies)
        {
            movieCard = create.card(movie);
            searchDisplay.append(movieCard); 
           
        }
    }
    else{
        // append <h1>No movies found</h1>
        let heading = document.createElement('h1');
        heading.innerHTML='No movies found'
        searchDisplay.append(heading);
    }
    addTapListner();
}
// Focuses only on the dynamic search panel 
const focus  = function (){
    searchDisplay.style.opacity=0.2;
    const elem = document.querySelector('.fa-magnifying-glass');
    if(elem)
    {
    elem.classList.remove('fa-magnifying-glass');
    elem.classList.add('fa-xmark');
    elem.removeEventListener('click',focus);
    elem.addEventListener('click',defocus);
    }

}
// Removes the focus
const defocus = function(){
    searchDisplay.style.opacity=1;
    searchDisplayDynamic.innerHTML='';
    const elem = document.querySelector('.fa-xmark');
    if(elem)
    {
    elem.classList.remove('fa-xmark');
    elem.classList.add('fa-magnifying-glass');
    elem.removeEventListener('click',defocus);
    elem.addEventListener('click',focus);

    }
}

// Implements the like effect
const dehighlight = function () {
    let liked = document.querySelector('.liked');
    if(liked)
    {
    setTimeout(()=>{liked.classList.remove('liked');},1000);
    }
  }



// 
const inputFormListner = async function(event){
    //If entered is pressed the entire static result is displayed
        if(event.keyCode === 13)
        {
            event.preventDefault();
            defocus();
            await display(event);   
       }
        // Dynamic display
        else{
            
            displayDynamic(event);
            
        }
    }



const start = function(){
    renderFavorites(favMovies);
    search.addEventListener('click',focus);
    search.addEventListener('input',displayDynamic)
    search.addEventListener('keypress',inputFormListner);
}

start();






