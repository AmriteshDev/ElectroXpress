import React, { Fragment, useEffect } from 'react';
import "./productDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';

function productDetails({ match }) {

    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.product);


    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
    }, [dispatch])

    return (
        <Fragment>
            <div className='productDetails'>
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

export default productDetails