// Variable for all saved cocktail recipes
const recipeList = $('#recipe-list');

// Variable for cocktail name location
const singleCocktail = $('#single-cocktail');

// Variable for cocktail ingredients location
const cocktailIngR = $('#ingredients-Results');

// Variable for cocktail instruction location
const cocktailInsR = $('#instructions-Results');

// Variable for dynamically created saved cocktail buttons
const cocktailButtons = $('.saved-cocktail-buttons');

// Variables to create h4 titles & class tags for the saved cocktail ingredients/instructions
const recipeIngredientsHeading = $('<h4>').text("Ingredients").attr('class', 'ingredients');
const recipeInstructionsHeading = $('<h4>').text("Instructions").attr('class', 'instructions');

// Variable for the savedCocktailArray from local storage
const savedCocktailArr = JSON.parse(localStorage.getItem('savedCocktailArray'));

// Function that dynamically creates a button based on an individual saved cocktail
function dynamicSavedCocktailButton(item) {
    // Creates an anchor tag, sets the cocktail as its name, gives it a class and appends it to the recipeList
    let cocktailListItem = $("<a>").text(item).attr("class", "saved-cocktail-buttons");
    recipeList.append(cocktailListItem);
    // Creates delete button within each saved cocktail list
    let deleteCocktailBtn = $('<button>');
    deleteCocktailBtn.attr('id', 'deleteBtn');
    cocktailListItem.append(deleteCocktailBtn);
    // A function for when a list item is clicked the cocktail information is displayed on the HTML
    cocktailListItem.on('click', function (event) {
        event.preventDefault();
        // Replaces any spaces with % so able to search in the API
        let savedCocktail = item.replace(/ +/g, '%');
        // Variable for the particular saved cocktail
        const cocktailNameURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + savedCocktail;
        // Function to get the API data
        $.ajax({
            url: cocktailNameURL,
            method: "GET"
            // Once the ajax has the API data, it then empties any residial information on the page, ready to be repopulated
        }).then(function (response) {
            $('#single-cocktail').empty();
            $('#cocktail').empty();
            // Variables which pulls the cocktail information from the API and adds it to the respective dynamically created elements
            let cocktailName = $('<h2>').text(response.drinks[0].strDrink).attr('class', 'cocktail-title');
            let cocktailImg = $('<img>').attr('src', response.drinks[0].strDrinkThumb);
            singleCocktail.append(cocktailName, cocktailImg, recipeIngredientsHeading);
            // For every item in the saved cocktail array, extract the incredients and measure data and append to the relevant element
            for (let i = 1; i < 15; i++) {
                let ingredient = response.drinks[0]["strIngredient" + i];
                let measure = response.drinks[0]["strMeasure" + i];
                // If the value is not null, add the them to an array of objects
                if (ingredient !== null && measure !== null) {
                    let ingredients = [];
                    ingredients.push({
                        ingredient: ingredient,
                        measure: measure
                    });
                    // Loops the ingredients array
                    for (let j = 0; j < ingredients.length; j++) {
                        // Pulls data from the array, creates a Div and adds it to the HTML
                        let ingredientx = ingredients[j].ingredient;
                        let measurex = ingredients[j].measure;
                        let cocktailIngR = $('<div>').text(measurex + " of " + ingredientx);
                        singleCocktail.append(cocktailIngR);
                    };
                };
            };
            // Variables which pulls the cocktail instructions from the API and adds it to the respective dynamically created elements
            const cocktailInstrSrc = response.drinks[0].strInstructions;
            let cocktailInsR = $('<p>').text(cocktailInstrSrc);
            singleCocktail.append(recipeInstructionsHeading, cocktailInsR);
        });
    });
    // Dynamically create a button within the individual cocktail button which when pressed (Event listener), clears that particular cocktail item
    cocktailListItem.on('click', '#deleteBtn', function (event) {
        // Stops the main click function from firing when deleting a recipe from the list & local storage
        event.stopPropagation();
        // Refreshes page after each deletion to fix a bug where if you delete multiple items, they would re-add themselves
        location.reload();
        // Variable which removes a specific cocktail from the saved recipes list
        let clearCocktailBtn = $('#deleteBtn');
        clearCocktailBtn = $(event.target);
        clearCocktailBtn.parent(cocktailListItem).remove();
        // Variable for the specific cocktail name
        let cocktailnamevalue = cocktailListItem.text();
        // Removes the specific cocktail from the local storage array
        let newLsArray = savedCocktailArr.filter((item) =>
            item !== cocktailnamevalue
        );
        // Updates the local storage array without the excluded cocktail
        localStorage.setItem("savedCocktailArray", JSON.stringify(newLsArray));
    });
};

// For every item in the savedCocktailArr, run the dynamicSavedCocktailButton
savedCocktailArr.forEach(function (item, index) {
    dynamicSavedCocktailButton(item, index);
});

// Creates variable for the button ID
const backBtn = $('#backBtn');
// Initialises Jquery, adds a click function, takes the user to the home page and triggers the matchBtn event
$(document).ready(function () {
    backBtn.on('click', function () {
        window.location.replace('../../index.html');
    });
    $('#matchBtn').click();
    // Appends it to the HTML
    $('#recipe-list').append(backBtn);
});