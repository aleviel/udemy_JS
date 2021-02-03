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

    document.querySelector('.promo__genre').textContent = 'Драма';
    document.querySelector('.promo__bg').style.backgroundImage = 'url(./img/bg.jpg)';

    const filmList = document.querySelector('.promo__interactive-list'),
        adv = document.querySelectorAll('.promo__adv img'),
        addForm = document.querySelector('.add'),
        addInput = document.querySelector('.adding__input'),
        addCheckBox = document.querySelector('[type="checkbox"]');

    function delItem(items) {
        items.forEach((item) => item.remove());
    }

    function sortList(list) {
        list.sort();
    }

    function createMovieList(list, movieList) {
        movieList.innerHTML = '';
        sortList(list);
        list.forEach((item, i) => {
            movieList.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${item}
                <div class="delete"></div>
            </li>
        `;
        });

        movieList.querySelectorAll('.delete').forEach((item, i) => {
            item.addEventListener('click', () => {
                item.parentElement.remove();
                list.splice(i, 1);
                createMovieList(list, movieList);
            });
        });
    }

    function addItem(item, list) {
        let newFilm = item.value;

        for (let i = 0; i < 1; i++) {
            if (newFilm == '') {
                break;
            } else {
                if (addCheckBox.checked) {
                    console.log('added favorite movie');
                }
                if (newFilm.length < 21) {
                    list.push(newFilm);
                } else {
                    newFilm = `${newFilm.substring(0, 21)}...`;
                    list.push(newFilm);
                }
                break;
            }
        }
    }

    delItem(adv);
    createMovieList(movieDB.movies, filmList);

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addItem(addInput, movieDB.movies);
        addForm.reset();
        createMovieList(movieDB.movies, filmList);
    });

});
