import { Time } from '../features/time';
import { MainTitle, LinkToBack } from '../ui/atoms';

export const TimePage = () => (
  <div className="page-main__time time">
    <LinkToBack />
    <MainTitle title="Время" />
    <Time />
  </div>
);
