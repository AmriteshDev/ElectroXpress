import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERROR
} from "../constants/productConstant";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount,

            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return {
                state
            }
    }
};

