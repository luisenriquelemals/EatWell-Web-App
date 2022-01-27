var recipe = "tofu tikka masala"


$(document).ready(function()
{
    $(document).on('change','#recipe-searchbar',function (event){
        var text = $.trim(event.target.value).toLowerCase();
        if(text.length >= 4 && recipe.includes(text)){
            window.location.replace("./recipe-view.html");
        }
        else{
            $('.search-error').show();
        }
    });

    $(document).on('keyup','#recipe-searchbar',function (event){

        if(!(event.keyCode === 13)){
            console.log(event.keyCode)
            $('.search-error').hide();
        }
    });
});

