'use strict';

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели??', '');

const personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	privat: false
};


let lastFilm1 = prompt('Один из последних просмотренных фильмов?', ''),
	rate1 = +prompt('На сколько оцените его?', ''),
	lastFilm2 = prompt('Один из последних просмотренных фильмов?', ''),
	rate2 = +prompt('На сколько оцените его?', '');

personalMovieDB.movies[lastFilm1] = rate1;
personalMovieDB.movies[lastFilm2] = rate2;

console.log(personalMovieDB);