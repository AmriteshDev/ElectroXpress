import React, { Fragment, useEffect } from 'react';
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';

function ProductDetails() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails);


    useEffect(() => {
        dispatch(getProductDetails(id));
        console.log(product.images);
    }, [dispatch, id]);

    return (
        <Fragment>
            <div className='productDetails'>
                <div>
                    <Carousel>
                        {
                            product.images && product.images.map((item, i) => (
                                <img className='productDetails' key={item.url} src={item.url} alt={`${i} Slide`}
                                />
                            ))
                        }
                    </Carousel>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductDetails; 