const backBtn = $('<button>')

$(document).ready(function() {
  backBtn.on('click', function() {

    window.location.replace('../../index.html')
    }) 
    
    $('#matchBtn').click()
   
    $('#savedRecipes').append(backBtn)
        
})

