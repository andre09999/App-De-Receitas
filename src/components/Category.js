import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useApp from '../context/useApp';
import useFoods from '../context/useFoods';
import foodsForCategory from '../service/foodsForCategory';
import drinksForCategory from '../service/drinksForCategory';
import initialFoods from '../service/initialFoods';
import initialDrinks from '../service/initialDrinks';

const five = 5;
export default function Category() {
  const [categoryCopy, setCategoryCopy] = useState([]);
  const { category, setresults } = useContext(useApp);
  const [categoryFoodCopy, setCategoryFoodCopy] = useState([]);
  const { categoryFood, setresultsFood } = useContext(useFoods);
  const [toggleFilter, setToggleFilter] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (category.drinks) {
      setCategoryCopy(category.drinks.slice(0, five));
    }
    if (categoryFood.meals) {
      setCategoryFoodCopy(categoryFood.meals.slice(0, five));
    }
  }, [category, categoryFood]);

  return (
    <div className="Category">
      {history.location.pathname === '/drinks'
        && categoryCopy.map((e, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
            className="button-category"
            onClick={ async () => {
              switch (toggleFilter[e.strCategory]) {
              case false:
                setresults(await initialDrinks());
                setToggleFilter({ ...toggleFilter, [e.strCategory]: true });
                break;
              default:
                setresults(await drinksForCategory(e.strCategory));
                setToggleFilter({ ...toggleFilter, [e.strCategory]: false });
                break;
              }
            } }
          >
            {e.strCategory}
          </button>
        ))}
      {history.location.pathname === '/foods'
        && (
          <button
            type="button"
            data-testid="All-category-filter"
            className="button-category"
            onClick={ async () => setresultsFood(await initialFoods()) }
          >
            All
          </button>)}

      {history.location.pathname === '/drinks'
        && (
          <button
            type="button"
            data-testid="All-category-filter"
            className="button-category"
            onClick={ async () => setresults(await initialDrinks()) }
          >
            All
          </button>)}
      {history.location.pathname === '/foods'
        && categoryFoodCopy.map((el, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${el.strCategory}-category-filter` }
            className="button-category"
            onClick={ async () => {
              switch (toggleFilter[el.strCategory]) {
              case false:
                setresultsFood(await initialFoods());
                setToggleFilter({ ...toggleFilter, [el.strCategory]: true });
                break;
              default:
                setresultsFood(await foodsForCategory(el.strCategory));
                setToggleFilter({ ...toggleFilter, [el.strCategory]: false });
                break;
              }
            } }
          >
            {el.strCategory}
          </button>
        ))}
    </div>
  );
}
Category.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
