import { useState, useEffect } from 'react';
import { Route, useParams, useHistory, useLocation } from 'react-router-dom';
import * as Trending from '../services/FilmsApi';
import { NavLink, useRouteMatch } from 'react-router-dom';

export default function MovieDetailsPage() {
  const { filmId } = useParams();
  const [filmById, setfilmById] = useState(null);
  const [filmCast, setfilmCast] = useState(null);
  const [filmReviews, setfilmReviews] = useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    Trending.FetchFilmById(filmId).then(setfilmById);
    Trending.FetchFilmCast(filmId).then(setfilmCast);
    Trending.FetchFilmReviews(filmId).then(setfilmReviews);
  }, [filmId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      <button type="button" onClick={onGoBack}>
        Назад
      </button>
      <>
        {filmById && (
          <div style={{ display: 'flex' }}>
            {filmById.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${filmById.poster_path}`}
                width={300}
                height={400}
                style={{ margin: '5px 20px 0 0' }}
              />
            )}
            <div>
              {filmById.title && (
                <h2>
                  {filmById.title}(
                  {filmById.release_date && filmById.release_date.substr(0, 4)}
                  {filmById.first_air_date &&
                    filmById.first_air_date.substr(0, 4)}
                  )
                </h2>
              )}
              {filmById.name && (
                <h2>
                  {filmById.name}(
                  {filmById.release_date && filmById.release_date.substr(0, 4)}
                  {filmById.first_air_date &&
                    filmById.first_air_date.substr(0, 4)}
                  )
                </h2>
              )}
              <h3>Overview</h3>
              <p>{filmById.overview}</p>
              {filmById && (
                <>
                  <h3>Genres</h3>
                  {filmById.genres.map(item => {
                    return `${item.name}  `;
                  })}
                </>
              )}
            </div>
          </div>
        )}
        <hr />
        {filmById ? (
          <>
            Addtional Information <br></br>
            <ul>
              <li key="1">
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: location?.state?.from ?? '/' },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li key="2">
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: location?.state?.from ?? '/' },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <p>We don't have addtional information</p>
        )}
        <hr />
        <Route path={`${url}/cast`} exact>
          {filmCast ? (
            filmCast.cast.map(cast => (
              <>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                  width={90}
                  height={120}
                  style={{ margin: '0 20px 0 0' }}
                />
                <p>{cast.name}</p>
                <p>Character: {cast.character}</p>
              </>
            ))
          ) : (
            <p>We don't have any casts for this movie</p>
          )}
        </Route>
        <Route path={`${url}/reviews`} exact>
          <>
            {filmReviews && filmReviews.results.length > 0 ? (
              <ul>
                {filmReviews.results.map((review, index) => (
                  <li key={index}>
                    <h2>Author: {review.author}</h2>
                    <p>{review.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>We don't have any reviews for this movie</p>
            )}
          </>
        </Route>
      </>
    </>
  );
}
