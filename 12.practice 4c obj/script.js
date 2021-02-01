'use strict';

const personalMovieDB = {
	count: 0,
	movies: {},
	actors: {},
	genres: [],
	privat: false,

	start: () => {
		personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели??', '');
		while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
			personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели??', '');
		}
	},

	rememberMyFilms: () => {
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
	},

	detectPerconalLevel: () => {
		if (personalMovieDB.count < 10) {
			alert('посмотрено маловато ...');
		} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
			alert('неплохо');
		} else if (personalMovieDB.count >= 30) {
			alert('мнооого');
		} else {
			alert('шта?');
		}
	},

	showMyDB: () => {
		if (personalMovieDB.privat != false) {
			console.log('error. Privat DB');
		} else {
			console.log(personalMovieDB);
		}
	},

	writeYourGenres: () => {
		for (let i = 0; i < 3; i++) {
			let genre = prompt(`Ваш любимый жани под номером ${i + 1}`);
			if (genre == '' || genre == null) {
				i--;
			} else {
				personalMovieDB.genres[i] = genre;
			}
		}
		personalMovieDB.genres.forEach((val, i, arr) => {
			console.log(`Любимый жанр #${i + 1} это ${val}`);
		});
	},

	toggleVisibleMyDB: () => {
		personalMovieDB.privat = !personalMovieDB.privat;
	}

};
