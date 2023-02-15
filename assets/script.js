// Variables for ids
// Variable for targeting movie id using jquery 
const movieInfo = $('#movie');
// Variable for targeting cocktail id using jquery 
const cocktailInfo = $('#cocktail');
// Variable for targeting matchBtn id using jquery 
const matchBtn = $('#matchBtn');
// Variable for targeting save id using jquery 
const saveBtn = $('#save');

const movieHeader = $('<h3>');

const moviePlotHeading = $('<h4>').text("Plot").attr('class', 'plot');
const ingredientsHeading = $('<h4>').text("Ingredients").attr('class', 'ingredients');
const instructionsHeading = $('<h4>').text("Instructions").attr('class', 'instructions');

// Variables for modal 
// sets a variable for  the modal id
const modal = $('#modal');

// set a variable continue-btn for the modal
const modalContinueBtn = $('#continue-btn');
// set a variable recipe-btn for the modal
const modalRecipeBtn = $('#recipe-btn');

// Variables for APIs
// creates a variable for api key
const movieApiKey = "f4920d6233298948b21f1d6f36cc9694";
// creates a variable for coctail api url
const randomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// creates a variable for movie api url
const movieQueryURL = "https://api.themoviedb.org/3/movie/popular?api_key=" + movieApiKey + "&language=en-US&page=1";

// Clears the page upon refresh (will not clear after the save recipe function for improved user experience), removes the name key from local storage
window.onbeforeunload = function () {
    $('#movie').empty();
    $('#cocktail').empty();
    localStorage.removeItem("name");
};

// When the modal continue button is clicked, it will hide the modal
modalContinueBtn.click(function () {
    modal.hide();
});
// When the modal recipe button is clicked, it will send the user to the recipes page
modalRecipeBtn.click(function () {
    window.location.replace('./assets/recipes/recipe.html');
});

// When the match button is clicked, it will populate the webpage with a random cocktail/movie pair pulled from individual APIs
$('#matchBtn').on('click', function (event) {
    // Prevents the page from refreshing and empties any residial information on the page, ready to be repopulated
    event.preventDefault();
    $('#movie').empty();
    $('#cocktail').empty();

    // Function to get the movie API data
    $.ajax({
        url: movieQueryURL,
        method: 'GET'

        // Once the above function has run, continue
    }).then(function (response) {
        // Loops the results array within the API response
        for (let i = 0; i < response.results.length; i++);
        // Creates a variable to randomise the array, identifys the arrays and picks a movie
        var randomIndex = Math.floor(Math.random() * response.results.length);
        const randomMovie = response.results[randomIndex];
        // Creates a variable for the movies name and adds it to a 'h3' tag on the HTML
        let movieName = randomMovie.title
        movieHeader.text(movieName);
        $('#movie').append(movieHeader);
        // Creates an image tag, pulls the image from the API and adds the image to the HTML
        const movieImg = $('<img>');
        movieImg.attr('src', "https://image.tmdb.org/t/p/w500/" + randomMovie.poster_path);
        movieInfo.append(movieImg);
        // Creates a Div tag, pulls movie synopsis from the API and adds it to the HTML
        const moviePlot = $('<div>');
        moviePlot.text(randomMovie.overview);
        $('#movie').append(moviePlot);

    });
    // Function to get the cocktail API data using jquery. 
    $.ajax({
        url: randomCocktail,
        method: "GET"
        // Once the above function has run, continue.
    }).then(function (response) {
        // Creates a h3 title
        const cocktailHeader = $('<h3>');
        // Variable to save the name of the specific cocktail in local storage.
        let cocktailName = response.drinks[0].strDrink;
        localStorage.setItem('name', JSON.stringify((cocktailName)));
        // Appends the name to the header in the HTML.
        cocktailHeader.text(cocktailName);
        cocktailInfo.append(cocktailHeader);

        // Creates an image tag, pulls the image from the API and adds the image to the HTML
        const cocktailImgTag = $('<img>');
        let cocktailImg = response.drinks[0].strDrinkThumb;
        cocktailImgTag.attr('src', cocktailImg);
        cocktailInfo.append(cocktailImgTag);

        // Adds the heading for the Ingredients section (Above the loop to avoid duplication)
        cocktailInfo.append(ingredientsHeading);


        // Loops API array keys (strIngredient and strMeasure) and pulls data from input 1-15
        for (let i = 1; i < 15; i++) {
            let ingredient = response.drinks[0]["strIngredient" + i];
            let measure = response.drinks[0]["strMeasure" + i];
            // If the value is not null, create an array for the ingredients and add the value
            if (ingredient !== null && measure !== null) {
                let ingredients = [];
                ingredients.push({
                    ingredient: ingredient,
                    measure: measure
                });
                // Loops the ingredients array
                for (let j = 0; j < ingredients.length; j++) {
                    // Pulls data from the array, creates a Div and adds it to the HTML
                    var ingredientx = ingredients[j].ingredient;
                    var measurex = ingredients[j].measure;
                    const cocktailRecipe = $('<div>');
                    cocktailRecipe.text(measurex + " of " + ingredientx);
                    cocktailInfo.append(cocktailRecipe);
                };
            };
        };

        // Creates a div, adds text to the element and adds to the HTML. Adds the heading for the Instructions section 
        const cocktailInstructionsTag = $('<div>');
        const cocktailInstructions = response.drinks[0].strInstructions;
        cocktailInstructionsTag.text(cocktailInstructions);
        cocktailInfo.append(instructionsHeading);
        cocktailInfo.append(cocktailInstructionsTag);
    });
});


// When the saveBtn is clicked, it will save the specific cocktail information to local storage and shows a modal to the user
saveBtn.on('click', function (event) {
    // Prevents the page from refreshing
    event.preventDefault();
    // Shows the modal
    modal.show();

    // Variable which pulls cocktail name from local storage
    let desiredCocktail = JSON.parse(localStorage.getItem('name'));
    // Sets the desired cocktail name into local storage under a different key
    localStorage.setItem('savedCocktail', JSON.stringify((desiredCocktail)));
    // Variable for the saved cocktail 
    let savedCocktail = JSON.parse(localStorage.getItem('savedCocktail'));
    // Variable to get the savedCocktailArray
    let savedCocktailArray = JSON.parse(localStorage.getItem('savedCocktailArray')) || [];
    // Checks if the savedCocktail variable is present, if it is not, push the saved cocktail into the savedCocktailArray
    if (savedCocktailArray.indexOf(savedCocktail) === -1) {
        savedCocktailArray.push(savedCocktail);
    };
    // Saves the cocktail array to local storage
    localStorage.setItem('savedCocktailArray', JSON.stringify(savedCocktailArray));
});