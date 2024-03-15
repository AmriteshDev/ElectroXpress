import { ADD_TO_CART } from "../constants/cartConstant";
import axios from "axios";


export const addItemToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image,
            stock: data.product.stock,
            quantity
        }

    })

    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

};