import { Switch, Route } from 'react-router-dom';

import { MainPage } from './pages';
import { TimePage } from './pages/time';
import { WeatherPage } from './pages/weather';

import 'normalize.css';
import './index.scss';

export const App = () => (
  <main className="page-main">
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/time" component={TimePage} />
      <Route path="/weather" component={WeatherPage} />
    </Switch>
  </main>
);
