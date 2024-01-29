import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from './Product/ProductCard.js';
import MetaData from '../layout/MetaData.js';
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from '../../actions/productAction.js';



const Home = () => {

    const dispatch = useDispatch();
    const { loadind, error, products, productsCount } = useSelector(
        (state) => state.products
    )

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
        <Fragment>


            <MetaData title='ElectroXpress' />

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

                {
                    products && products.map((product) => <ProductCard key={product._id} product={product} />)
                }

            </div>
        </Fragment>
    )
}

export default Home