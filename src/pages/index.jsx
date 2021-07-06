import { MainTitle } from '../ui/atoms';
import { Menu } from '../ui/molecules';

export const MainPage = () => (
  <div className="page-main__main main">
    <div className="main__block" />
    <MainTitle title="Привет!" />
    <Menu />
  </div>
);
