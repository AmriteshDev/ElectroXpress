import React, { Fragment, useEffect } from 'react';
import "./productDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';

function ProductDetails({ match }) {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.ProductDetails);
    console.log(data)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
    }, [dispatch])

    return (
        <Fragment>
            <div className='productDetails'>
                <div>
                    <Carousel>
                        {
                            // product.images && product.images.map((item, i) => (
                            //     <img key={item.url} src={item.url} alt={`${i} Slide`}
                            //     />
                            // ))
                        }
                    </Carousel>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductDetails