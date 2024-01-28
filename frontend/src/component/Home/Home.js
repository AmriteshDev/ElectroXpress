import React, { Fragment } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from './Product/ProductCard.js';

const product = {
    name: "Blue Tshirt",
    image: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    _id: "amritesh",
    price: "2000"
}

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
                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />

                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />

            </div>
        </Fragment>
    )
}

export default Home