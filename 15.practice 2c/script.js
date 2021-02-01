'use strict';

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели??', '');

const personalMovieDB = {
	count: numberOfFilms,
	movies: {},
	actors: {},
	genres: [],
	privat: false
};

for (let i = 0; i < 2; i++) {
	let lastFilm = prompt('Один из последних просмотренных фильмов?', ''),
		rate = +prompt('На сколько оцените его?', '');

	if (lastFilm == '' | rate == '' | lastFilm.length > 50 | lastFilm == null | rate == null) {
		alert('error');
		i--;
	} else {
		personalMovieDB.movies[lastFilm] = rate;
	}
}

if (personalMovieDB.count < 10) {
	alert('посмотрено маловато ...');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
	alert('неплохо');
} else if (personalMovieDB.count >= 30) {
	alert('мнооого');
} else {
	alert('шта?');
}

console.log(personalMovieDB);