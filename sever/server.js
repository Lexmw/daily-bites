const express = require('express');
const axios = require('axios');
const app = express();

//Should take the parameter from the front end and pass it to the route to search the api for the matching recipe
app.get('/recipes/:s', (req, res) => {
    let route = `https://www.themealdb.com/api/json/v1/1/search.php?s=${req.params.s}`;

    axios.get(route)
        .then(response => {
            let data = response.data;
            res.json(data);
        })
        .catch(err => ('something is wrong', console.log(err)));
});

//Should take the category from the front end and pass it to the route to search the api for the all recipes in the category
app.get('/recipes/category/:c', (req, res) => {
    let route = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${req.params.c}`;

    console.log(route, req.params.c);

    axios.get(route)
        .then(response => {
            let data = response.data;
            res.json(data);
        })
        .catch(err => ('something is wrong', console.log(err)));
});

//Should take a letter parameter from the front end and pass it to the route to search the api for the matching recipes
app.get('/recipes/:letter', (req, res) => {
    let route = `https://www.themealdb.com/api/json/v1/1/search.php?f=${req.params.letter}`;

    console.log(route, req.params.letter);

    axios.get(route)
        .then(response => {
            let data = response.data;
            res.json(data);
        })
        .catch(err => ('something is wrong', console.log(err)));
});

//list all categories
app.get('/recipes/all/categories', (req, res) => {
    let route = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    
    console.log(route);

    axios.get(route)
        .then(response => {
            let data = response.data;
            res.json(data);
        })
        .catch(err => ('something is wrong', console.log(err)));
});

module.exports = app;