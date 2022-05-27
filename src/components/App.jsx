import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import HomePage from '../views/HomePage';
import Cast from '../views/Cast';
import Reviews from '../views/Reviews';
import Movies from '../components/MoviesPage/MoviesPage';
import MovieDetailsPage from '../views/MovieDetailsPage';
import { Loader } from './Loader/Loader';

// import Cast from '../views/Cast/Cast';
// import Reviews from '../views/Reviews/Reviews';
import Container from './Container/Container';
// import { ToastContainer } from 'react-toastify';

// const HomePage = lazy(() =>
//   import('../views/HomePage.jsx' /* webpackChunkName: "homePage-view" */)
// );
// const MoviesPage = lazy(() =>
//   import('./MoviesPage/MoviesPage.js' /* webpackChunkName: "moviesPage-view" */)
// );
// const MovieDetailsPage = lazy(() =>
//   import(
//     '../views/MovieDetailsPage.js' /* webpackChunkName: "movieDetailsPage-view" */
//   )
// );

export const App = () => {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:filmId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Container>
  );
};
