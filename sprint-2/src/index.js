import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss'
import App from './App';

window.$BF_API_KEY = '?api_key=76af3ca8-7cb7-4299-b53c-69a939bafc89';
window.$BF_URL = 'https://project-2-api.herokuapp.com/';
window.$BF_VIDEOS = 'videos/';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
