import React from 'react';
import './header.scss';
import logoPath from '../../assets/logos/Logo-brainflix.svg';
import searchIcon from '../../assets/icons/Icon-search.svg';
import uploadIcon from '../../assets/icons/Icon-upload.svg';
import navImage from '../../assets/images/Mohan-muruge-sq.jpg';

export default function Header () {
    return (
    <header className="header">
        <div className="header__container-right">
            <img className="header-logo" src={logoPath} alt="brainflix logo"/>
        </div>
        <div className="header__container-left">
            <div className="header-search-container">
                <img className="header-search-icon" src={searchIcon} alt="search icon"/>
                <input className="header-search" placeholder="Search" />
            </div>
                <button className="header-upload-button"><img src={uploadIcon} alt="upload icon"/> UPLOAD</button>
                <div className="header__image">
                    <img className="header-image" src={navImage} alt="mohan muruge" />
            </div>
        </div>
    </header>
    );
}
