// Импорт необходимых ресурсов
import refs from './refs.js';
import countriesListTpl from '../templates/search-list.hbs';
import oneCountryTpl from '../templates/country-card.hbs';
import debounce from 'lodash.debounce';
import showError from './pnotify-error.js';
import fetchCountries from './countries.js';

// Добавляем слушатель события инпут и выставляем задержку 300 мс
refs.inputRef.addEventListener('input', debounce(onSearch, 300));

// Функция для обработки результата в инпуте
function onSearch() {
  // Получаем сам запрос, введенный в инпут
  const searchQuery = getSearchQuery();

  // Если запрос пустая строка, ничего не делаем
  if (!searchQuery) {
    return;
  }

  // Отправляем запрос на Rest Countries API и обрабатываем результат
  fetchCountries(searchQuery)
    .then(data => {
      // Очищаем содержимое элемента, перед встраиванием другого запроса
      refs.containerRef.innerHTML = '';
      // Уведомление с просьбой уточнить запрос, если возвращается больше 10 стран
      if (data.length > 10) {
        return showError(
          'Too many mathces found. Please, enter a more specific query.',
        );
      } // Рендерим список стран, если найдено от 2 до 10 совпадений
      else if (data.length > 1 && data.length <= 10) {
        renderCountriesList(data);
      } // Рендер карточки страны, если найдено одно совпадение
      else {
        renderOneCountry(data);
      }
    }) // Обработка ошибки
    .catch(error => {
      if (error === 404) {
        showError('No matches were found!');
      } else {
        showError('Something went wrong. Try again.');
      }
    });
}

// Получаем запрос из инпута
function getSearchQuery() {
  return refs.inputRef.value;
}

// Функция, которая создает карточку страны
function renderOneCountry(data) {
  const oneCountryMarkup = oneCountryTpl(data);
  refs.containerRef.insertAdjacentHTML('beforeend', oneCountryMarkup);
}

// Функция, которая создает список, выпадающий из поиска
function renderCountriesList(data) {
  const countriesListMarkup = countriesListTpl(data);
  refs.containerRef.insertAdjacentHTML('beforeend', countriesListMarkup);
}