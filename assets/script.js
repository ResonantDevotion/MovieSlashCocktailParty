// variables for ids
const cocktailImg = $('.cocktail');
const movieInfo = $('#movie');
const cocktailInfo = $('#cocktail');
const matchBtn = $('#matchBtn');
const saveBtn = $('#save');
const movieHeader = $('<h3>')

const movieCocktailPair = $('#movieCocktailPair');
const movieApiKey = "f4920d6233298948b21f1d6f36cc9694"

// variables for APIs
let randomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// let randomFilm = "https://www.omdbapi.com/?t=" + RANDOM?? + "&apikey=6a6153c5"
let duneFilm = "https://www.omdbapi.com/?t=dune&apikey=6a6153c5"
const movieQueryURL = "https://api.themoviedb.org/3/movie/popular?api_key=" + movieApiKey + "&language=en-US&page=1"

// function getRandom(arr) {
//     const randomIndex = Math.floor(Math.random() * arr.length)
//     const randomEl = arr[randomIndex]
//     return randomEl
// }



// when match button is clicked, event listen and complete following functions
matchBtn.on('click', function(event){
    event.preventDefault();

    // creating a variable which ajax pulls the film API and puts into the console
    //movie image is pulled by the API and dynamically appended to the #movie
    const filmAjax = $.ajax({
        url: movieQueryURL,
        method: 'GET'
    // Once the above function has run, continue
    }).then(function (response){
        // Loops the results array within the API response
        for (let i = 0; i < response.results.length; i++)
        // Creates a variable to randomise the array
        var randomIndex = Math.floor(Math.random() * response.results.length)
        // Randomise the array and find a movie
        const randomMovie = response.results[randomIndex]
        // Creates a variable for the movies name
        let movieName = randomMovie.title
        // Adds the text to a 'h3' tag
        movieHeader.text(movieName)
        // Adds the text to the HTML
        $('#movie').append(movieHeader)
        // Creates an image tag 
        const movieImg = $('<img>')
        // Pulls the image from the API and sets it to the variable
        movieImg.attr('src', "https://image.tmdb.org/t/p/w500/" + randomMovie.poster_path)
        // Adds the image to the HTML
        movieInfo.append(movieImg)
          
        })
              
    })

    //cocktail image is pulled by the API and dynamically appended to the #cocktail
    const cocktailAPi = $.ajax({
        url: randomCocktail,
        method: "GET"
    }).then(function (response){
        const cocktailImg = $('<img>');
        cocktailImg.attr('src', response.drinks[0].strDrinkThumb);
        cocktailInfo.append(cocktailImg);
        console.log(response);
    })

    //cocktail recipe is pulled by the API and dynamically appended to the recipe html
    //NOT WORKING
    // .then(function (response){
    //     // console.log(response);
    //     const recipe = response.drinks[0].strIngredient1;
    //     console.log(recipe);
    // });




// when save button is clicked, event listen and complete following functions
saveBtn.on('click', function(event){
    event.preventDefault();

    //NOT WORKING NOT SURE WHAT TO SAVE INTO LS YET
    localStorage.setItem("movie/cocktail", JSON.stringify(movieCocktailPair));

});
// the chosen movie/cocktail is saved to local storage