import { LinkToBack, MainTitle } from '../ui/atoms';

export const WeatherPage = () => (
  <div className="page-main__weather weather">
    <LinkToBack />
    <MainTitle title="Погода" />
  </div>
);
