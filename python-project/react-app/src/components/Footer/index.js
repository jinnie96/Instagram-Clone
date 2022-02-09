import React from 'react';
import './Footer.css';
import logo from './logo.png'

function Footer() {

    return (
        <div className='footer-container'>
            <ul className='footer-names'>
                <li className='names'>
                    <div>Dominique</div>
                    <a href='/'>Github</a>
                    <a href='/'>LinkedIn</a>
                </li>
                <li className='names'>
                    <div>Jake</div>
                    <a href='/'>Github</a>
                    <a href='/'>LinkedIn</a>
                </li>
                <li className='names'>
                    <div>Karandeep</div>
                    <a href='/'>Github</a>
                    <a href='/'>LinkedIn</a>
                </li>
                <li className='names'>
                    <div>Savanah</div>
                    <a href='/'>Github</a>
                    <a href='/'>LinkedIn</a>
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
