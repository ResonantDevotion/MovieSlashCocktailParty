const backBtn = $('<button>')
backBtn.on('click', function() {

    window.location.replace('../../index.html')


})

$('#savedRecipes').append(backBtn)