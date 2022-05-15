import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import Container from './Container/Container';
import { ToastContainer } from 'react-toastify';

const HomePage = lazy(() =>
  import('../views/HomePage.jsx' /* webpackChunkName: "homePage-view" */)
);
const MoviesPage = lazy(() =>
  import('./MoviesPage/MoviesPage.js' /* webpackChunkName: "moviesPage-view" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    '../views/MovieDetailsPage.js' /* webpackChunkName: "movieDetailsPage-view" */
  )
);

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>ЗАГРУЖАЄМО</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          Searchbar
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:filmId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={2000} position="top-center" />
    </Container>
  );
}
