import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from './Product/ProductCard.js';
import MetaData from '../layout/MetaData.js';
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from '../../actions/productAction.js';
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from "react-alert";



const Home = () => {

    const alert = useAlert();

    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    )

    useEffect(() => {
        if (error) {

            return alert.error(error);
        }

        dispatch(getProduct());
    }, [dispatch, error]);

    return (
        <Fragment>
            {
                loading ? (<Loader />) : (
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
        </Fragment>
    )
}

export default Home