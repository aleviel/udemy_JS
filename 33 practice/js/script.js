'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    const filmList = document.querySelector('.promo__interactive-list'),
        addMovieForm = document.querySelector('.add'),
        addMovieInput = addMovieForm.querySelector('.adding__input'),
        addCheckBox = addMovieForm.querySelector('[type="checkbox"]');

    document.querySelectorAll('.promo__adv img').forEach((item) => item.remove());
    document.querySelector('.promo__genre').textContent = 'Драма';
    document.querySelector('.promo__bg').style.backgroundImage = 'url(./img/bg.jpg)';

    filmList.innerHTML = '';
    movieDB.movies.sort();
    movieDB.movies.forEach((item, i) => {
        filmList.innerHTML += `<li>${i + 1}. ${item}</li>`;
    });

});
