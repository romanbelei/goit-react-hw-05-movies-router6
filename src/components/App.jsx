import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import MoviesPage from './MoviesPage/MoviesPage';
import Container from './Container/Container';
import HomePage from '../views/HomePage';
import MovieDetailsPage from '../views/MovieDetailsPage';

// import NotFoundView from '../views/NotFoundView';
// import AuthorsView from './views/AuthorsView';
// import BooksView from './views/BooksView';
// import BookDetailsView from './views/BookDetailsView';
// import NotFoundView from './views/NotFoundView';

export default function App() {
  return (
    <Container>
      <AppBar />

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
    </Container>
  );
}

/* <Route path="/books" exact>
          <BooksView />
        </Route>

        <Route path="/books/:bookId">
          <BookDetailsView />
        </Route> */

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101',
//       }}
//     >
//       React homework template Ok
//     </div>
//   );
// };
