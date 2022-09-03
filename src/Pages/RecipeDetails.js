import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import initialDrinks from '../service/initialDrinks';
import Share from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import getDoneLocal from '../service/getDoneLocal';

export default function RecipeDetails({ match }) {
  const [msgCopy, setmsgCopy] = useState(false);
  const [dataApi, setDataApi] = useState([]);
  const [cloneIngredients, setCloneIngredients] = useState([]);
  const [recomendationDrinks, setRecomendationDrinks] = useState([]);
  const [isFavorite, setIsFavorite] = useState(whiteHeartIcon);
  const [labelCheck, setLabelCheck] = useState(false);
  const history = useHistory();

  const handleChecked = (target, element) => {
    setLabelCheck(!labelCheck);
    const favorite = localStorage.getItem('favoriteRecipes');
    const favoriteParse = JSON.parse(favorite);
    if (target.checked) {
      setIsFavorite(blackHeartIcon);
      if (favoriteParse === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: element.idMeal,
          type: 'food',
          nationality: element.strArea,
          category: element.strCategory,
          alcoholicOrNot: '',
          name: element.strMeal,
          image: element.strMealThumb }]));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify(
          [...favoriteParse, { id: element.idMeal,
            type: 'food',
            nationality: element.strArea,
            category: element.strCategory,
            alcoholicOrNot: '',
            name: element.strMeal,
            image: element.strMealThumb }],
        ));
      }
    } else {
      setIsFavorite(whiteHeartIcon);
    }
  };

  useEffect(() => {
    if (match.path === '/foods/:id') {
      const favorite = localStorage.getItem('favoriteRecipes');
      const favoriteParse = JSON.parse(favorite);
      const favorited = favoriteParse?.filter((id) => id.id === match.params.id);
      if (favorited?.length > 0) {
        setIsFavorite(blackHeartIcon);
        setLabelCheck(true);
      }
      const fetchIdDetailsFoods = async () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
          .then((data) => data.json())
          .then((result) => setDataApi(result.meals));
      };
      fetchIdDetailsFoods();
    }
  }, [match.params.id, match.path]);

  useEffect(() => {
    if (dataApi.length > 0) {
      const ingredients = async () => {
        const keysIngredients = Object
          .keys(dataApi[0]).filter((filtered) => filtered
            .includes('Ingredient') && dataApi[0][filtered]);

        setCloneIngredients(keysIngredients);

        const getRecomendationDrinks = await initialDrinks();
        setRecomendationDrinks(getRecomendationDrinks.drinks.slice(+'0', +'6'));
      };
      ingredients();
    }
  }, [dataApi]);

  // useEffect(() => {
  //   // seTest(getDoneLocal(match.params.id));
  //   const getDoneRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
  //   // if (getDoneRecipe !== null) {
  //   //   const testDoneRecipe = getDoneRecipe
  //   //     .some((el) => el.id === Number(match.params.id));
  //   //   console.log(testDoneRecipe);
  //   // }
  // }, [])

  const startRecipes = () => {
    const { id } = match.params;
    history.push(`/foods/${match.params.id}/in-progress`);
    const local = { meals: { [id]: [] } };
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    const inProgressRecipesParse = JSON.parse(inProgressRecipes);
    localStorage
      .setItem('inProgressRecipes', JSON.stringify([...inProgressRecipesParse, local]));
  };

  return (
    <div>
      { dataApi.map((element, index) => (
        <div key={ index }>
          <div className="details-container">
            <img
              className="img-details"
              data-testid="recipe-photo"
              src={ element.strMealThumb }
              alt={ element.strMealThumb }
            />
            <h1 data-testid="recipe-title">
              { element.strMeal }
            </h1>
            <h4 data-testid="recipe-category">
              { element.strCategory }
            </h4>

            <div className="butons-favorite">
              <label htmlFor="favorite" className="container">
                <input
                  type="checkbox"
                  name="favorite"
                  id="favorite"
                  value="favorite"
                  onChange={ ({ target }) => handleChecked(target, element) }
                  hidden
                  checked={ labelCheck }
                />
                <img
                  data-testid="favorite-btn"
                  src={ isFavorite }
                  alt="Is Favorite"
                />
              </label>
              <button
                data-testid="share-btn"
                type="button"
                name="share"
                value="share"
                onClick={ () => {
                  setmsgCopy(true);
                  navigator.clipboard.writeText(document.URL);
                } }
              >
                <img
                  src={ Share }
                  alt="Share"
                />
              </button>
            </div>
            {msgCopy && <p>Link copied!</p>}
            <h2>Ingredients</h2>
            <div>
              <div className="ingredient-details">
                { cloneIngredients
            && cloneIngredients.map((ingredientKey, key) => (
              <div key={ key }>
                <p data-testid={ `${key}-ingredient-name-and-measure` }>
                  {`${element[ingredientKey]} - ${element[`strMeasure${key + 1}`]}`}
                </p>
              </div>
            ))}
              </div>
            </div>
            <h2>Instructions</h2>
            <p
              data-testid="instructions"
              className="ingredient-details"
            >
              {element.strInstructions}
            </p>
            <iframe
              src={ `https://www.youtube.com/embed/${element.strYoutube.split('=')[1]}` }
              title={ `{${element.strMeal}}` }
              data-testid="video"
              className="video"
            />
            <h2>Recommended</h2>
          </div>
          <div className="recomendation-foods">
            { recomendationDrinks.map((rec, idx) => (
              <button
                className="card-recommended"
                type="button"
                key={ idx }
                onClick={ () => { history.push(`/drinks/${rec.idDrink}`); } }
              >
                <img
                  className="foto-foods"
                  data-testid={ `${idx}-recomendation-card` }
                  src={ rec.strDrinkThumb }
                  alt={ rec.strDrinkThumb }
                />
                <h4 data-testid={ `${idx}-recomendation-title` }>
                  { rec.strDrink }
                </h4>
                <h4 data-testid="recipe-category">
                  { rec.strCategory }
                  { rec.strAlcoholic }
                </h4>
              </button>
            ))}
          </div>
        </div>))}

      <div
        className="btn-start-recipe-area"
      >
        <button
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
          type="button"
          onClick={ () => {
            startRecipes();
          } }
        >
          Start Recipes
        </button>
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isRequired;
