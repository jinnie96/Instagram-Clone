import React from 'react';
import './Footer.css';
import logo from './logo.png'

function Footer() {

    return (
        <div className='footer-container'>
            <ul className='footer-names'>
                <li className='names'>
                    <div>Dominique</div>
                    <a href='https://github.com/Dominisam98' target="_blank" rel="noreferrer">Github</a>
                    <a href='/' target="_blank" rel="noreferrer">LinkedIn</a>
                </li>
                <li className='names'>
                    <div>Jake</div>
                    <a href='https://github.com/Sheeptoaster' target="_blank" rel="noreferrer">Github</a>
                    <a href='https://www.linkedin.com/in/jacob-weber-662a08153/' target="_blank" rel="noreferrer">LinkedIn</a>
                </li>
                <li className='names'>
                    <div>Karandeep</div>
                    <a href='https://github.com/jinnie96' target="_blank" rel="noreferrer">Github</a>
                    <a href='https://www.linkedin.com/in/karandeep-singh-600852a8/'target="_blank" rel="noreferrer">LinkedIn</a>
                </li>
                <li className='names'>
                    <div>Savanah</div>
                    <a href='https://github.com/strewm' target="_blank" rel="noreferrer">Github</a>
                    <a href='https://www.linkedin.com/in/savanah-trewman/' target="_blank" rel="noreferrer">LinkedIn</a>
                </li>
            </ul>
            <div className='footer-about'>
                <img id="footer-logo" alt="instagram logo" src={logo} />
                <a id='footer-text' href="https://github.com/jinnie96/Instagram-Clone" target="_blank" rel="noreferrer">Insta-Clone © 2022</a>
            </div>
        </div>
    );
};

export default Footer;
