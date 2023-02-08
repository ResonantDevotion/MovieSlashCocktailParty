// variables for ids
const cocktailImg = $('.cocktail');
const movieInfo = $('#movie');
const cocktailInfo = $('#cocktail');
const matchBtn = $('#matchBtn');
const saveBtn = $('#save');

const movieCocktailPair = $('#movieCocktailPair');

// variables for APIs
let randomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// let randomFilm = "https://www.omdbapi.com/?t=" + RANDOM?? + "&apikey=6a6153c5"
let duneFilm = "https://www.omdbapi.com/?t=dune&apikey=6a6153c5"

// when match button is clicked, event listen and complete following functions
matchBtn.on('click', function (event) {
    event.preventDefault();

    // creating a variable which ajax pulls the film API and puts into the console
    //movie image is pulled by the API and dynamically appended to the #movie
    const filmAjax = $.ajax({
        url: duneFilm,
        method: 'GET'

    }).then(function (response) {
        const movieImg = $('<img>');
        movieImg.attr('src', response.Poster);
        movieInfo.append(movieImg);
    })

    //cocktail image is pulled by the API and dynamically appended to the #cocktail
    const cocktailAPi = $.ajax({
        url: randomCocktail,
        method: "GET"
    }).then(function (response) {
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

});


// when save button is clicked, event listen and complete following functions
saveBtn.on('click', function (event) {
    event.preventDefault();

    //NOT WORKING NOT SURE WHAT TO SAVE INTO LS YET
    localStorage.setItem("movie/cocktail", JSON.stringify(movieCocktailPair));

});
// the chosen movie/cocktail is saved to local storage

