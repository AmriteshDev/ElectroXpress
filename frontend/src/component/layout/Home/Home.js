import React, { Fragment } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";

import Product from "./Product/Product.js";

const Home = () => {
    return (
        <Fragment>
            <div className='banner'>
                <p>Welcome to ElectroXpress</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href='#container'>
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>

            </div>

            <h2 className='homeHeading'>Featured Prducts</h2>

            <div className='container' id="container">
                <Product />
            </div>
        </Fragment>
    )
}

export default Home