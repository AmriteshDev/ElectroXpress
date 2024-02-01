import React, { Fragment, useEffect } from 'react';
import "./productDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';


function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    return (
        <Fragment>
            <div className='ProductDetails'>
                <div>
                    <Carousel>
                        {
                            product.images && product.images.map((item, i) => (
                                <img key={item.url} src={item.url} alt={`${i} Slide`}
                                />
                            ))
                        }
                    </Carousel>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductDetails