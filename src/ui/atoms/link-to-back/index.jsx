import { useHistory } from 'react-router-dom';
import { ArrowIcon } from '../../../lib/icons';

export const LinkToBack = () => {
  const history = useHistory();

  return (
    <div className="page-main__go-back">
      <button className="page-main__go-back__btn" type="button" onClick={() => history.goBack()}>
        <ArrowIcon />
        <span className="page-main__go-back__descr">
          Вернуться назад
        </span>
      </button>
    </div>
  );
};
