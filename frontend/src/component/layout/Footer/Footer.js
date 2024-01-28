import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";


const Footer = () => {
    return (
        <footer id="footer">
            <div className='leftfooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt='PlayStore' />
                <img src={appStore} alt='AppStore' />

            </div>
            <div className='midfooter'>
                <h1>ElectroXpress</h1>
                <p>Delivering high quality at minimum cost, where value meets affordability.</p>
                <p>Copyrights 2023 &copy; AmriteshSingh </p>
            </div>
            <div className='rightfooter'>
                <h4>Follow Us</h4>
                <a href='/#'>Instragram</a>
                <a href='/#'>Facebook</a>
            </div>

        </footer>
    )
}

export default Footer