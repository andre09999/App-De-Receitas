import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import Category from '../components/Category';

export default function Foods() {
  const history = useHistory();

  return (
    <div>

      {history.location.pathname === '/foods'
        && <Header title="Foods" iconSearch />}

      <Category />

      <Recipes />

      {history.location.pathname === '/foods' && <Footer />}

    </div>
  );
}
Foods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;
