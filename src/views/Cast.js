import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Trending from '../services/FilmsApi';

export default function MovieDetailsPage() {
  const { filmId } = useParams();
  //   const [filmById, setfilmById] = useState(null);
  const [filmCast, setfilmCast] = useState(null);
  //   const location = useLocation();

  useEffect(() => {
    // Trending.FetchFilmById(filmId).then(setfilmById);
    Trending.FetchFilmCast(filmId).then(setfilmCast);
  }, [filmId]);
  return (
    <>
      {filmCast ? (
        filmCast.cast.map(cast => (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
              width={90}
              height={120}
              style={{ margin: '0 20px 0 0' }}
              alt="fotoAutor"
            />
            <p>{cast.name}</p>
            <p>Character: {cast.character}</p>
          </>
        ))
      ) : (
        <p>We don't have any casts for this movie</p>
      )}
    </>
  );
}
