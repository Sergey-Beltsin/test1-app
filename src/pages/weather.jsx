import { LinkToBack, MainTitle } from '../ui/atoms';
import { Weather } from '../features/weather';

export const WeatherPage = () => (
  <div className="page-main__weather weather">
    <LinkToBack />
    <MainTitle title="Погода" />
    <Weather />
  </div>
);
