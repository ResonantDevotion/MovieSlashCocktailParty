// variable for all saved cocktail recipes
const savedRecipes = $('#savedRecipes');

// variable for cocktail name location
const cocktailNameR = $('#Cocktail-Name');

// variable for cocktail image location
const cocktailImgR = $('#cocktailImg');

// variable for cocktail ingredients location
const cocktailIngR = $('#ingredients-Results');

// variable for cocktail instruction location
const cocktailInsR = $('#instructions-Results');

// variable for pulling user saved cocktail from LS
const savedCocktail = JSON.parse(localStorage.getItem('name'));

localStorage['savedCocktail']=localStorage['name']; delete localStorage['name'];

// variable to pull cocktail API w user saved cocktail
const cocktailNameURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + savedCocktail;

console.log(cocktailNameURL);

$.ajax({
    url: cocktailNameURL,
    method: 'GET'
}).then(function (response) {
    console.log(response);


});









//function to retrieve the cocktail info from LS and append to cocktail locations
function getRecipe (){
    
    //retrieving cocktail name from LS and adding to html
    cocktailNameR.text(JSON.parse(localStorage.getItem('name')));

    //retrieving cocktail ingredients from LS and adding to html
    cocktailIngR.text(JSON.parse(localStorage.getItem('measure'), 'of', JSON.parse(localStorage.getItem('ingredients'))))

    cocktailIngR.text(JSON.parse(localStorage.getItem('measure'), 'of', JSON.parse(localStorage.getItem('ingredients'))));


    //retrieving cocktail instructions from LS and adding to html
    cocktailInsR.text(JSON.parse(localStorage.getItem('instructions')));

    let imageLS = JSON.parse(localStorage.getItem('image'));
    cocktailImgR.attr("src", imageLS);

};

getRecipe();


const backBtn = $('<button>')

$(document).ready(function() {
  backBtn.on('click', function() {

    window.location.replace('../../index.html')
    }) 
    
    $('#matchBtn').click()
   
    $('#savedRecipes').append(backBtn)
        
})

