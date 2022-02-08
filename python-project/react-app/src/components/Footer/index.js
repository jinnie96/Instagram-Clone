import React from 'react';
import './Footer.css';

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
                <img id="footer-logo" src="/logo.png"/>
                <a id='footer-text' href="https://github.com/jinnie96/Instagram-Clone" target="_blank">Insta-Clone © 2022</a>
            </div>
        </div>
    );
};

export default Footer;
