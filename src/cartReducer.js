const initialState = {
    cart: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.payload] // Add new item to the cart array
            };
        default:
            return state;
    }
};

export default cartReducer;
