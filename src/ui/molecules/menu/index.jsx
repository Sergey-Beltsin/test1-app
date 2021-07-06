import { MenuItem } from '../../atoms';
import { TimeIcon, WeatherIcon } from '../../../lib/icons';

export const Menu = () => (
  <ul className="main__menu menu">
    <MenuItem icon={<TimeIcon />} title="Время" href="/time" />
    <MenuItem icon={<WeatherIcon />} title="Погода" href="/weather" />
  </ul>
);
