// variable for all saved cocktail recipes
const savedRecipes = $('#savedRecipes');




// // variable for cocktail name location
// const cocktailNameR = $('#Cocktail-Name');

// // variable for cocktail image location
// const cocktailImgR = $('#cocktailImg');

// // variable for cocktail ingredients location
// const cocktailIngR = $('#ingredients-Results');

// // variable for cocktail instruction location
// const cocktailInsR = $('#instructions-Results');


const savedCocktailArr = JSON.parse(localStorage.getItem('savedCocktailArray'));
console.log(savedCocktailArr);



function dynamicSavedCocktailButton(){
    let cocktailListItem = $("<button>").text("savedCocktail").attr("id", 'savedCocktail[i]');

    savedRecipes.append(cocktailListItem)

    cocktailListItem.on('click', function (event) {
        event.preventDefault();
        let savedCocktail = JSON.parse(localStorage.getItem('savedCocktail'));
        const cocktailNameURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + savedCocktail;
        console.log(cocktailNameURL);


    });
}
savedCocktailArr.forEach(dynamicSavedCocktailButton);

// // creates a function 
// function createSavedCocktailButton(savedCocktail) {
//     //sets a variable that makes a button with a saved cocktail name inside
//     let cocktailListItem = $("<button>").text(savedCocktail);



//     //c
//     cocktailListItem.on('click', function (event) {
//         event.preventDefault();

//         const savedCocktail = JSON.parse(localStorage.getItem('savedCocktail'));

//         // variable to pull cocktail API w user saved cocktail
//         const cocktailNameURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + savedCocktail;
//         console.log(savedCocktail);
//         console.log(cocktailNameURL);

//         //function to run the API query
//         $.ajax({
//             url: cocktailNameURL,
//             method: 'GET'
//         }).then(function (response) {
//             console.log(response);
//         });
//     })

//     savedRecipes.append(cocktailListItem);

// }



// //TO DO
// // - Put saved cocktail into array



// createSavedCocktailButton();













// Creates variable for the button ID
const backBtn = $('#backBtn')
// Initialises Jquery, adds a click function, takes the user to the home page and triggers the matchBtn event

$(document).ready(function () {
    backBtn.on('click', function () {
        window.location.replace('../../index.html')
    })
    $('#matchBtn').click()
    // Appends it to the HTML
    $('#savedRecipes').append(backBtn)
})

