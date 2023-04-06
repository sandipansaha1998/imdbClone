var create = new Object();



// Create tab
create.tab = function (movie,isFavorite)
{
// create container element
const albumDiv = document.createElement('div');
albumDiv.classList.add('album','tab','d-flex','col','justify-content-center','px-2','my-1');
//Stores IMDB ID of the movie as data-id
albumDiv.setAttribute('data-id',movie.imdbID);

// create image element and set its attributes
const albumImg = document.createElement('img');
albumImg.classList.add('col-1');
albumImg.src = movie.Poster;
albumImg.alt = 'Poster Not Found';


// create album details div element and set its contents
const albumDetailsDiv = document.createElement('div');
albumDetailsDiv.classList.add('album-details', 'd-flex', 'flex-column', 'mx-2');
const albumTitle = document.createElement('h5');
albumTitle.textContent = movie.Title;
const albumYear = document.createElement('h7');
albumYear.textContent = movie.Year;
albumDetailsDiv.appendChild(albumTitle);
albumDetailsDiv.appendChild(albumYear);

// create  icon element and set its attributes
const icon = document.createElement('i');
// Checks if the tab would rendered into Favorties DOM or dynamic search DOM
if(isFavorite)
{
    icon.classList.add('delete','fa-solid', 'fa-trash', 'ms-auto', 'fa-xl', 'align-self-center');
}
else
{
    icon.classList.add('like','fa-solid', 'fa-heart', 'ms-auto', 'fa-xl', 'text-danger', 'align-self-center');
}

// Stores the stringified version of the JSON movie object
// Referance to the icon both for adding and removing from favorites
icon.id = JSON.stringify(movie);

// append child elements to parent div element
albumDiv.appendChild(albumImg);
albumDiv.appendChild(albumDetailsDiv);
albumDiv.appendChild(icon);


return albumDiv;
}


// Create Card
create.card = function (movie){
// create album container
const albumDiv = document.createElement('div');
albumDiv.classList.add('album','card', 'd-flex', 'flex-column', 'col-10', 'col-md-4', 'col-xxl-3', 'align-items-center', 'test','my-5','mx-auto');

// Stores the stringified version of the JSON movie object
albumDiv.id = JSON.stringify(movie);

//Stores IMDB ID of the movie as data-id
albumDiv.setAttribute('data-id',movie.imdbID);
// create image container div
const imgContainerDiv = document.createElement('div');
imgContainerDiv.classList.add('img-container', 'col-8', 'col-sm-7', 'col-md-10', 'test');

// create image element
const img = document.createElement('img');
img.alt = 'Poster Not Found';
img.src =movie.Poster;
img.id = movie.imdbID;

// append image element to image container div
imgContainerDiv.appendChild(img);

// create album details div
const albumDetailsDiv = document.createElement('div');
albumDetailsDiv.classList.add('album-details', 'd-flex', 'flex-column', 'align-items-center', 'test', 'container-fluid', 'mt-auto');

// create title element
const title = document.createElement('h5');
title.classList.add('test', 'text-wrap', 'text-break', 'container-fluid','text-center');
title.textContent = movie.Title;

// create badges container div
const badgesDiv = document.createElement('div');
badgesDiv.classList.add('container-fluid', 'd-flex', 'justify-content-center', 'test');

// create series badge
const seriesBadge = document.createElement('span');
seriesBadge.classList.add('badge', 'bg-secondary', 'me-auto');
seriesBadge.textContent = movie.Type;

// create year badge
const yearBadge = document.createElement('span');
yearBadge.classList.add('test', 'badge', 'bg-light', 'text-dark');
yearBadge.textContent = movie.Year;

// append badges to badges container div
badgesDiv.appendChild(seriesBadge);
badgesDiv.appendChild(yearBadge);

// append title and badges container to album details div
albumDetailsDiv.appendChild(title);
albumDetailsDiv.appendChild(badgesDiv);

// append image container and album details to album div
albumDiv.appendChild(imgContainerDiv);
albumDiv.appendChild(albumDetailsDiv);




return albumDiv;

}



