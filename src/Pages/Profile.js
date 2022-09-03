import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();
  const email = localStorage.getItem('user');
  const emailParse = JSON.parse(email);

  return (
    <div className="profile">
      <Header title="Profile" />
      <h2
        className="email"
        data-testid="profile-email"
      >
        {emailParse?.email}
      </h2>
      <div className="container-buton-profile">
        <button
          className="button-category"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>

        <button
          className="button-category"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>

        <button
          className="button-category"
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}
