import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as Trending from '../services/FilmsApi';

export default function MovieDetailsPage() {
  const { filmId } = useParams();
  //   const [filmById, setfilmById] = useState(null);
  const [filmReviews, setfilmReviews] = useState(null);
  //   const location = useLocation();

  useEffect(() => {
    // Trending.FetchFilmById(filmId).then(setfilmById);
    Trending.FetchFilmReviews(filmId).then(setfilmReviews);
  }, [filmId]);

  return (
    <>
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
    </>
  );
}
