// variables for ids
const cocktailImg = $('.cocktail');
const movieInfo = $('#movie');
const cocktailInfo = $('#cocktail');
const matchBtn = $('#matchBtn');
const saveBtn = $('#save');
const movieHeader = $('<h3>')
const ingredientInfo = $('#ingredients')
const ingredientsHeading = $('<h3>').text("Ingredients")
const instructionInfo = $('#instructions')
const instructionsHeading = $('<h3>').text("Instructions")
const recipes = $('.Recipes');
const savedCocktailArray = []

// variables for APIs
const movieApiKey = "f4920d6233298948b21f1d6f36cc9694"
const randomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const movieQueryURL = "https://api.themoviedb.org/3/movie/popular?api_key=" + movieApiKey + "&language=en-US&page=1"



// when match button is clicked, event listen and complete following functions
$('#matchBtn').on('click', function (event) {
    event.preventDefault();
    $('#movie').empty()
    $('#cocktail').empty()
    $('#ingredients').empty()
    $('#instructions').empty()

    // creating a variable which ajax pulls the film API and puts into the console
    //movie image is pulled by the API and dynamically appended to the #movie
    const filmAjax = $.ajax({
        url: movieQueryURL,
        method: 'GET'

        // Once the above function has run, continue
    }).then(function (response) {
        // Loops the results array within the API response
        for (let i = 0; i < response.results.length; i++)
            // Creates a variable to randomise the array, identifys the arrays and picks a movie
            var randomIndex = Math.floor(Math.random() * response.results.length)
        const randomMovie = response.results[randomIndex]
        // Creates a variable for the movies name and adds it to a 'h3' tag on the HTML
        let movieName = randomMovie.title
        movieHeader.text(movieName)
        $('#movie').append(movieHeader)
        // Creates an image tag, pulls the image from the API and adds the image to the HTML
        const movieImg = $('<img>')
        movieImg.attr('src', "https://image.tmdb.org/t/p/w500/" + randomMovie.poster_path)
        movieInfo.append(movieImg)
        //Creates a Div tag, pulls movie synopsis from the API and adds it to the HTML
        const moviePlot = $('<div>')
        moviePlot.text(randomMovie.overview)
        $('#movie').append(moviePlot)

    })

    //cocktail image is pulled by the API and dynamically appended to the #cocktail
    const cocktailAPi = $.ajax({
        url: randomCocktail,
        method: "GET"

    }).then(function (response) {
        // Creates a Div tag, pulls the name from the API and adds it to the HTML
        const cocktailName = $('<h3>')

        let cocktailNameStorage = response.drinks[0].strDrink
        localStorage.setItem('name', JSON.stringify((cocktailNameStorage)));

        cocktailName.text(cocktailNameStorage)
        cocktailInfo.append(cocktailName)
        // Creates an image tag, pulls the image from the API and adds the image to the HTML
        const cocktailImg = $('<img>')
        let cocktailImgg = response.drinks[0].strDrinkThumb;
        cocktailImg.attr('src', cocktailImgg)
        cocktailInfo.append(cocktailImg)
        cocktailInfo.append(ingredientsHeading)


        // Loops strIngredient and strMeasure from 1-15 in the response array
        for (let i = 1; i < 15; i++) {
            let ingredient = response.drinks[0]["strIngredient" + i]
            let measure = response.drinks[0]["strMeasure" + i]
            // If the value is not null, add the them to an array of objects
            if (ingredient !== null && measure !== null) {
                let ingredients = []
                ingredients.push({
                    ingredient: ingredient,
                    measure: measure
                })
                // Loops the ingredients array
                for (let i = 0; i < ingredients.length; i++) {
                    // Pulls data from the array, creates a Div and adds it to the HTML
                    var ingredientx = ingredients[i].ingredient
                    var measurex = ingredients[i].measure
                    const cocktailRecipe = $('<div>')
                    cocktailRecipe.text(measurex + " of " + ingredientx)
                    cocktailInfo.append(cocktailRecipe)
                }
            }
        }


        // Adds the heading for the Ingredients section

        // cocktailInfo.append(ingredientsHeading)
        // Creates a Div, adds text to the element and adds to the HTML
        const cocktailInstructions = $('<div>')
        const cocktailInstr = response.drinks[0].strInstructions;
        cocktailInstructions.text(cocktailInstr)
        cocktailInfo.append(instructionsHeading)
        cocktailInfo.append(cocktailInstructions)
    })
})

saveBtn.on('click', function () {
    //sets variable which pulls cocktail name from LS
    let desiredCocktail = JSON.parse(localStorage.getItem('name'));
    //sets the desired cocktail name into LS under a different key
    localStorage.setItem('savedCocktail', JSON.stringify((desiredCocktail)));
    //sets the saved cocktail into a variable
    let savedCocktail = JSON.parse(localStorage.getItem('savedCocktail'));
    //Pushes the saved cocktail into the savedCocktailArray
    savedCocktailArray.push(savedCocktail)
    console.log(savedCocktailArray)
    localStorage.setItem('savedCocktailArray', JSON.stringify(savedCocktailArray));

    let savedCocktailArr = JSON.parse(localStorage.getItem('savedCocktailArray'));
    console.log(savedCocktailArr);

});

savedCocktailArray.forEach(dynamicSavedCocktailButton);

function dynamicSavedCocktailButton(i){


    let cocktailListItem = $("<button>").text(savedCocktail);

    cocktailListItem.on('click', function (event) {
        event.preventDefault();
        let savedCocktail = JSON.parse(localStorage.getItem('savedCocktail'));
        const cocktailNameURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + savedCocktail;
        console.log(cocktailNameURL);


    });
}