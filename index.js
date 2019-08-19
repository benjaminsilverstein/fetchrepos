'use strict';

function getRepos(searchHandle) {
    fetch(`https://api.github.com/users/${searchHandle}/repos?type=all`)
   .then (response => {
     if (response.ok) {return response.json()}
    throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(function (err)  {
        displayError(err)
    })
}

function displayError(err) {
    $('.results').append(`<div class="repo"><p>${err}</p></div>`)
    $('.results').removeClass('hide')
}

function displayResults (responseJson) {
    let renderResults = function (object) {
        $('.results').append(`<div class="repo"><h3>${object.name}</h3><p><a href="${object.html_url}">Visit Repo</a></p></div>`)
        }
        responseJson.forEach(renderResults);
        $('.results').removeClass('hide')
}

function watchForm() {
    $('form').submit(event =>{
        event.preventDefault();
        $('.results').empty();
        let searchHandle = $('#js-search-handle').val();
        console.log(searchHandle);
        getRepos(searchHandle);
    })
}

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
  });