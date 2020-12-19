import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header() {
    const logoPath = './assets/logos/Logo-brainflix.svg';
    const iconSearch = './assets/icons/Icon-search.svg';
    const navImage = './assets/images/Mohan-muruge-sq.jpg';

    return (
        // Header section
        <header className="header">
            <div className="header__container">
                <div className="header__container-left">
                    <Link to="/"><img className="header__logo" src={logoPath} alt="brainflix logo" /></Link>
                </div>
                <div className="header__container-right">
                    <div className="header__search-container">
                        <img className="header__search-icon" src={iconSearch} alt="search icon" />
                        <input className="header__search" placeholder="Search" />
                    </div>
                    <Link to="/VideoUpload"><button className="header__upload-button"> UPLOAD</button></Link>
                    <div className="header__image-container">
                        <img className="header-image" src={navImage} alt="mohan muruge" />
                    </div>
                </div>
            </div>
        </header>
    );
}
