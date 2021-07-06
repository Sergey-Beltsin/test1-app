import { Link } from 'react-router-dom';

export const MenuItem = ({ icon, title, href }) => (
  <li className="menu__item">
    <Link to={href} className="menu__item__link">
      <div>
        {icon}
      </div>
      <span className="menu__item__descr">
        {title}
      </span>
    </Link>
  </li>
);
