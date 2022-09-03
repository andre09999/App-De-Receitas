import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useApp from '../context/useApp';
import useFoods from '../context/useFoods';

const magic = 12;
export default function Recipes() {
  const { results } = useContext(useApp);
  const [resultsDrinksCopy, setresultsDrinksCopy] = useState([]);
  const { resultsFood } = useContext(useFoods);
  const [resultsFoodCopy, setresultsFoodCopy] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (results?.drinks) {
      setresultsDrinksCopy(results.drinks.slice(0, magic));
    }
    if (resultsFood?.meals) {
      setresultsFoodCopy(resultsFood.meals.slice(0, magic));
    }
    // console.log(resultsFoodCopy);
  }, [resultsFood, results]);

  return (
    <div
      className="recipes"
      data-testid="cardsContainer"
    >
      {history.location.pathname === '/drinks'
        && resultsDrinksCopy.map((el, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            className="card-recipes"
            key={ el.idDrink }
          >
            <button
              type="button"
              onClick={ () => { history.push(`/drinks/${el.idDrink}`); } }
              className="button-Recipes"
            >
              <img
                className="foto-foods"
                src={ el.strDrinkThumb }
                alt="FoodsIcon"
                data-testid={ `${index}-card-img` }
              />
              <h1 data-testid={ `${index}-card-name` }>
                {' '}
                {el.strDrink}
              </h1>
            </button>
          </div>
        ))}
      {history.location.pathname === '/foods'
        && resultsFoodCopy.map((el, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ index }
            className="card-recipes"
          >
            <button
              type="button"
              onClick={ () => { history.push(`/foods/${el.idMeal}`); } }
              className="button-Recipes"
            >
              <img
                className="foto-foods"
                src={ el.strMealThumb }
                alt="FoodsIcon"
                data-testid={ `${index}-card-img` }
              />
              <h1 data-testid={ `${index}-card-name` }>
                {' '}
                {el.strMeal}
              </h1>
            </button>
          </div>
        ))}
    </div>
  );
}
Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
