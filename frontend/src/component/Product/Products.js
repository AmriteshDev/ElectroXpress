import React, { Fragment, useEffect } from 'react';
import "./Product.css";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";



const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const { products, error, loading } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProduct(keyword));
    }, [dispatch, keyword])


    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>

                        <h2 className='productsHeading'>PRODUCTS</h2>
                        <div className='products'>
                            {
                                products && products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            }
                        </div>
                        <div className='paginationBox'>

                        </div>

                    </Fragment>

            }
        </Fragment>
    )
}

export default Products