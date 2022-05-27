import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink, useLocation } from 'react-router-dom';
import * as Trending from '../../services/FilmsApi';
import s from './MoviesPage.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar() {
  const location = useLocation();
  // const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [filmSearch, setFilmSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  useEffect(() => {
    if (location.search === '') {
      return;
    }
    const queryFromString =
      //зчитуємо з строки запиту параметр query
      new URLSearchParams(location.search).get('film') ?? '';
    if (queryFromString !== query) searhFetch(queryFromString);
  }, [location, query]);

  useEffect(() => {
    if (filmSearch) {
      if (filmSearch.results.length === 0) {
        toast.error('Нічого не знайдено');
      }
    }
  }, [filmSearch]);

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return toast.error('Введіть назву Фільма');
    }
    //Добавляємо в силку query для того щоб можна було скопіювати та віддати ссилку)
    // history.push({ ...location, search: `query=${query}` });
    setSearchParams({ film: query });
    searhFetch(query);
  };

  const searhFetch = q => {
    Trending.FetchFilmSearch(q).then(setFilmSearch);
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleOnSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            name="name"
            placeholder="Search images and photos"
            value={query}
            onChange={handleChange}
          />
        </form>
      </header>
      <ul>
        {filmSearch &&
          filmSearch.results.map((film, index) => {
            const patch = `${location.pathname}/${film.id}`;
            return (
              <li key={index}>
                <NavLink to={patch} state={location}>
                  {film.title}
                  {film.name}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </>
  );
}
