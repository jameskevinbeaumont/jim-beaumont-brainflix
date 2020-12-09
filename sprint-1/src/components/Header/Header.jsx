import React from 'react';
import './Header.scss';
import logoPath from '../../assets/logos/Logo-brainflix.svg';
import navImage from '../../assets/images/Mohan-muruge-sq.jpg';

export default function Header () {
    return (
    <header className="header">
        <div className="header__container">
            <img className="header-logo" src={logoPath} alt="brainflix logo"/>
        </div>
        <div className="header__container">
          <input className="header-search" placeholder="Search" />
        </div>
        <div className="header__container">
          <button className="header-upload-button">&#43; UPLOAD</button>
          <div className="header__image">
            <img className="header-image" src={navImage} alt="mohan muruge" />
          </div>
        </div>
    </header>
    );
}
