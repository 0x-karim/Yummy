///  <reference types="../@types/jquery"/>
import * as api from "./apis.js";

export function ready() {
    $(function() {
        $('.loadScreen').fadeOut(1000);
    });
};

export function openBar() {
    $('.fa-bars').on('click' , function() {
        $('.fa-bars , .fa-close').toggleClass('hidden');
        $('aside').toggleClass('z-50');
        $('.sideBar').animate({right: '0%'} , 800 , function() {
            $('.links > a').animate({top: '0%'} , 450);
        });
    });
};

export function activeLink() {
    $('.links > a[href^="#"]').on('click' , function(e) {
        let secId =$(e.target).attr('href');

        $(e.target).addClass('active');
        $('.active').css({color: '#dc2626'});
        $(secId).removeClass('hidden');
        $(secId).siblings().not('aside').addClass('hidden');
        $(secId).siblings().not('aside').children().addClass('hidden');
        $(secId).children().eq(0).removeClass('hidden');
        $(secId).children().eq(1).addClass('hidden');
        $(e.target).siblings().removeClass('active');
        $('.active').siblings().css({color: '#f8f8fc'});
    });
};

export function closeBar() {
    $('.fa-close , .links > a[href^="#"]').on('click' , function() {
        $('.fa-close , .fa-bars').toggleClass('hidden');
        $('.links > a').animate({top: '120%'} , 350);
        $('.sideBar').animate({right: '75.75%'} , 400 , function() {
            $('aside').toggleClass('z-50');
        }); 
    });
};

export function showDetails() {
    $('.meals > .item').on('click' , function() {       
        $('.meals , .datails').toggleClass('hidden');
        api.getMealsById();
    });
    $('.searchMeals > .item').on('click' , function() {
        $('#search , .datails').toggleClass('hidden');
    });
    $('.categorayMeals > .item').on('click' , function() {
        $('#categories , .datails').toggleClass('hidden');
    });
    $('.areaMeals > .item').on('click' , function() {
        $('#area , .datails').toggleClass('hidden');
    });
    $('.ingredientsMeals > .item').on('click' , function() {
        $('#ingredients , .datails').toggleClass('hidden');
    });
};

export function filterMeals() {
    $('.categoray > .item').on('click' , function() {
        $('.categoray , .categorayMeals').toggleClass('hidden');
    });
    $('.areaItem > .item').on('click' , function() {
        $('.areaItem , .areaMeals').toggleClass('hidden');
    });
    $('.ingredientsItem > .item').on('click' , function() {
        $('.ingredientsItem , .ingredientsMeals').toggleClass('hidden');
    });
};

export function getId() {
    $(`.meals > .item > .layer , 
        #search > .searchMeals > .item > .layer ,
        #categories > .categorayMeals > .item > .layer ,
        #area > .areaMeals > .item > .layer ,
        #ingredients > .ingredientsMeals > .item > .layer`).on('click' , function(e) {
        let itemId = $(e.target).attr('id');
        api.getMealsById(itemId);
    });
};

export function searchMeal() {
    $('.inputs input').eq(0).on('input' , function () {  
        let mealName = $(this).val();
        
        if(mealName == "") {
            $('.searchMeals , .inputs .mealName .fa-xmark').addClass('hidden');
        }else {                
            $('.searchMeals , .inputs .mealName .fa-xmark').removeClass('hidden');
            api.getMeals(mealName);
        };
    });
        
    $('.inputs input').eq(1).on('input' , function () {  
        let mealLetter = $(this).val();
        
        if(mealLetter != "") {
            api.getMealsByFirstLetter(mealLetter);
            $('.searchMeals , .inputs .mealLetter .fa-xmark').removeClass('hidden');
        }else {                
            $('.searchMeals , .inputs .mealLetter .fa-xmark').addClass('hidden');
        };
    });
};

export function clearInput() {  
    $('#contactUs button').on('click' , function () {  
        $('#contactUs form div input').val('').removeClass('valid');
        $('#contactUs form div .fa-check').addClass('hidden');
        $('#contactUs button').attr('disabled' , 'disabled');
    });
    $('.inputs .mealLetter .fa-xmark').on('click' , function () {  
        $(this).siblings().val('');
        $('.inputs .mealLetter .fa-xmark').addClass('hidden');
    });
    $('.inputs .mealName .fa-xmark').on('click' , function () {  
        $(this).siblings().val('');
        $('.inputs .mealName .fa-xmark').addClass('hidden');
    });
};

export function categorayName() {  
    $('.categoray > .item > .layer').on('click' , function() { 
        let name = $(this).children().eq(0).text();
        api.categorayFilter(name);
    });
};

export function filterName() {  
    $('.areaItem > .item').on('click' , function(e) { 
        let area = $(e.target).children().eq(1).text();
        api.mealsFilter('a' , area);
    });
    $('.ingredientsItem > .item').on('click' , function(e) { 
        let area = $(e.target).children().eq(1).text();
        api.mealsFilter('i' , area);
    });
};

export function validation() {

    $('#contactUs form input').on('input', function(e) {

        const passwordInput = $('#contactUs form input[type="password"]');
        const regex = {
            nameInput: /^[a-zA-Z\s]+$/g,
            emailInput: /^.+(@)[A-Za-z0-9]+\.[A-Za-z]{2,}$/g,
            phoneInput: /^(01)[0125]\d{8}$/g,
            ageInput: /^[1-9][0-9]?$/g,
            passwordInput: /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$/g,
            rePassword: null
        };
  
        if ($(e.target).attr('id') === 'rePassword') {
            if ($(e.target).val() !== passwordInput.val()) {

                $(e.target).addClass('invalid').removeClass('valid');
                $(e.target).siblings().eq(2).removeClass('hidden');
                $(e.target).siblings().eq(1).removeClass('hidden');
                $(e.target).siblings().eq(0).addClass('hidden');
            } else {

                $(e.target).addClass('valid').removeClass('invalid');
                $(e.target).siblings().eq(2).addClass('hidden');
                $(e.target).siblings().eq(0).removeClass('hidden');
                $(e.target).siblings().eq(1).addClass('hidden');
            };
        }else {
            if (regex[$(e.target).attr('id')].test($(e.target).val())) {

                $(e.target).addClass('valid').removeClass('invalid');
                $(e.target).siblings().eq(2).addClass('hidden');
                $(e.target).siblings().eq(0).removeClass('hidden');
                $(e.target).siblings().eq(1).addClass('hidden');
            } else {
                
                $(e.target).addClass('invalid').removeClass('valid');
                $(e.target).siblings().eq(2).removeClass('hidden');
                $(e.target).siblings().eq(1).removeClass('hidden');
                $(e.target).siblings().eq(0).addClass('hidden');
            };
        };

        let valid = $('#contactUs form input').length === $('#contactUs form input.valid').length;        
        $('#contactUs button').prop('disabled', !valid);
    });
};