const initialState = {
    items: []
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      // Add other cases as needed
      default:
        return state;
    }
  };
  
  export default cartReducer;
  