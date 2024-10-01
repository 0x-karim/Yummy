///  <reference types="../@types/jquery"/>

import * as action from "./action.js";
import * as api from "./apis.js";

setTimeout(action.ready , 500);
action.openBar();
action.closeBar();
action.activeLink();
action.searchMeal();
action.clearInput();
$('.links > a[href="#contactUs"]').on('click' , function() { 
    if($('#contactUs form').hasClass('hidden')){
        $('#contactUs form').removeClass('hidden');
    };
    if($('#contactUs button').hasClass('hidden')){
        $('#contactUs button').removeClass('hidden');
    };
    action.validation();
})

api.getMeals();
$('.links > a[href="#categories"]').on('click', function () {
    api.getMealsCategory();
});
$('.links > a[href="#area"]').on('click', function () {
    api.getMealsAreaAndIngredients('a');
});
$('.links > a[href="#ingredients"]').on('click', function () {
    api.getMealsAreaAndIngredients();
});
