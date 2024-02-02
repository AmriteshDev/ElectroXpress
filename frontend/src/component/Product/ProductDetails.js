import React, { Fragment, useEffect } from 'react';
import "./productDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";



function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
    }

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id])

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.images &&
                            product.images.map((item, i) => (
                                <img className="CarouselImage" key={i} src={item.url} alt={`${i} Slide`} />
                            ))
                        }
                    </Carousel>
                </div>
                <div>
                    <div className='detailsBlock-1'>
                        <h2>{product.name}</h2>
                        <p>Product # {product._id} </p>
                    </div>
                    <div className='detailsBlock-2'>
                        <ReactStars {...options} />
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className='detailsBlock-3'>
                        <h1>{`₹ ${product.price}`}</h1>
                        <div className='detailsBlock-3-1'>
                            <div className='detailsBlock-3-1-1'>
                                <button>-</button>
                                <input type="number" value="1" />
                                <button>+</button>
                            </div>
                            <button>Add to Cart</button>

                        </div>
                        <p>
                            Status: <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>

                    </div>
                    <div className='detailsBlock-4'>
                        Discription : <p>{product.discription}</p>
                    </div>

                    <button className='submitReview'>Submit Review</button>
                </div>

            </div>
        </Fragment>
    )
}

export default ProductDetails