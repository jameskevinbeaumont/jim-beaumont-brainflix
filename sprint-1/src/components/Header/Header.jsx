import React from 'react';
import './Header.scss';

export default function Header () {
    const logoPath = './assets/logos/Logo-brainflix.svg';
    const iconSearch = './assets/icons/Icon-search.svg';
    const navImage = './assets/images/Mohan-muruge-sq.jpg';

    return (
    <header className="header">
        <div className="header__container-left">
            <img className="header-logo" src={logoPath} alt="brainflix logo"/>
        </div>
        <div className="header__container-right">
            <div className="header-search-container">
                <img className="header-search-icon" src={iconSearch} alt="search icon"/>
                <input className="header-search" placeholder="Search" />
            </div>
                <button className="header-upload-button"> UPLOAD</button>
                <div className="header__image">
                    <img className="header-image" src={navImage} alt="mohan muruge" />
            </div>
        </div>
    </header>
    );
}
