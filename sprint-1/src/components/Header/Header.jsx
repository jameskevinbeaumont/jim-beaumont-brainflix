import React from 'react';
import './Header.scss';

export default function Header () {
    const logoPath = './assets/logos/Logo-brainflix.svg';
    const iconSearch = './assets/icons/Icon-search.svg';
    const navImage = './assets/images/Mohan-muruge-sq.jpg';

    return (
    // Header section
    <header className="header">
        <div className="header__container-left">
            <h1 className="header__h1">BrainFlix</h1>
            <img className="header__logo" src={logoPath} alt="brainflix logo"/>
        </div>
        <div className="header__container-right">
            <div className="header__search-container">
                <img className="header__search-icon" src={iconSearch} alt="search icon"/>
                <input className="header__search" placeholder="Search" />
            </div>
            <button className="header__upload-button"> UPLOAD</button>
            <div className="header__image-container">
                <img className="header-image" src={navImage} alt="mohan muruge" />
            </div>
        </div>
    </header>
    );
}
