import { useState, useEffect } from 'react';
import { Route, NavLink, useRouteMatch, useLocation } from 'react-router-dom';
import * as Trending from '../services/FilmsApi';
import PageHeading from '../components/PageHeading/PageHeading';
import MovieDetailsPage from '../views/MovieDetailsPage';

export default function HomePage() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const [films, setfilms] = useState(null);
  useEffect(() => {
    Trending.FetchTrending().then(setfilms);
  }, []);
  return (
    <>
      {/* <Switch> */}
      <Route path="/" exact>
        <PageHeading text="Trending today" />
        {films && (
          <ul>
            {films.results.map(film => (
              <li key={film.id}>
                <NavLink
                  to={{
                    pathname: `${url}movies/${film.id}`,
                    state: { from: location },
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
      </Route>

      {/* <Route path="/movies/:filmId">
          <MovieDetailsPage  />
        </Route> */}
      {/* </Switch> */}
    </>
  );
}
