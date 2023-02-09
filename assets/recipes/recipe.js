const savedRecipes = $('#savedRecipes');
const savedCocktail = 'margarita';
// const savedCocktailURL = "www.thecocktaildb.com/api/json/v1/1/search.php?s=" + savedCocktail;

// console.log(savedCocktailURL);

function getRecipe (){
    
    savedRecipes.text("Cocktail name:" + JSON.parse(localStorage.getItem('name')));
    savedRecipes.text("Coctail amount" + JSON.parse(localStorage.getItem('measure')));

    let imageLS = JSON.parse(localStorage.getItem('image'));

    let recipeImg = $('<img>')

    recipeImg.attr("src", imageLS);

    savedRecipes.append(recipeImg);
};

getRecipe();

