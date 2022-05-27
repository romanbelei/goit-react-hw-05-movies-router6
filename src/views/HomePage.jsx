import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as Trending from '../services/FilmsApi';
import PageHeading from '../components/PageHeading/PageHeading';

export default function HomePage() {
  const location = useLocation();
  const [films, setfilms] = useState(null);
  useEffect(() => {
    Trending.FetchTrending().then(setfilms);
  }, []);
  return (
    <>
      <PageHeading text="Trending today" />

      {films && (
        <ul>
          {films.results.map(film => (
            <li key={film.id}>
              <NavLink
                to={{
                  pathname: `movies/${film.id}`,
                  state: { location },
                }}
              >
                {film.title}
                {film.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      <hr />
    </>
  );
}
