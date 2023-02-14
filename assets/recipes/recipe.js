// variable for all saved cocktail recipes
const recipeList = $('#recipe-list');

// // variable for cocktail name location
const cocktailNameR = $('#Cocktail-Name');

const singleCocktail = $('#single-cocktail');

// variable for cocktail image location
const cocktailImgR = $('#cocktailImg');

// variable for cocktail ingredients location
const cocktailIngR = $('#ingredients-Results');

// variable for cocktail instruction location
const cocktailInsR = $('#instructions-Results');

// variable for dynamically created saved cocktail buttons
const cocktailButtons = $('.saved-cocktail-buttons');

const recipeIngredientsHeading = $('<h4>').text("Ingredients").attr('class', 'ingredients');
const recipeInstructionsHeading = $('<h4>').text("Instructions").attr('class', 'instructions');


const savedCocktailArr = JSON.parse(localStorage.getItem('savedCocktailArray'));



function dynamicSavedCocktailButton(item, x) {
    let cocktailListItem = $("<a>").text(item).attr("id", "savedCocktail" + x).attr("class", "saved-cocktail-buttons");
    recipeList.append(cocktailListItem)

    //creates delete button within each saved cocktail list
    let deleteCocktailBtn = $('<button>');
    deleteCocktailBtn.attr('id', 'deleteBtn');
    cocktailListItem.append(deleteCocktailBtn);

    cocktailListItem.on('click', function (event) {
        event.preventDefault();
        //replaces any spaces with % so able to search in the API
        let savedCocktail = item.replace(/ +/g, '%');
        // replaceAll(' ','');

        const cocktailNameURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + savedCocktail;

        $.ajax({
            url: cocktailNameURL,
            method: "GET"

        }).then(function (response) {
            $('#single-cocktail').empty()
            $('#cocktail').empty()

            let cocktailName = $('<h2>').text(response.drinks[0].strDrink).attr('class', 'cocktail-title');
            let cocktailImg = $('<img>').attr('src', response.drinks[0].strDrinkThumb);
            singleCocktail.append(cocktailName, cocktailImg, recipeIngredientsHeading);

            let cocktailNameSrc = response.drinks[0].strDrink;
            cocktailNameR.text(cocktailNameSrc);

            let cocktailImgSrc = response.drinks[0].strDrinkThumb;
            cocktailImgR.attr('src', cocktailImgSrc);

            for (let z = 1; z < 15; z++) {
                let ingredient = response.drinks[0]["strIngredient" + z]
                let measure = response.drinks[0]["strMeasure" + z]
                // If the value is not null, add the them to an array of objects
                if (ingredient !== null && measure !== null) {
                    let ingredients = []
                    ingredients.push({
                        ingredient: ingredient,
                        measure: measure

                    })
                    // Loops the ingredients array
                    for (let y = 0; y < ingredients.length; y++) {
                        // Pulls data from the array, creates a Div and adds it to the HTML
                        let ingredientx = ingredients[y].ingredient;
                        let measurex = ingredients[y].measure;

                        let cocktailIngR = $('<div>').text(measurex + " of " + ingredientx);
                        singleCocktail.append(cocktailIngR);
                    }
                }
            }
            const cocktailInstrSrc = response.drinks[0].strInstructions;
            let cocktailInsR = $('<p>').text(cocktailInstrSrc);
            singleCocktail.append(recipeInstructionsHeading, cocktailInsR);
        });
    });
            //dynamically create a button within the individual cocktail button which when pressed (Event listener), clears that particular cocktail item
            cocktailListItem.on('click', '#deleteBtn', function (event) {
                event.stopPropagation();

                let clearCocktailBtn = $('#deleteBtn');
                clearCocktailBtn = $(event.target);
                clearCocktailBtn.parent(cocktailListItem).remove();
    
                let cocktailnamevalue = cocktailListItem.text();
    
                let newLsArray = savedCocktailArr.filter((item) => 
                item !== cocktailnamevalue
                )
                console.log(newLsArray);

                localStorage.setItem("savedCocktailArray", JSON.stringify(newLsArray))

                        console.log("singleCocktail");

                console.log(singleCocktail);

                singleCocktail.empty();
            });
}






savedCocktailArr.forEach(function (item, index) {
    dynamicSavedCocktailButton(item, index);
});

// Creates variable for the button ID
const backBtn = $('#backBtn')
// Initialises Jquery, adds a click function, takes the user to the home page and triggers the matchBtn event

$(document).ready(function () {
    backBtn.on('click', function () {
        window.location.replace('../../index.html')
    })
    $('#matchBtn').click()
    // Appends it to the HTML
    $('#recipe-list').append(backBtn);
})

