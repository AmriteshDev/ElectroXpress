import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
// import Pagination from "react-js-pagination";
import "./Products.css";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";



const Products = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);

    const dispatch = useDispatch();
    const { keyword } = useParams();
    const { products, error, loading, productsCount, resultPerPage } = useSelector(state => state.products)

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }


    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, price));
    }, [dispatch, keyword, currentPage, error, keyword, price])



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

                        <div className="filterBox">
                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={25000}
                            />
                        </div>

                        {/* {resultPerPage < productsCount && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPageText="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )} */}

                    </Fragment>

            }
        </Fragment>
    )
}

export default Products