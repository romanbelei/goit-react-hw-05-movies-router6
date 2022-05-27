import { BallTriangle } from 'react-loader-spinner';
import s from './Loader.module.css';

export const Loader = () => (
  <div className={s.Loader}>
    <BallTriangle height="100" width="100" color="blue" ariaLabel="loading" />
  </div>
);
