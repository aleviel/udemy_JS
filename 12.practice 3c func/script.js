'use strict';

let numberOfFilms = 0;

start();

const personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	privat: false
};

function start() {
	numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели??', '');

	while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
		numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели??', '');
	}
}

function detectPerconalLevel() {
	if (personalMovieDB.count < 10) {
		alert('посмотрено маловато ...');
	} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
		alert('неплохо');
	} else if (personalMovieDB.count >= 30) {
		alert('мнооого');
	} else {
		alert('шта?');
	}
}

function rememberMyFilms() {
	for (let i = 0; i < 2; i++) {
		let lastFilm = prompt('Один из последних просмотренных фильмов?', ''),
			rate = +prompt('На сколько оцените его?', '');

		if (lastFilm == '' || rate == '' || lastFilm.length > 50 || lastFilm == null || rate == null) {
			alert('error');
			i--;
		} else {
			personalMovieDB.movies[lastFilm] = rate;
		}
	}
}

function showMyDB() {
	if (personalMovieDB.privat != false) {
		console.log('error. Privat DB');
	} else {
		console.log(personalMovieDB);
	}
}

function writeYourGenres() {
	for (let i = 0; i < 3; i++) {
		personalMovieDB.genres[i] = prompt(`Ваш любимый жани под номером ${i + 1}`);
	}
}

rememberMyFilms();
showMyDB();
writeYourGenres();
detectPerconalLevel();
