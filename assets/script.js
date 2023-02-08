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
const movieQueryURL = "https://api.themoviedb.org/3/movie/popular?api_key=" + movieApiKey + "&language=en-US&page=1"



// when match button is clicked, event listen and complete following functions
matchBtn.on('click', function(event){
    event.preventDefault();
    $('#movie').empty()
    $('#cocktail').empty()
  
    

    // creating a variable which ajax pulls the film API and puts into the console
    //movie image is pulled by the API and dynamically appended to the #movie
    const filmAjax = $.ajax({
        url: movieQueryURL,
        method: 'GET'
    // Once the above function has run, continue
    }).then(function (response){
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
    }).then(function (response){
        //
        const cocktailName = $('<div>')
        cocktailName.text(response.drinks[0].strDrink)
        cocktailInfo.append(cocktailName)
        //
        const cocktailImg = $('<img>')
        cocktailImg.attr('src', response.drinks[0].strDrinkThumb)
        cocktailInfo.append(cocktailImg)
        //
    
        for (let i = 1; i < 15; i++) {
           
         let ingredient = response.drinks[0]["strIngredient" + i]
         let measure = response.drinks[0]["strMeasure" + i]
         
         if (ingredient !== null && measure !== null) {
         let ingredients = []
         ingredients.push({
            ingredient: ingredient,
            measure: measure
            })
        
         
        
        for (let i = 0; i < ingredients.length; i++) {
           
            var ingredientx = ingredients[i].ingredient
            var measurex = ingredients[i].measure
            const cocktailRecipe = $('<div>')
            cocktailRecipe.text(measurex + " of " + ingredientx)
            cocktailInfo.append(cocktailRecipe)
        }
        }
        }//
        const cocktailInstructions = $('<div>')
        cocktailInstructions.text(response.drinks[0].strInstructions)
        cocktailInfo.append(cocktailInstructions)
        console.log("strIngredient1, " + response.drinks[0]["strIngredient" + "i"])
        console.log(response)
    
 })
        
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