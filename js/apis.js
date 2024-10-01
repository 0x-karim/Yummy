///  <reference types="../@types/jquery"/>
import * as display from "./display.js";
import * as action from "./action.js";

export let meals = [];

export async function getMeals(meal) {
    try {
        
        let response;

        meal ? response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        : response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);

        let data = await response.json();
        meals = data.meals;
        display.displayMeals();
        action.getId();
        action.showDetails();
    } catch(error) {

        console.log(error);
    }
};

export async function getMealsById(id) {
    try {
        
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await response.json();
        meals = data.meals;
        display.displayDetails();
    } catch(error) {

        console.log(error);
    }
};

export async function getMealsByFirstLetter(letter) {
    try {
        
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let data = await response.json();
        meals = data.meals;
        if (meals != null) {
            display.displayMeals();
            $('.searchMeals').removeClass('hidden');
        }else {
            $('.searchMeals').addClass('hidden');
        };
        action.getId();
        action.showDetails();
    } catch(error) {

        console.log(error);
    }
};

export async function getMealsCategory() {
    try {
        
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        let data = await response.json();
        meals = data.categories;
        display.displaycategories();
        action.categorayName();
        categorayFilter();
        action.filterMeals();
    } catch(error) {

        console.log(error);
    }
};

export async function categorayFilter(categoray) {
    try{

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoray}`);
        let data = await response.json();
        meals = data.meals;
        display.displayMeals();
        action.getId();
        getMealsById();
        action.showDetails();        
    }catch(error) {

        console.log(error);
    };
};

export async function getMealsAreaAndIngredients(type) {
    try {
        
        let response;

        if (type) {

            response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`);
            let data = await response.json();
            meals = data.meals;
            display.displayAreas();
        }else {

            response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            let data = await response.json();
            meals = data.meals;
            display.displayingredients();
        }
        action.filterName();
        mealsFilter();
        action.filterMeals();
    } catch (error) {
        
        console.log(error);
    };
};

export async function mealsFilter(filterType , mealName) {
    try {
        
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${filterType}=${mealName}`);
        let data = await response.json();
        meals = data.meals;
        display.displayMeals();
        action.getId();
        getMealsById();
        action.showDetails();
    } catch (error) {
        
       console.log(error);
    };
};