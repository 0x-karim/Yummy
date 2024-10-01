///  <reference types="../@types/jquery"/>
import * as api from "./apis.js";

export function displayMeals() {

    let box = '';
    for (let i = 0; i < api.meals.length; i++) {

        box += `<div class="item rounded-lg relative w-full overflow-hidden group">
                    <img src="${api.meals[i].strMealThumb}" class="w-full rounded-lg" alt="${api.meals[i].strMeal}">
                    <div  id="${api.meals[i].idMeal}" class="layer capitalize w-full px-4 text-center text-2xl font-semibold flex items-center justify-center
                    bg-[rgba(255,255,255,0.5)] backdrop-blur-sm absolute inset-x-0  bottom-[-100%] top-[110%] group-hover:top-0 group-hover:bottom-0
                    cursor-pointer duration-700 rounded-lg">${api.meals[i].strMeal}</div>
                </div>`
    };

    $('.meals').html(box);
    $('.searchMeals').html(box);
    $('.categorayMeals').html(box);
    $('.areaMeals').html(box);
    $('.ingredientsMeals').html(box);
};

export function displayDetails() {

    const recipe = [];
    for (let i = 1; i <= 20; i++) {

        const measure = api.meals[0][`strMeasure${i}`];
        const ingredient = api.meals[0][`strIngredient${i}`];

        if(measure && ingredient) {
            recipe.push(`<span>${measure} ${ingredient}</span>`);
        };
    };   

    let box = `<div class="detailsInfo relative flex flex-col lg:flex-row space-y-6 lg:space-x-6">
                    <div class="product w-full lg:w-4/12 self-start relative flex flex-col items-center">
                        <img src="${api.meals[0].strMealThumb}" class="w-full rounded-lg mt-6" alt="${api.meals[0].strMeal}">
                        <h2 class="text-slate-50 text-center text-2xl font-semibold capitalize 
                        bg-[#161616] py-2 px-4 w-auto rounded-lg absolute bottom-4">${api.meals[0].strMeal}</h2>
                    </div>
    
                    <div class="desc text-center lg:text-left text-slate-50 mt-2 w-full lg:w-8/12">
                        <h3 class="text-[28px] font-semibold">Instructions</h3>
                        <p class="py-1">${api.meals[0].strInstructions}</p>
                        <p class="text-[28px] font-semibold capitalize">area :<span class="font-light"> ${api.meals[0].strArea}</span></p>
                        <p class="text-[28px] font-semibold capitalize">category :<span class="font-light"> ${api.meals[0].strCategory}</span></p>
                        <p class="text-[28px] font-semibold capitalize">recipes :</p>
                        <div class="recipes *:bg-teal-900 *:px-2 *:py-1 *:rounded-lg *:mt-4 *:ms-3 *:inline-block *:font-light">${recipe.join('')}</div>
                        <p class="text-[28px] font-semibold capitalize pt-4">tags :</p>
                        <div class="tags space-x-3 mt-4 mb-5 *:bg-red-900 *:capitalize *:font-light *:px-2 *:py-1 *:ms-3 *:rounded-lg"></div>
    
                        <button class="mt-3"><a href="${api.meals[0].strSource}" class="px-4 py-2 bg-green-700 hover:bg-green-800 rounded-lg capitalize me-1 no-underline"> source</a></button>
                        <button class="mt-3"><a href="${api.meals[0].strYoutube}" class="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-lg capitalize no-underline"> youtube</a></button>
                    </div>
                </div>`;

    $('.datails').html(box);

    const mealTags = [];
    const strTags = api.meals[0].strTags;
    const tags = strTags ? strTags.split(","): [];
    for (let tag of tags) {        
        mealTags.push(`<span>${tag}</span>`);
    }; 
    if(tags.length == 0){
        $('.tags').prev().addClass('hidden');
    };
 
    $('.tags').html(mealTags);
};

export function displaycategories() {
    
    let box = '';
    for (let i = 0; i < api.meals.length; i++) {
        
        box += `<div class="item rounded-lg h-52 relative w-full overflow-hidden group">
                    <img src="${api.meals[i].strCategoryThumb}" class="w-full rounded-lg h-full" alt="${api.meals[i].strCategory}">
                    <div id="${api.meals[i].idMeal}" class="layer w-full text-center flex flex-col items-center justify-center bg-[rgba(255,255,255,0.5)] cursor-pointer text-sm font-light
                    backdrop-blur-sm absolute inset-x-0 bottom-[-100%] top-[110%] group-hover:top-0 group-hover:bottom-0 duration-700 rounded-lg px-2 leading-tight">
                    <span class="text-3xl font-semibold capitalize mb-5">${api.meals[i].strCategory}</span>${api.meals[i].strCategoryDescription.split(' ').slice(0, 20).join(' ')}</div>
                </div>`;
    };

    $('.categoray').html(box);
};

export function displayAreas() {  
    
    let box = '';
    let area = [];

    for (let i = 0; i < 20; i++) {
        
        area.push(api.meals[i].strArea)
    }
    
    for (let i = 0; i < area.length; i++) {
        
        box += `<div class="item h-44 bg-neutral-700 hover:bg-[rgb(54,54,54)] rounded-lg flex flex-col items-center justify-center cursor-pointer">
                    <i class="fa-solid fa-city text-red-500 text-[55px]"></i>
                    <h3 class="capitalize text-2xl text-slate-50 font-semibold mt-2">${area[i]}</h3>
                </div>`
    };

    $('.areaItem').html(box);
};

export function displayingredients() {  
    
    let box = '';
    let area = [];

    for (let i = 0; i < 20; i++) {
        
        area.push({
            name: api.meals[i].strIngredient,
            Description: api.meals[i].strDescription.split(' ').slice(0,10).join(' ')
        });
    };
    
    for (let i = 0; i < area.length; i++) {
        
        box += `<div class="item h-48 bg-neutral-700 hover:bg-[rgb(54,54,54)] rounded-lg flex flex-col items-center justify-center cursor-pointer">
                    <i class="fa-solid fa-bowl-food text-green-500 text-[55px]"></i>
                    <h3 class="capitalize text-2xl text-slate-50 font-semibold my-2">${area[i].name}</h3>
                    <p class="text-slate-50 text-center leading-tight text-sm px-8">${area[i].Description}</p>
                </div>`
    };

    $('.ingredientsItem').html(box);
};