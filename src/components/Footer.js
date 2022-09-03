import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button
        className="button-icon-footer-drinks"
        data-testid="button-icon-footer-drinks"
        type="button"
        onClick={ () => { history.push('/drinks'); } }
      >
        <img
          src={ drinkIcon }
          alt="DrinksIcon"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        data-testid="button-icon-footer-foods"
        className="button-icon-footer-foods"
        type="button"
        onClick={ () => { history.push('/foods'); } }
      >
        <img
          src={ mealIcon }
          alt="FoodsIcon"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>
  );
}
Footer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
