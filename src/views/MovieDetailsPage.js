import { useState, useEffect } from 'react';
import {
  NavLink,
  useParams,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import * as Trending from '../services/FilmsApi';

export default function MovieDetailsPage() {
  const { filmId } = useParams();
  const [filmById, setfilmById] = useState(null);
  const [history, setHistory] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setHistory(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    Trending.FetchFilmById(filmId).then(setfilmById);
  }, [filmId]);

  const onGoBack = () => {
    const goback = history?.state?.pathname ?? '/';
    const query = history?.state?.search ?? '';
    navigate(`${goback}${query}`);
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
                alt="fotoFilm"
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
            {/* <ul> */}
            <div>
              <NavLink
                to={{
                  pathname: `${history.pathname}/cast`,
                  // в location.state в свойстві from  знаходиться обєкт locatin звідки ми прийшли
                  // значить переписуємо туди значення з попередньої сторінки
                  state: { from: location?.state?.from ?? '/' },
                }}
              >
                Cast
              </NavLink>
            </div>
            <div>
              <NavLink
                to={{
                  pathname: `${history.pathname}/reviews`,
                  state: { from: location?.state?.from ?? '/' },
                }}
              >
                Reviews
              </NavLink>
            </div>
            {/* </ul> */}
          </>
        ) : (
          <p>We don't have addtional information</p>
        )}
        <hr />

        <Outlet />
      </>
    </>
  );
}
