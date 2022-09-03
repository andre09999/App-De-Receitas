import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Category from '../components/Category';

export default function Drinks() {
  const history = useHistory();

  return (
    <div>

      {history.location.pathname === '/drinks'
        && <Header title="Drinks" iconSearch />}

      <Category />

      <Recipes />

      {history.location.pathname === '/drinks' && <Footer />}

    </div>
  );
}
Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
