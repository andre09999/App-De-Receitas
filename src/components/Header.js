import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, iconSearch }) {
  const [showSearch, setshowSearch] = useState(false);
  const history = useHistory();
  return (
    <header>
      <div className="header-princ">
        <button
          data-testid="button-icon"
          type="button"
          onClick={ () => { history.push('/profile'); } }
          className="btn-header-profile"
        >
          <img
            src={ ProfileIcon }
            alt="profile"
            data-testid="profile-top-btn"
          />
        </button>
        <h1 data-testid="page-title">{title}</h1>
        { iconSearch && (
          <button
            type="button"
            data-testid="search-btn"
            className="btn-header-profile"
            onClick={ () => { setshowSearch(!showSearch); } }
          >
            <img
              src={ SearchIcon }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>)}
      </div>
      {showSearch && <SearchBar title={ title } />}
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
